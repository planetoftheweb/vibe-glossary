import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { GLOSSARY_DATA } from '../data/glossary';

// Module-level cache — fetched once per page load, shared across all callers
let _cache = null;

export function useGlossary() {
  const [glossary, setGlossary] = useState(_cache || GLOSSARY_DATA);

  useEffect(() => {
    if (_cache) return;
    getDocs(collection(db, 'components'))
      .then(snapshot => {
        if (snapshot.empty) return; // Firestore not seeded yet — keep local data
        const remote = {};
        snapshot.forEach(doc => { remote[doc.id] = doc.data(); });
        // Merge: Firestore wins on matching keys, local data fills gaps
        _cache = { ...GLOSSARY_DATA, ...remote };
        setGlossary(_cache);
      })
      .catch(() => {
        // Firestore unavailable — silently stay on local data
      });
  }, []);

  return glossary;
}
