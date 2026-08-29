/** Fail a production build when Firebase env is missing. Empty VITE_* inlines as void 0 and kills #root (#52). */
export function assertFirebaseEnv(env, { command = 'build' } = {}) {
  if (command !== 'build') return;
  const projectId = env?.VITE_FIREBASE_PROJECT_ID;
  if (projectId && String(projectId).trim()) return;
  throw new Error(
    'VITE_FIREBASE_PROJECT_ID is required to build. Empty Firebase config ships a dead #root.',
  );
}
