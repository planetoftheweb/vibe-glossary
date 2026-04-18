import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { CATEGORIES, CATEGORY_ICON_REGISTRY } from '../data/categories';

let _cache = null;

export function useCategories() {
  const [categories, setCategories] = useState(_cache || CATEGORIES);

  useEffect(() => {
    if (_cache) return;
    getDocs(collection(db, 'categories'))
      .then(snapshot => {
        if (snapshot.empty) return;
        const docs = [];
        snapshot.forEach(doc => docs.push({ id: doc.id, ...doc.data() }));
        // Sort by order field, resolve icon component from registry
        const resolved = docs
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map(({ id, name, type, iconId, items = [], order: _order }) => {
            const IconComponent = CATEGORY_ICON_REGISTRY[iconId] ?? CATEGORY_ICON_REGISTRY[id];
            return {
              id,
              name,
              type,
              icon: IconComponent ? <IconComponent size={14} /> : null,
              items: [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
            };
          });
        _cache = resolved;
        setCategories(resolved);
      })
      .catch(() => {});
  }, []);

  return categories;
}
