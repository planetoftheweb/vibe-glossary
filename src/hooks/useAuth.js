import { useCallback, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

// Friendly copy for the Firebase error codes users can actually hit.
// A `null` value means "stay silent" (e.g. they closed the popup on purpose).
const ERROR_COPY = {
  'auth/invalid-credential': 'Wrong email or password.',
  'auth/user-not-found': 'No account with that email — try "Create an account".',
  'auth/wrong-password': 'Wrong email or password.',
  'auth/email-already-in-use': 'That email already has an account — sign in instead.',
  'auth/weak-password': 'Password needs at least 6 characters.',
  'auth/invalid-email': "That doesn't look like a valid email.",
  'auth/too-many-requests': 'Too many tries — wait a minute and try again.',
  'auth/popup-blocked': 'Your browser blocked the popup — allow popups and try again.',
  'auth/popup-closed-by-user': null,
  'auth/cancelled-popup-request': null,
  'auth/operation-not-allowed': "Sign-in isn't enabled yet — try again later.",
  'auth/network-request-failed': 'Network hiccup — check your connection and try again.',
};

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
      const copy = Object.prototype.hasOwnProperty.call(ERROR_COPY, err?.code)
        ? ERROR_COPY[err.code]
        : 'Something went wrong — please try again.';
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
