import { useState, useCallback, useMemo } from 'react';
import { CATEGORIES } from '../data/categories';

const STORAGE_KEY = 'vg-explored';
const COPIED_KEY = 'vg-copied';
const MASTERED_KEY = 'vg-mastered';
const BADGES_KEY = 'vg-badges';

function loadSet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveSet(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

export default function useExploreMode(categories = CATEGORIES, buildClusters = []) {
  const allIds = useMemo(
    () => categories.flatMap(cat => cat.items.map(i => i.id)),
    [categories]
  );
  const total = allIds.length;

  // Build-literacy domain: same visited/mastered/copied stores, but the
  // progress UI in the TopNav needs its own totals and per-cluster breakdown.
  // IDs do not collide with glossary IDs (build uses things like "mvp",
  // "tag-element-attribute"; glossary uses "modal", "drawer", etc.).
  const buildIds = useMemo(
    () => buildClusters.flatMap(cluster => cluster.topics.map(t => t.id)),
    [buildClusters]
  );
  const buildTotal = buildIds.length;

  const componentOfTheDay = useMemo(() => {
    if (!allIds.length) return null;
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    return allIds[seed % allIds.length];
  }, [allIds]);

  const [visited, setVisited] = useState(() => loadSet(STORAGE_KEY));
  const [copied, setCopied] = useState(() => loadSet(COPIED_KEY));
  const [mastered, setMastered] = useState(() => loadSet(MASTERED_KEY));
  const [badges, setBadges] = useState(() => loadSet(BADGES_KEY));

  const markVisited = useCallback((id) => {
    setVisited(prev => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      saveSet(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const markCopied = useCallback((id) => {
    setCopied(prev => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      saveSet(COPIED_KEY, next);
      return next;
    });
  }, []);

  const markMastered = useCallback((id) => {
    setMastered(prev => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      saveSet(MASTERED_KEY, next);
      return next;
    });
  }, []);

  const awardBadge = useCallback((pathId) => {
    setBadges(prev => {
      if (prev.has(pathId)) return prev;
      const next = new Set(prev);
      next.add(pathId);
      saveSet(BADGES_KEY, next);
      return next;
    });
  }, []);

  const surpriseMe = useCallback(() => {
    const unvisited = allIds.filter(id => !visited.has(id));
    const pool = unvisited.length > 0 ? unvisited : allIds;
    return pool[Math.floor(Math.random() * pool.length)];
  }, [visited, allIds]);

  // Glossary-only progress (preserves the existing public shape).
  const visitedGlossary = useMemo(
    () => allIds.filter(id => visited.has(id)).length,
    [allIds, visited]
  );
  const copiedGlossary = useMemo(
    () => allIds.filter(id => copied.has(id)).length,
    [allIds, copied]
  );
  const masteredGlossary = useMemo(
    () => allIds.filter(id => mastered.has(id)).length,
    [allIds, mastered]
  );

  const progress = {
    visited: visitedGlossary,
    copied: copiedGlossary,
    mastered: masteredGlossary,
    badges: badges.size,
    total,
    percent: total ? Math.round((visitedGlossary / total) * 100) : 0,
    masteredPercent: total ? Math.round((masteredGlossary / total) * 100) : 0,
  };

  // Build-literacy progress: same shape, restricted to build topic IDs so
  // the TopNav rings and breakdown can swap context with the active section.
  const visitedBuild = useMemo(
    () => buildIds.filter(id => visited.has(id)).length,
    [buildIds, visited]
  );
  const copiedBuild = useMemo(
    () => buildIds.filter(id => copied.has(id)).length,
    [buildIds, copied]
  );
  const masteredBuild = useMemo(
    () => buildIds.filter(id => mastered.has(id)).length,
    [buildIds, mastered]
  );

  const buildProgress = {
    visited: visitedBuild,
    copied: copiedBuild,
    mastered: masteredBuild,
    total: buildTotal,
    percent: buildTotal ? Math.round((visitedBuild / buildTotal) * 100) : 0,
    masteredPercent: buildTotal ? Math.round((masteredBuild / buildTotal) * 100) : 0,
  };

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(COPIED_KEY);
    localStorage.removeItem(MASTERED_KEY);
    localStorage.removeItem(BADGES_KEY);
    setVisited(new Set());
    setCopied(new Set());
    setMastered(new Set());
    setBadges(new Set());
  }, []);

  return {
    visited,
    copied,
    mastered,
    badges,
    componentOfTheDay,
    markVisited,
    markCopied,
    markMastered,
    awardBadge,
    surpriseMe,
    progress,
    buildProgress,
    buildClusters,
    resetProgress,
  };
}
