// Pure helpers for backing up local progress to Firestore and merging the
// cloud copy back in. Local-first: the site works fully without an account,
// and merging never removes anything the learner earned on either side.

const ATTEMPTS_PER_TOPIC_CAP = 20;

/** Serialize the explore-mode state into a plain JSON-safe object. */
export function makeSnapshot({ visited, copied, mastered, badges, attempts, retention } = {}) {
  return {
    visited: [...(visited || [])],
    copied: [...(copied || [])],
    mastered: [...(mastered || [])],
    badges: [...(badges || [])],
    attempts: attempts || {},
    retention: retention || {},
  };
}

function mergeIds(a = [], b = []) {
  return [...new Set([...a, ...b])];
}

function attemptKey(entry) {
  return `${entry.ts}|${entry.sessionId || ''}|${entry.variantId || ''}`;
}

function mergeAttemptLists(a = [], b = []) {
  const seen = new Set();
  return [...a, ...b]
    .filter(entry => {
      if (!entry || typeof entry.ts !== 'number') return false;
      const key = attemptKey(entry);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((x, y) => x.ts - y.ts)
    .slice(-ATTEMPTS_PER_TOPIC_CAP);
}

function mergeRetentionLists(a = [], b = []) {
  const seen = new Set();
  return [...a, ...b]
    .filter(entry => {
      if (!entry || typeof entry.ts !== 'number') return false;
      if (seen.has(entry.ts)) return false;
      seen.add(entry.ts);
      return true;
    })
    .sort((x, y) => x.ts - y.ts);
}

function mergeTopicMaps(a = {}, b = {}, mergeLists) {
  const out = {};
  new Set([...Object.keys(a), ...Object.keys(b)]).forEach(topicId => {
    out[topicId] = mergeLists(a[topicId], b[topicId]);
  });
  return out;
}

export function mergeAttemptMaps(a, b) {
  return mergeTopicMaps(a || {}, b || {}, mergeAttemptLists);
}

export function mergeRetentionMaps(a, b) {
  return mergeTopicMaps(a || {}, b || {}, mergeRetentionLists);
}

/** Union two snapshots. Either side may be null/undefined. */
export function mergeSnapshots(local, remote) {
  if (!remote) return makeSnapshot(local || {});
  if (!local) return makeSnapshot(remote);
  return {
    visited: mergeIds(local.visited, remote.visited),
    copied: mergeIds(local.copied, remote.copied),
    mastered: mergeIds(local.mastered, remote.mastered),
    badges: mergeIds(local.badges, remote.badges),
    attempts: mergeAttemptMaps(local.attempts, remote.attempts),
    retention: mergeRetentionMaps(local.retention, remote.retention),
  };
}
