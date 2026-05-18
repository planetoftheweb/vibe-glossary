import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Stub the Firebase SDK so importing src/firebase.js doesn't blow up in tests
// when VITE_FIREBASE_* env vars aren't set. Hooks using these mocks see an
// empty snapshot, so they keep the local glossary/categories data.
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
}));

vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(() => ({})),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  collection: vi.fn(() => ({})),
  getDocs: vi.fn(() => Promise.resolve({ empty: true, forEach: () => {} })),
}));
