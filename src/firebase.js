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

// Analytics/Auth eagerly validate config and crash module load without it
// (e.g. in tests). Build-time check in vite.config.js enforces real config in production.
const hasConfig = Boolean(firebaseConfig.projectId && firebaseConfig.apiKey);

export const app = hasConfig ? initializeApp(firebaseConfig) : null;
export const analytics = hasConfig ? getAnalytics(app) : null;
export const db = hasConfig ? getFirestore(app) : null;
export const auth = hasConfig ? getAuth(app) : null;
export const googleProvider = new GoogleAuthProvider();
