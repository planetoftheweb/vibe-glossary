import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Stub Firebase so test suites that pull in `src/firebase.js` (via App, ExploreBar,
// or the data hooks) don't try to initialize analytics with empty env vars.
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
