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

// Production builds are gated by assertFirebaseEnv, but tests and previews may
// load this module without env values. Every getX(app) call throws when config
// is incomplete, so guard init and let hooks fall back to their local data.
const isConfigured = Boolean(firebaseConfig.projectId && firebaseConfig.apiKey);

export const app = isConfigured ? initializeApp(firebaseConfig) : null;
export const analytics = isConfigured && firebaseConfig.measurementId
  ? getAnalytics(app)
  : null;
export const db = isConfigured ? getFirestore(app) : null;
export const auth = isConfigured ? getAuth(app) : null;
export const googleProvider = isConfigured ? new GoogleAuthProvider() : null;
