import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
// getAnalytics() and getAuth() throw when the Firebase config is empty
// (tests, dev without .env), so skip them there — production always has it.
const hasConfig = Boolean(firebaseConfig.projectId && firebaseConfig.apiKey);
export const analytics = hasConfig ? getAnalytics(app) : null;
export const db = getFirestore(app);
export const auth = hasConfig ? getAuth(app) : null;
export const googleProvider = new GoogleAuthProvider();
