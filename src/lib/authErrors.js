// Friendly copy for the Firebase error codes users can actually hit.
// A null value means stay silent (e.g. they closed the popup on purpose).
export const AUTH_ERROR_COPY = {
  'auth/invalid-credential': 'Wrong email or password.',
  'auth/user-not-found': 'No account with that email. Try "Create an account".',
  'auth/wrong-password': 'Wrong email or password.',
  'auth/email-already-in-use': 'That email already has an account. Sign in instead.',
  'auth/weak-password': 'Password needs at least 6 characters.',
  'auth/invalid-email': "That doesn't look like a valid email.",
  'auth/too-many-requests': 'Too many tries. Wait a minute and try again.',
  'auth/popup-blocked': 'Your browser blocked the popup. Allow popups and try again.',
  'auth/popup-closed-by-user': null,
  'auth/cancelled-popup-request': null,
  'auth/operation-not-allowed': "Sign-in isn't enabled yet. Try again later.",
  'auth/configuration-not-found': "Sign-in isn't enabled yet. Try again later.",
  'auth/network-request-failed': 'Network hiccup. Check your connection and try again.',
};

export const AUTH_ERROR_FALLBACK = 'Something went wrong. Please try again.';

export function authErrorMessage(code) {
  const known = Object.prototype.hasOwnProperty.call(AUTH_ERROR_COPY, code);
  return known ? AUTH_ERROR_COPY[code] : AUTH_ERROR_FALLBACK;
}
