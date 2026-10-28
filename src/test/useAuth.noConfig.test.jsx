import { renderHook, waitFor } from '@testing-library/react';

// src/firebase.js exports null services when VITE_FIREBASE_* is missing (#102).
vi.mock('../firebase', () => ({ auth: null, googleProvider: {}, db: null }));

import useAuth from '../hooks/useAuth';

describe('useAuth without Firebase config', () => {
  it('stays signed out and ready instead of crashing on a null auth service', async () => {
    const { result } = renderHook(() => useAuth());
    await waitFor(() => expect(result.current.authReady).toBe(true));
    expect(result.current.user).toBeNull();
  });
});
