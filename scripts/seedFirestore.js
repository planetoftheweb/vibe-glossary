/**
 * One-time seed script — pushes all glossary entries from glossary.js into Firestore.
 *
 * Prerequisites:
 *   1. Enable Firestore in the Firebase console (vibe-glossary project, Native mode).
 *   2. Download a service account key:
 *      Firebase console → Project Settings → Service accounts → Generate new private key
 *   3. Set the environment variable:
 *        export GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccountKey.json
 *   4. Run:
 *        node scripts/seedFirestore.js
 *
 * Safe to re-run — uses set() which overwrites existing documents.
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'module';
import { readFileSync } from 'fs';

// Load service account from env
const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!credPath) {
  console.error('ERROR: Set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON path.');
  process.exit(1);
}
const serviceAccount = JSON.parse(readFileSync(credPath, 'utf8'));

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// Dynamically import glossary data (ESM)
const { GLOSSARY_DATA } = await import('../src/data/glossary.js');

async function seed() {
  const entries = Object.entries(GLOSSARY_DATA);
  const BATCH_SIZE = 500; // Firestore batch limit

  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = db.batch();
    const chunk = entries.slice(i, i + BATCH_SIZE);
    for (const [id, data] of chunk) {
      batch.set(db.collection('components').doc(id), data);
    }
    await batch.commit();
    console.log(`Seeded ${i + chunk.length}/${entries.length} documents.`);
  }

  console.log('Done. Firestore collection "components" is ready.');
}

seed().catch(err => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
