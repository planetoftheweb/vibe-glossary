import { useCallback, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { AUTH_ERROR_COPY, AUTH_ERROR_FALLBACK } from '../lib/authErrors';

/**
 * Optional account state. Signing in is never required — it only exists so
 * progress and badges can be backed up to the cloud (see useCloudSync).
 */
export default function useAuth() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => onAuthStateChanged(auth, (nextUser) => {
    setUser(nextUser);
    setAuthReady(true);
  }), []);

  const run = useCallback(async (action) => {
    setBusy(true);
    setError(null);
    try {
      await action();
      return true;
    } catch (err) {
      const known = Object.prototype.hasOwnProperty.call(AUTH_ERROR_COPY, err?.code);
      if (!known) console.error('[auth] unmapped error:', err?.code, err);
      const copy = known
        ? AUTH_ERROR_COPY[err.code]
        : AUTH_ERROR_FALLBACK;
      if (copy) setError(copy);
      return false;
    } finally {
      setBusy(false);
    }
  }, []);

  const signInWithGoogle = useCallback(
    () => run(() => signInWithPopup(auth, googleProvider)),
    [run]
  );
  const signInWithEmail = useCallback(
    (email, password) => run(() => signInWithEmailAndPassword(auth, email, password)),
    [run]
  );
  const registerWithEmail = useCallback(
    (email, password) => run(() => createUserWithEmailAndPassword(auth, email, password)),
    [run]
  );
  const signOut = useCallback(() => run(() => firebaseSignOut(auth)), [run]);
  const clearError = useCallback(() => setError(null), []);

  return {
    user,
    authReady,
    busy,
    error,
    clearError,
    signInWithGoogle,
    signInWithEmail,
    registerWithEmail,
    signOut,
  };
}
