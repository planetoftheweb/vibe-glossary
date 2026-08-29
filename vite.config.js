import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { assertFirebaseEnv } from './scripts/assertFirebaseEnv.js';

function requireFirebaseEnv() {
  return {
    name: 'require-firebase-env',
    config(_cfg, { command, mode }) {
      const env = loadEnv(mode, process.cwd(), 'VITE_');
      assertFirebaseEnv(env, { command });
    },
  };
}

export default defineConfig({
  plugins: [requireFirebaseEnv(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    css: false,
  },
});
