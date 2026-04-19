/**
 * Quiz integrity rules.
 *
 * The scoring system gives the biggest points (Passed / Mastered) for clean
 * quiz answers. "Clean" = passed the integrity checks below. Failing checks
 * does NOT block the user from finishing the quiz. They still see the result
 * and can keep learning. The attempt simply records `valid: false`, which the
 * scoring layer treats as zero-point practice.
 *
 * Everything in this file is pure (no React, no DOM). Time inputs are passed
 * in by the caller so tests can pin down `now`.
 */

export const TIME_FLOOR_MS = 4_000;
export const TIME_CEILING_MS = 90_000;
export const PASS_COOLDOWN_MS = 30 * 60 * 1000;
export const MASTERED_RETENTION_DELAY_MS = 30 * 24 * 60 * 60 * 1000;
export const VARIANT_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Generate a session ID. The caller (a small App-level effect) writes this
 * to sessionStorage on first read so it survives in-tab navigation but resets
 * on a new tab/window/reload. The "different session" half of the mastery
 * rule depends on this resetting often enough to actually mean "later".
 */
export function newSessionId(now = Date.now(), rand = Math.random) {
  const r = rand().toString(36).slice(2, 8);
  return `s_${now}_${r}`;
}

/**
 * Decide if an answer attempt counts toward score.
 *
 * Inputs:
 *   - timePerQuestionMs: array of millisecond durations (one per question)
 *   - answeredCount:     number of questions answered (length of timePerQuestionMs)
 *   - cooldownLastTs:    timestamp of the previous COUNTED attempt for this
 *                         topic, or null if there is none
 *   - now:               current timestamp
 *
 * Returns: { valid: bool, reasons: string[] }
 *   `reasons` lets the UI explain "this attempt was practice only because…".
 *   We never throw; we return structured data and let the UI choose tone.
 */
export function evaluateAttempt({
  timePerQuestionMs = [],
  cooldownLastTs = null,
  now = Date.now(),
} = {}) {
  const reasons = [];

  for (let i = 0; i < timePerQuestionMs.length; i++) {
    const ms = timePerQuestionMs[i];
    if (typeof ms !== 'number' || Number.isNaN(ms) || ms < TIME_FLOOR_MS) {
      reasons.push(`question_${i + 1}_too_fast`);
    } else if (ms > TIME_CEILING_MS) {
      reasons.push(`question_${i + 1}_too_slow`);
    }
  }

  if (cooldownLastTs != null && now - cooldownLastTs < PASS_COOLDOWN_MS) {
    reasons.push('cooldown');
  }

  if (timePerQuestionMs.length === 0) {
    reasons.push('no_questions_answered');
  }

  return { valid: reasons.length === 0, reasons };
}

/**
 * Pick the next question variant for a topic, biased away from anything
 * the learner has seen recently. Falls back to a random pick from the full
 * bank if every variant is "recent".
 *
 * Inputs:
 *   - bank:        array of variant objects (each must have an `id`)
 *   - attempts:    array of past attempts for this topic, each { ts, variantId }
 *   - now:         current timestamp
 *   - rand:        injectable Math.random for tests
 */
export function pickVariant(bank, attempts = [], now = Date.now(), rand = Math.random) {
  if (!Array.isArray(bank) || bank.length === 0) return null;
  if (bank.length === 1) return bank[0];

  const recentVariantIds = new Set(
    attempts
      .filter(a => now - a.ts < VARIANT_COOLDOWN_MS)
      .map(a => a.variantId),
  );

  const fresh = bank.filter(v => !recentVariantIds.has(v.id));
  const pool = fresh.length > 0 ? fresh : bank;

  return pool[Math.floor(rand() * pool.length)];
}

/**
 * Given a previous mastery timestamp, return the next time a retention check
 * unlocks (or `null` if not yet mastered).
 */
export function nextRetentionDue(masteredAt, lastRetentionAt = null) {
  if (!masteredAt) return null;
  const baseline = lastRetentionAt || masteredAt;
  return baseline + MASTERED_RETENTION_DELAY_MS;
}

/**
 * Convenience: is a retention check available right now for the topic?
 */
export function isRetentionDue({ masteredAt, lastRetentionAt = null, now = Date.now() }) {
  const due = nextRetentionDue(masteredAt, lastRetentionAt);
  if (due == null) return false;
  return now >= due;
}

/**
 * Friendly, plain-English version of the integrity reasons. The UI uses these
 * verbatim; keeping them here means the tone is consistent across surfaces.
 */
export function explainReasons(reasons = []) {
  if (!reasons.length) return null;
  if (reasons.includes('cooldown')) {
    return 'Practice run, this topic is on a 30-minute cooldown for points.';
  }
  if (reasons.some(r => r.endsWith('_too_fast'))) {
    return 'Practice run, give each question at least four seconds and we will count it.';
  }
  if (reasons.some(r => r.endsWith('_too_slow'))) {
    return 'Practice run, one of the answers took too long. Trust your gut next time.';
  }
  if (reasons.includes('no_questions_answered')) {
    return 'Practice run, no questions answered.';
  }
  return 'Practice run.';
}
