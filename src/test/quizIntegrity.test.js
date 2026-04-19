import { describe, it, expect } from 'vitest';
import {
  evaluateAttempt,
  pickVariant,
  newSessionId,
  nextRetentionDue,
  isRetentionDue,
  explainReasons,
  TIME_FLOOR_MS,
  TIME_CEILING_MS,
  PASS_COOLDOWN_MS,
  MASTERED_RETENTION_DELAY_MS,
} from '../lib/quizIntegrity';

describe('newSessionId', () => {
  it('produces a stable shape including the timestamp', () => {
    const id = newSessionId(1700000000000, () => 0.123456);
    expect(id.startsWith('s_1700000000000_')).toBe(true);
    expect(id.length).toBeGreaterThan('s_1700000000000_'.length);
  });
});

describe('evaluateAttempt', () => {
  it('valid when each question is between floor and ceiling', () => {
    const r = evaluateAttempt({
      timePerQuestionMs: [TIME_FLOOR_MS + 1, TIME_FLOOR_MS + 1000],
    });
    expect(r.valid).toBe(true);
    expect(r.reasons).toEqual([]);
  });

  it('invalid when any question is too fast', () => {
    const r = evaluateAttempt({ timePerQuestionMs: [TIME_FLOOR_MS - 1, TIME_FLOOR_MS + 100] });
    expect(r.valid).toBe(false);
    expect(r.reasons).toContain('question_1_too_fast');
  });

  it('invalid when any question is too slow', () => {
    const r = evaluateAttempt({ timePerQuestionMs: [TIME_FLOOR_MS + 100, TIME_CEILING_MS + 1] });
    expect(r.valid).toBe(false);
    expect(r.reasons).toContain('question_2_too_slow');
  });

  it('invalid when no questions were answered', () => {
    const r = evaluateAttempt({ timePerQuestionMs: [] });
    expect(r.valid).toBe(false);
    expect(r.reasons).toContain('no_questions_answered');
  });

  it('invalid while still inside the cooldown window', () => {
    const now = 1_000_000_000;
    const r = evaluateAttempt({
      timePerQuestionMs: [TIME_FLOOR_MS + 100],
      cooldownLastTs: now - PASS_COOLDOWN_MS + 1,
      now,
    });
    expect(r.valid).toBe(false);
    expect(r.reasons).toContain('cooldown');
  });

  it('valid once cooldown has elapsed', () => {
    const now = 1_000_000_000;
    const r = evaluateAttempt({
      timePerQuestionMs: [TIME_FLOOR_MS + 100],
      cooldownLastTs: now - PASS_COOLDOWN_MS - 1,
      now,
    });
    expect(r.valid).toBe(true);
  });
});

describe('pickVariant', () => {
  const bank = [{ id: 'v1' }, { id: 'v2' }, { id: 'v3' }];

  it('returns null on empty bank', () => {
    expect(pickVariant([])).toBeNull();
  });

  it('returns the only entry when bank has one item', () => {
    expect(pickVariant([{ id: 'only' }])).toEqual({ id: 'only' });
  });

  it('skips variants used inside the cooldown window', () => {
    const now = 1_000_000_000;
    const attempts = [
      { ts: now - 1000, variantId: 'v1' },
      { ts: now - 1000, variantId: 'v2' },
    ];
    const v = pickVariant(bank, attempts, now, () => 0);
    expect(v.id).toBe('v3');
  });

  it('falls back to full bank if every variant is recent', () => {
    const now = 1_000_000_000;
    const attempts = bank.map(v => ({ ts: now, variantId: v.id }));
    const v = pickVariant(bank, attempts, now, () => 0);
    expect(bank.map(b => b.id)).toContain(v.id);
  });

  it('treats old attempts (past 7 days) as not recent', () => {
    const now = 1_000_000_000;
    const attempts = [{ ts: now - 8 * 24 * 60 * 60 * 1000, variantId: 'v1' }];
    const v = pickVariant(bank, attempts, now, () => 0);
    expect(v.id).toBe('v1');
  });
});

describe('nextRetentionDue / isRetentionDue', () => {
  it('null when never mastered', () => {
    expect(nextRetentionDue(null)).toBeNull();
    expect(isRetentionDue({ masteredAt: null })).toBe(false);
  });

  it('is masteredAt + 30 days when never retained', () => {
    expect(nextRetentionDue(1000)).toBe(1000 + MASTERED_RETENTION_DELAY_MS);
  });

  it('shifts forward after each retention pass', () => {
    expect(nextRetentionDue(1000, 5000)).toBe(5000 + MASTERED_RETENTION_DELAY_MS);
  });

  it('isRetentionDue true once we cross the threshold', () => {
    const masteredAt = 1000;
    const now = masteredAt + MASTERED_RETENTION_DELAY_MS + 1;
    expect(isRetentionDue({ masteredAt, now })).toBe(true);
  });
});

describe('explainReasons', () => {
  it('null when no reasons', () => {
    expect(explainReasons([])).toBeNull();
  });

  it('plain-English copy for cooldown', () => {
    expect(explainReasons(['cooldown'])).toMatch(/cooldown/i);
  });

  it('plain-English copy for too fast', () => {
    expect(explainReasons(['question_1_too_fast'])).toMatch(/four seconds/i);
  });

  it('plain-English copy for too slow', () => {
    expect(explainReasons(['question_2_too_slow'])).toMatch(/too long/i);
  });
});
