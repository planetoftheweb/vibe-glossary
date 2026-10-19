/**
 * One-time seed script — pushes all glossary entries from glossary.js into Firestore.
 *
 * Prerequisites:
 *   1. Enable Firestore in the Firebase console (vibe-glossary project, Native mode).
 *   2. Authenticate with Application Default Credentials:
 *        gcloud auth application-default login
 *   3. Run:
 *        node scripts/seedFirestore.js
 *
 * Safe to re-run — uses set() which overwrites existing documents.
 */

import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp({
  credential: applicationDefault(),
  projectId: 'vibe-glossary',
});
const db = getFirestore();

// Dynamically import data (ESM)
const { GLOSSARY_DATA } = await import('../src/data/glossary.js');
const { CATEGORIES } = await import('../src/data/categories.jsx');

async function seedBatch(collectionName, entries) {
  const BATCH_SIZE = 500;
  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = db.batch();
    const chunk = entries.slice(i, i + BATCH_SIZE);
    for (const [id, data] of chunk) {
      batch.set(db.collection(collectionName).doc(id), data);
    }
    await batch.commit();
    console.log(`[${collectionName}] Seeded ${i + chunk.length}/${entries.length}`);
  }
}

async function seed() {
  // Seed components
  await seedBatch('components', Object.entries(GLOSSARY_DATA));
  console.log('Done. Firestore collection "components" is ready.');

  // Seed categories — strip the React icon component, store iconId string instead
  const catEntries = CATEGORIES.map((cat, order) => {
    const { icon: _icon, ...rest } = cat;
    return [cat.id, { ...rest, iconId: cat.id, order }];
  });
  await seedBatch('categories', catEntries);
  console.log('Done. Firestore collection "categories" is ready.');
}

seed().catch(err => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
