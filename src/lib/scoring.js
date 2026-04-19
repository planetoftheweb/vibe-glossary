/**
 * VibeScore: a single learning-score for the glossary.
 *
 * Design goals (see proposal in CLAUDE.md / project docs):
 *   - Reward demonstrated understanding, not clicks.
 *   - Cap easy "vanity" actions so they cannot dominate the total.
 *   - Make durable retention (passing again later, in a different session,
 *     on a different question variant) the most valuable single bucket.
 *   - Never subtract points; wrong answers add zero.
 *
 * Tiers per topic:
 *   - Visited     1 pt   opened the topic
 *   - Used        2 pts  copied a prompt
 *   - Passed      5 pts  one clean Quiz Me pass
 *   - Mastered   10 pts  a SECOND clean pass, in a different session,
 *                        on a different question variant
 *   - Retained   +5 pts  rolling, granted by a fresh-variant retention check
 *                        unlocked 30 days after Mastered. Repeatable monthly.
 *
 * Plus per-path bonuses:
 *   - Path completion (UI category or Build cluster path): +25 pts once.
 *
 * Everything in this file is pure (no React, no DOM, no localStorage). Inputs
 * are plain data structures so the math is trivially testable and the same
 * function can power the score pill, the breakdown modal, and the tests.
 */

export const POINTS = Object.freeze({
  visited: 1,
  used: 2,
  passed: 5,
  mastered: 10,
  retained: 5,
  pathBonus: 25,
});

/**
 * Level ladder. Names are intentionally playful but earned: each rung
 * corresponds to roughly one solid evening of study at the previous one.
 */
export const LEVELS = Object.freeze([
  { id: 'lurker',    min: 0,    label: 'Lurker',    blurb: 'Just looking around. Welcome.' },
  { id: 'scroller',  min: 50,   label: 'Scroller',  blurb: 'Getting your bearings.' },
  { id: 'tinkerer',  min: 200,  label: 'Tinkerer',  blurb: 'Connecting the dots.' },
  { id: 'shipper',   min: 500,  label: 'Shipper',   blurb: 'Speaking the language.' },
  { id: 'polyglot',  min: 1000, label: 'Polyglot',  blurb: 'Could explain it to a friend.' },
  { id: 'vibe-coder',min: 2000, label: 'Vibe Coder',blurb: "You've earned the title." },
]);

/**
 * Resolve a numeric score to its level + the next rung (for "X pts to next").
 */
export function levelFor(score) {
  let current = LEVELS[0];
  let next = null;
  for (let i = 0; i < LEVELS.length; i++) {
    if (score >= LEVELS[i].min) {
      current = LEVELS[i];
      next = LEVELS[i + 1] || null;
    } else {
      next = LEVELS[i];
      break;
    }
  }
  return {
    current,
    next,
    pointsIntoLevel: score - current.min,
    pointsToNext: next ? Math.max(0, next.min - score) : 0,
  };
}

/**
 * Score a single tier set against a given universe of topic IDs.
 *
 * `tiers` is the per-topic state map produced by useExploreMode:
 *   { topicId: { visited, used, passed, mastered, retainedCount } }
 *
 * Topics outside `topicIds` are ignored, so we can compute UI-only and
 * build-only sub-scores by passing different ID lists.
 */
export function scoreSection(topicIds, tiers, paths = []) {
  let visited = 0;
  let used = 0;
  let passed = 0;
  let mastered = 0;
  let retained = 0;

  for (const id of topicIds) {
    const t = tiers[id];
    if (!t) continue;
    if (t.visited) visited += POINTS.visited;
    if (t.used) used += POINTS.used;
    if (t.passed) passed += POINTS.passed;
    if (t.mastered) mastered += POINTS.mastered;
    if (t.retainedCount) retained += POINTS.retained * t.retainedCount;
  }

  const pathBonus = paths.length * POINTS.pathBonus;
  const total = visited + used + passed + mastered + retained + pathBonus;

  return { total, visited, used, passed, mastered, retained, pathBonus };
}

/**
 * Top-level score. Combines glossary + build sections into one number, and
 * keeps each sub-score on the side so the breakdown modal can show both.
 */
export function vibeScore({ glossaryIds, buildIds, tiers, glossaryPaths, buildPaths }) {
  const glossary = scoreSection(glossaryIds, tiers, glossaryPaths);
  const build = scoreSection(buildIds, tiers, buildPaths);
  const total = glossary.total + build.total;
  return { total, glossary, build };
}

/**
 * Derive the per-tier flags for one topic from raw activity state.
 *
 * Inputs (all optional, defaults to empty/false):
 *   - visited:  bool
 *   - used:     bool
 *   - attempts: array of { ts, sessionId, variantId, valid, correct }
 *   - retentionPasses: array of { ts } (one entry per successful retention)
 *
 * Outputs:
 *   { visited, used, passed, mastered, retainedCount, masteredAt }
 *
 * Mastery rule (per the user's "session" choice in the design):
 *   At least two valid+correct attempts, in DIFFERENT sessions, on
 *   DIFFERENT question variants. The 4-second floor and 90-second ceiling are
 *   enforced inside `valid` by the integrity layer.
 */
export function tierFor({ visited = false, used = false, attempts = [], retentionPasses = [] } = {}) {
  const validPasses = attempts.filter(a => a.valid && a.correct);

  let passed = false;
  let mastered = false;
  let masteredAt = null;

  if (validPasses.length >= 1) {
    passed = true;
  }

  if (validPasses.length >= 2) {
    const sessions = new Set();
    const variants = new Set();
    let secondPassTs = null;
    for (const a of validPasses) {
      sessions.add(a.sessionId || 'no-session');
      variants.add(a.variantId || 'default');
      if (sessions.size >= 2 && variants.size >= 2 && secondPassTs == null) {
        secondPassTs = a.ts;
      }
    }
    if (sessions.size >= 2 && variants.size >= 2) {
      mastered = true;
      masteredAt = secondPassTs;
    }
  }

  return {
    visited,
    used,
    passed,
    mastered,
    masteredAt,
    retainedCount: retentionPasses.length,
  };
}

/**
 * Build a tiers map for an entire universe in one pass. Returned shape:
 *   { topicId: <result of tierFor> }
 *
 * Caller supplies:
 *   - topicIds:        all IDs we want a tier for (so missing ones get a zero row)
 *   - visitedSet:      Set of topic IDs that have been visited
 *   - copiedSet:       Set of topic IDs that have been copied
 *   - attemptsByTopic: { topicId: attempts[] }
 *   - retentionByTopic:{ topicId: retentionPasses[] }
 */
export function buildTiers({
  topicIds,
  visitedSet = new Set(),
  copiedSet = new Set(),
  attemptsByTopic = {},
  retentionByTopic = {},
}) {
  const out = {};
  for (const id of topicIds) {
    out[id] = tierFor({
      visited: visitedSet.has(id),
      used: copiedSet.has(id),
      attempts: attemptsByTopic[id] || [],
      retentionPasses: retentionByTopic[id] || [],
    });
  }
  return out;
}
