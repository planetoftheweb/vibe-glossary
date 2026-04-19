import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { GLOSSARY_DATA } from '../data/glossary';
import { GLOSSARY_DETAILS } from '../data/glossaryDetails';

// Module-level cache, fetched once per page load, shared across all callers
let _cache = null;

export function useGlossary() {
  const [glossary, setGlossary] = useState(_cache || GLOSSARY_DATA);

  useEffect(() => {
    if (_cache) return;
    getDocs(collection(db, 'components'))
      .then(snapshot => {
        if (snapshot.empty) return; // Firestore not seeded yet, keep local data
        const remote = {};
        snapshot.forEach(doc => { remote[doc.id] = doc.data(); });
        // Merge strategy: start with Firestore so anything new lands, but the
        // curated local copy always wins on the teaching-facing fields below.
        // Re-seeding Firestore is asynchronous; this keeps the in-app text in
        // sync with whatever lives in the repo today.
        const TEACHING_FIELDS = [
          'title',
          'definition',
          'details',
          'comparison',
          'vibeTip',
        ];
        const merged = { ...GLOSSARY_DATA, ...remote };
        for (const id of Object.keys(merged)) {
          const local = GLOSSARY_DATA[id];
          if (!local) continue;
          const overrides = {};
          for (const field of TEACHING_FIELDS) {
            if (local[field] !== undefined) overrides[field] = local[field];
          }
          if (GLOSSARY_DETAILS[id] && !overrides.details) {
            overrides.details = GLOSSARY_DETAILS[id];
          }
          merged[id] = { ...merged[id], ...overrides };
        }
        _cache = merged;
        setGlossary(_cache);
      })
      .catch(() => {
        // Firestore unavailable, silently stay on local data
      });
  }, []);

  return glossary;
}
