import { useState, useCallback, useMemo } from 'react';
import { CATEGORIES } from '../data/categories';

const STORAGE_KEY = 'vg-explored';
const COPIED_KEY = 'vg-copied';
const MASTERED_KEY = 'vg-mastered';
const BADGES_KEY = 'vg-badges';

// All component IDs flattened
const ALL_IDS = CATEGORIES.flatMap(cat => cat.items.map(i => i.id));
const TOTAL = ALL_IDS.length;

// Deterministic "component of the day" based on date
function getComponentOfTheDay() {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return ALL_IDS[seed % TOTAL];
}

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

export default function useExploreMode() {
  const [visited, setVisited] = useState(() => loadSet(STORAGE_KEY));
  const [copied, setCopied] = useState(() => loadSet(COPIED_KEY));
  const [mastered, setMastered] = useState(() => loadSet(MASTERED_KEY));
  const [badges, setBadges] = useState(() => loadSet(BADGES_KEY));

  const componentOfTheDay = useMemo(() => getComponentOfTheDay(), []);

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
    const unvisited = ALL_IDS.filter(id => !visited.has(id));
    const pool = unvisited.length > 0 ? unvisited : ALL_IDS;
    return pool[Math.floor(Math.random() * pool.length)];
  }, [visited]);

  const progress = {
    visited: visited.size,
    copied: copied.size,
    mastered: mastered.size,
    badges: badges.size,
    total: TOTAL,
    percent: Math.round((visited.size / TOTAL) * 100),
    masteredPercent: Math.round((mastered.size / TOTAL) * 100),
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
    resetProgress,
  };
}
