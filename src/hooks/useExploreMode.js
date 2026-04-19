import { useState, useCallback, useMemo, useEffect } from 'react';
import { CATEGORIES } from '../data/categories';
import { buildTiers, vibeScore, levelFor } from '../lib/scoring';
import { newSessionId } from '../lib/quizIntegrity';

const STORAGE_KEY = 'vg-explored';
const COPIED_KEY = 'vg-copied';
const MASTERED_KEY = 'vg-mastered';
const BADGES_KEY = 'vg-badges';
const ATTEMPTS_KEY = 'vg-attempts';
const RETENTION_KEY = 'vg-retention';
const SESSION_KEY = 'vg-session-id';
const ATTEMPTS_PER_TOPIC_CAP = 20;

function loadSet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function loadMap(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveSet(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

function saveMap(key, map) {
  localStorage.setItem(key, JSON.stringify(map));
}

/**
 * Resolve (or mint) the per-tab session id. The "different session" half of
 * the mastery rule depends on this resetting between tab loads, so we use
 * sessionStorage rather than localStorage. Falls back to a transient id if
 * sessionStorage is unavailable (private mode, etc.).
 */
function getSessionId() {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const fresh = newSessionId();
    sessionStorage.setItem(SESSION_KEY, fresh);
    return fresh;
  } catch {
    return newSessionId();
  }
}

export default function useExploreMode(categories = CATEGORIES, buildClusters = []) {
  const allIds = useMemo(
    () => categories.flatMap(cat => cat.items.map(i => i.id)),
    [categories]
  );
  const total = allIds.length;

  // Build-literacy domain: same visited/mastered/copied stores, but the
  // progress UI in the TopNav needs its own totals and per-cluster breakdown.
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

  // attempts: { [topicId]: Array<{ ts, sessionId, variantId, valid, correct, reasons }> }
  // Capped per topic so the localStorage payload stays small.
  const [attempts, setAttempts] = useState(() => loadMap(ATTEMPTS_KEY));

  // retention: { [topicId]: Array<{ ts }> }, one entry per successful retention check
  const [retention, setRetention] = useState(() => loadMap(RETENTION_KEY));

  const [sessionId] = useState(getSessionId);

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

  /**
   * Append a quiz attempt for a topic. Caller (QuizCard or PathView) is
   * responsible for running `evaluateAttempt` against the time-per-question
   * data and supplying `valid` + `reasons`. We trust their decision so the
   * scoring math stays pure.
   */
  const recordQuizAttempt = useCallback((topicId, attempt) => {
    if (!topicId || !attempt) return;
    setAttempts(prev => {
      const list = prev[topicId] || [];
      const merged = [
        ...list,
        {
          ts: attempt.ts ?? Date.now(),
          sessionId: attempt.sessionId ?? sessionId,
          variantId: attempt.variantId ?? 'default',
          valid: !!attempt.valid,
          correct: !!attempt.correct,
          reasons: attempt.reasons || [],
        },
      ].slice(-ATTEMPTS_PER_TOPIC_CAP);
      const next = { ...prev, [topicId]: merged };
      saveMap(ATTEMPTS_KEY, next);
      return next;
    });
  }, [sessionId]);

  const recordRetentionPass = useCallback((topicId) => {
    if (!topicId) return;
    setRetention(prev => {
      const list = prev[topicId] || [];
      const next = { ...prev, [topicId]: [...list, { ts: Date.now() }] };
      saveMap(RETENTION_KEY, next);
      return next;
    });
  }, []);

  const surpriseMe = useCallback(() => {
    const unvisited = allIds.filter(id => !visited.has(id));
    const pool = unvisited.length > 0 ? unvisited : allIds;
    return pool[Math.floor(Math.random() * pool.length)];
  }, [visited, allIds]);

  // Surprise Me, build-literacy edition. Same "favor unvisited" trick so a
  // user who has explored most of the section eventually sees the new things.
  const surpriseMeBuild = useCallback(() => {
    if (!buildIds.length) return null;
    const unvisited = buildIds.filter(id => !visited.has(id));
    const pool = unvisited.length > 0 ? unvisited : buildIds;
    return pool[Math.floor(Math.random() * pool.length)];
  }, [visited, buildIds]);

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

  // --- VibeScore ---
  // Tiers are the per-topic "did we pass / master / retain" verdict, derived
  // from the attempts log. We compute them once and let the score pill,
  // breakdown modal, and tier badges all read from the same source of truth.
  const tiers = useMemo(() => buildTiers({
    topicIds: [...allIds, ...buildIds],
    visitedSet: visited,
    copiedSet: copied,
    attemptsByTopic: attempts,
    retentionByTopic: retention,
  }), [allIds, buildIds, visited, copied, attempts, retention]);

  // Path bonuses are the existing badge sets. We split them by which universe
  // they belong to so the breakdown can report each correctly. A badge id
  // is treated as a build path if it contains "build-" or matches a build
  // cluster id; otherwise it is a glossary path. (Matches buildPaths.js.)
  const buildPathIdSet = useMemo(() => {
    const set = new Set(buildClusters.map(c => c.id));
    return set;
  }, [buildClusters]);

  const { glossaryPathBadges, buildPathBadges } = useMemo(() => {
    const g = [];
    const b = [];
    badges.forEach(id => {
      if (buildPathIdSet.has(id)) b.push(id);
      else g.push(id);
    });
    return { glossaryPathBadges: g, buildPathBadges: b };
  }, [badges, buildPathIdSet]);

  const score = useMemo(() => vibeScore({
    glossaryIds: allIds,
    buildIds,
    tiers,
    glossaryPaths: glossaryPathBadges,
    buildPaths: buildPathBadges,
  }), [allIds, buildIds, tiers, glossaryPathBadges, buildPathBadges]);

  const level = useMemo(() => levelFor(score.total), [score.total]);

  // Auto-promote topics that have hit "passed" or "mastered" in the tiers
  // table into the canonical mastered set. Keeps the legacy badge UI in sync
  // with quiz performance without any caller changes.
  useEffect(() => {
    let changed = false;
    const next = new Set(mastered);
    for (const id of Object.keys(tiers)) {
      if (tiers[id].mastered && !next.has(id)) {
        next.add(id);
        changed = true;
      }
    }
    if (changed) {
      saveSet(MASTERED_KEY, next);
      setMastered(next);
    }
    // Intentional: only react to tier changes; mastered is read but not a dep.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tiers]);

  const resetProgress = useCallback(() => {
    [STORAGE_KEY, COPIED_KEY, MASTERED_KEY, BADGES_KEY, ATTEMPTS_KEY, RETENTION_KEY]
      .forEach(k => localStorage.removeItem(k));
    setVisited(new Set());
    setCopied(new Set());
    setMastered(new Set());
    setBadges(new Set());
    setAttempts({});
    setRetention({});
  }, []);

  return {
    visited,
    copied,
    mastered,
    badges,
    attempts,
    retention,
    sessionId,
    componentOfTheDay,
    markVisited,
    markCopied,
    markMastered,
    awardBadge,
    recordQuizAttempt,
    recordRetentionPass,
    surpriseMe,
    surpriseMeBuild,
    progress,
    buildProgress,
    buildClusters,
    tiers,
    score,
    level,
    resetProgress,
  };
}
