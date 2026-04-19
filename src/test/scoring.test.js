import { describe, it, expect } from 'vitest';
import {
  POINTS,
  LEVELS,
  levelFor,
  scoreSection,
  vibeScore,
  tierFor,
  buildTiers,
} from '../lib/scoring';

describe('levelFor', () => {
  it('starts at Lurker for zero', () => {
    expect(levelFor(0).current.id).toBe('lurker');
  });

  it('advances to Scroller at exactly 50', () => {
    expect(levelFor(50).current.id).toBe('scroller');
  });

  it('reports points to next rung', () => {
    const r = levelFor(60);
    expect(r.current.id).toBe('scroller');
    expect(r.next.id).toBe('tinkerer');
    expect(r.pointsToNext).toBe(140);
  });

  it('caps at the top rung with no next', () => {
    const r = levelFor(5000);
    expect(r.current.id).toBe('vibe-coder');
    expect(r.next).toBeNull();
    expect(r.pointsToNext).toBe(0);
  });

  it('exposes a stable LEVELS list', () => {
    expect(LEVELS.map(l => l.id)).toEqual([
      'lurker', 'scroller', 'tinkerer', 'shipper', 'polyglot', 'vibe-coder',
    ]);
  });
});

describe('tierFor', () => {
  it('all-false when nothing happened', () => {
    const t = tierFor();
    expect(t).toEqual({
      visited: false, used: false, passed: false, mastered: false,
      masteredAt: null, retainedCount: 0,
    });
  });

  it('marks visited and used from flags', () => {
    const t = tierFor({ visited: true, used: true });
    expect(t.visited).toBe(true);
    expect(t.used).toBe(true);
    expect(t.passed).toBe(false);
  });

  it('marks passed on a single valid+correct attempt', () => {
    const t = tierFor({
      attempts: [{ ts: 1000, sessionId: 's1', variantId: 'v1', valid: true, correct: true }],
    });
    expect(t.passed).toBe(true);
    expect(t.mastered).toBe(false);
  });

  it('does NOT mark passed for an invalid attempt', () => {
    const t = tierFor({
      attempts: [{ ts: 1000, sessionId: 's1', variantId: 'v1', valid: false, correct: true }],
    });
    expect(t.passed).toBe(false);
  });

  it('does NOT master on two passes in the same session', () => {
    const t = tierFor({
      attempts: [
        { ts: 1, sessionId: 's1', variantId: 'v1', valid: true, correct: true },
        { ts: 2, sessionId: 's1', variantId: 'v2', valid: true, correct: true },
      ],
    });
    expect(t.passed).toBe(true);
    expect(t.mastered).toBe(false);
  });

  it('does NOT master on two passes of the same variant in different sessions', () => {
    const t = tierFor({
      attempts: [
        { ts: 1, sessionId: 's1', variantId: 'v1', valid: true, correct: true },
        { ts: 2, sessionId: 's2', variantId: 'v1', valid: true, correct: true },
      ],
    });
    expect(t.mastered).toBe(false);
  });

  it('masters when two valid passes hit two sessions and two variants', () => {
    const t = tierFor({
      attempts: [
        { ts: 100, sessionId: 's1', variantId: 'v1', valid: true, correct: true },
        { ts: 200, sessionId: 's2', variantId: 'v2', valid: true, correct: true },
      ],
    });
    expect(t.mastered).toBe(true);
    expect(t.masteredAt).toBe(200);
  });

  it('counts retention passes', () => {
    const t = tierFor({
      attempts: [],
      retentionPasses: [{ ts: 1 }, { ts: 2 }, { ts: 3 }],
    });
    expect(t.retainedCount).toBe(3);
  });
});

describe('scoreSection', () => {
  const ids = ['a', 'b', 'c'];

  it('sums points across the configured tiers', () => {
    const tiers = {
      a: { visited: true, used: true, passed: true, mastered: true, retainedCount: 0 },
      b: { visited: true, used: false, passed: false, mastered: false, retainedCount: 0 },
      c: { visited: false, used: false, passed: false, mastered: false, retainedCount: 0 },
    };
    const r = scoreSection(ids, tiers);
    // a: 1+2+5+10 = 18 ; b: 1 ; c: 0 -> 19
    expect(r.total).toBe(19);
    expect(r.visited).toBe(POINTS.visited * 2);
    expect(r.used).toBe(POINTS.used);
    expect(r.passed).toBe(POINTS.passed);
    expect(r.mastered).toBe(POINTS.mastered);
    expect(r.pathBonus).toBe(0);
  });

  it('adds path bonuses', () => {
    const r = scoreSection(['a'], { a: { visited: true } }, ['p1', 'p2']);
    expect(r.pathBonus).toBe(2 * POINTS.pathBonus);
    expect(r.total).toBe(POINTS.visited + 2 * POINTS.pathBonus);
  });

  it('ignores ids that are not in the universe', () => {
    const r = scoreSection(['a'], {
      a: { visited: true },
      b: { visited: true, used: true, passed: true },
    });
    expect(r.total).toBe(POINTS.visited);
  });

  it('multiplies retained by the count', () => {
    const r = scoreSection(['a'], { a: { retainedCount: 4 } });
    expect(r.retained).toBe(4 * POINTS.retained);
  });
});

describe('vibeScore', () => {
  it('combines glossary + build totals into one number', () => {
    const tiers = {
      g1: { visited: true, used: true, passed: true, mastered: true, retainedCount: 1 },
      b1: { visited: true, passed: true },
    };
    const r = vibeScore({
      glossaryIds: ['g1'],
      buildIds: ['b1'],
      tiers,
      glossaryPaths: ['p'],
      buildPaths: [],
    });
    // g1: 1+2+5+10+5 = 23, +25 path = 48
    // b1: 1+5 = 6
    expect(r.glossary.total).toBe(48);
    expect(r.build.total).toBe(6);
    expect(r.total).toBe(54);
  });
});

describe('buildTiers', () => {
  it('returns a zero row for every id even when activity is empty', () => {
    const m = buildTiers({ topicIds: ['a', 'b'] });
    expect(Object.keys(m)).toEqual(['a', 'b']);
    expect(m.a.passed).toBe(false);
  });

  it('flows visited/used/attempts through', () => {
    const m = buildTiers({
      topicIds: ['a'],
      visitedSet: new Set(['a']),
      copiedSet: new Set(['a']),
      attemptsByTopic: {
        a: [
          { ts: 1, sessionId: 's1', variantId: 'v1', valid: true, correct: true },
          { ts: 2, sessionId: 's2', variantId: 'v2', valid: true, correct: true },
        ],
      },
    });
    expect(m.a.visited).toBe(true);
    expect(m.a.used).toBe(true);
    expect(m.a.passed).toBe(true);
    expect(m.a.mastered).toBe(true);
  });
});
