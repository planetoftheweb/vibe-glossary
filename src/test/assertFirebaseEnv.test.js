import { describe, expect, it } from 'vitest';
import { assertFirebaseEnv } from '../../scripts/assertFirebaseEnv.js';

describe('#52 fail the build if Firebase projectId is missing', () => {
  it('throws when projectId is missing on build', () => {
    expect(() => assertFirebaseEnv({}, { command: 'build' })).toThrow(/VITE_FIREBASE_PROJECT_ID/);
    expect(() => assertFirebaseEnv({ VITE_FIREBASE_PROJECT_ID: '' }, { command: 'build' })).toThrow(/dead #root/);
    expect(() => assertFirebaseEnv({ VITE_FIREBASE_PROJECT_ID: '   ' }, { command: 'build' })).toThrow(/required to build/);
  });

  it('passes when projectId is present on build', () => {
    expect(() =>
      assertFirebaseEnv({ VITE_FIREBASE_PROJECT_ID: 'vibe-glossary' }, { command: 'build' }),
    ).not.toThrow();
  });

  it('does not fail vite serve or tests', () => {
    expect(() => assertFirebaseEnv({}, { command: 'serve' })).not.toThrow();
  });
});
