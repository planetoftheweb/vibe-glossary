import { useEffect, useRef, useState } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { mergeSnapshots } from '../lib/cloudSync';

const SAVE_DELAY_MS = 2500;

/**
 * Keeps a signed-in learner's progress backed up to users/{uid} in Firestore.
 * On sign-in the cloud copy is merged into local progress (union — nothing is
 * lost on either side), then every local change is written back, debounced.
 * Signed-out users are untouched: localStorage stays the source of truth.
 *
 * status: 'idle' | 'restoring' | 'saving' | 'saved' | 'error'
 */
export default function useCloudSync(user, snapshot, importSnapshot) {
  const [status, setStatus] = useState('idle');
  // uid whose cloud copy has been merged; gates the save effect so we never
  // overwrite the backup before restoring it.
  const readyUidRef = useRef(null);
  const timerRef = useRef(null);
  const snapshotRef = useRef(snapshot);
  snapshotRef.current = snapshot;

  // On sign-in: pull the backup, merge it into local state, push the union up.
  useEffect(() => {
    if (!user) {
      readyUidRef.current = null;
      setStatus('idle');
      return;
    }
    let cancelled = false;
    (async () => {
      setStatus('restoring');
      try {
        const ref = doc(db, 'users', user.uid);
        const docSnap = await getDoc(ref);
        if (cancelled) return;
        const remote = docSnap.exists() ? docSnap.data().progress : null;
        const merged = mergeSnapshots(snapshotRef.current, remote);
        if (remote) importSnapshot(remote);
        // Full overwrite (no merge) so removed keys — e.g. after a reset or
        // attempt-cap trim — don't linger in the cloud copy.
        await setDoc(ref, {
          progress: merged,
          displayName: user.displayName || null,
          email: user.email || null,
          updatedAt: serverTimestamp(),
        });
        if (cancelled) return;
        readyUidRef.current = user.uid;
        setStatus('saved');
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();
    return () => { cancelled = true; };
  }, [user, importSnapshot]);

  // Debounced backup whenever progress changes after the initial restore.
  useEffect(() => {
    if (!user || readyUidRef.current !== user.uid) return undefined;
    setStatus('saving');
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          progress: snapshotRef.current,
          displayName: user.displayName || null,
          email: user.email || null,
          updatedAt: serverTimestamp(),
        });
        setStatus('saved');
      } catch {
        setStatus('error');
      }
    }, SAVE_DELAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [user, snapshot]);

  return { status };
}
