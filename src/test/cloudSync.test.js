import { describe, it, expect } from 'vitest';
import {
  makeSnapshot,
  mergeSnapshots,
  mergeAttemptMaps,
  mergeRetentionMaps,
} from '../lib/cloudSync';

describe('makeSnapshot', () => {
  it('serializes sets into arrays and defaults maps', () => {
    const snap = makeSnapshot({
      visited: new Set(['a', 'b']),
      copied: new Set(['a']),
      mastered: new Set(),
      badges: new Set(['path-1']),
    });
    expect(snap.visited.sort()).toEqual(['a', 'b']);
    expect(snap.copied).toEqual(['a']);
    expect(snap.mastered).toEqual([]);
    expect(snap.badges).toEqual(['path-1']);
    expect(snap.attempts).toEqual({});
    expect(snap.retention).toEqual({});
  });

  it('tolerates a completely empty input', () => {
    const snap = makeSnapshot({});
    expect(snap.visited).toEqual([]);
    expect(snap.attempts).toEqual({});
  });
});

describe('mergeSnapshots', () => {
  const local = {
    visited: ['a', 'b'],
    copied: ['a'],
    mastered: ['a'],
    badges: ['p1'],
    attempts: { a: [{ ts: 1, sessionId: 's1', variantId: 'v1', valid: true, correct: true }] },
    retention: { a: [{ ts: 5 }] },
  };
  const remote = {
    visited: ['b', 'c'],
    copied: ['c'],
    mastered: ['c'],
    badges: ['p2'],
    attempts: { a: [{ ts: 2, sessionId: 's2', variantId: 'v2', valid: true, correct: false }] },
    retention: { a: [{ ts: 5 }, { ts: 9 }] },
  };

  it('unions ids from both sides without duplicates', () => {
    const merged = mergeSnapshots(local, remote);
    expect(merged.visited.sort()).toEqual(['a', 'b', 'c']);
    expect(merged.copied.sort()).toEqual(['a', 'c']);
    expect(merged.mastered.sort()).toEqual(['a', 'c']);
    expect(merged.badges.sort()).toEqual(['p1', 'p2']);
  });

  it('combines attempt logs sorted by timestamp', () => {
    const merged = mergeSnapshots(local, remote);
    expect(merged.attempts.a.map(x => x.ts)).toEqual([1, 2]);
  });

  it('dedupes retention entries by timestamp', () => {
    const merged = mergeSnapshots(local, remote);
    expect(merged.retention.a.map(x => x.ts)).toEqual([5, 9]);
  });

  it('returns the other side when one is missing', () => {
    expect(mergeSnapshots(local, null).visited.sort()).toEqual(['a', 'b']);
    expect(mergeSnapshots(null, remote).visited.sort()).toEqual(['b', 'c']);
    expect(mergeSnapshots(null, null).visited).toEqual([]);
  });
});

describe('mergeAttemptMaps', () => {
  it('dedupes identical attempts by ts + session + variant', () => {
    const entry = { ts: 10, sessionId: 's', variantId: 'v', valid: true, correct: true };
    const merged = mergeAttemptMaps({ a: [entry] }, { a: [{ ...entry }] });
    expect(merged.a).toHaveLength(1);
  });

  it('caps merged lists at 20 attempts, keeping the newest', () => {
    const older = Array.from({ length: 15 }, (_, i) => ({ ts: i, sessionId: 's1', variantId: 'v' }));
    const newer = Array.from({ length: 15 }, (_, i) => ({ ts: 100 + i, sessionId: 's2', variantId: 'v' }));
    const merged = mergeAttemptMaps({ a: older }, { a: newer });
    expect(merged.a).toHaveLength(20);
    expect(merged.a[merged.a.length - 1].ts).toBe(114);
    expect(merged.a[0].ts).toBe(10);
  });

  it('drops malformed entries without a numeric ts', () => {
    const merged = mergeAttemptMaps({ a: [{ ts: 'nope' }, null] }, { a: [{ ts: 3 }] });
    expect(merged.a.map(x => x.ts)).toEqual([3]);
  });

  it('keeps topics that only exist on one side', () => {
    const merged = mergeAttemptMaps({ a: [{ ts: 1 }] }, { b: [{ ts: 2 }] });
    expect(Object.keys(merged).sort()).toEqual(['a', 'b']);
  });
});

describe('mergeRetentionMaps', () => {
  it('unions and sorts retention passes', () => {
    const merged = mergeRetentionMaps({ a: [{ ts: 9 }] }, { a: [{ ts: 3 }] });
    expect(merged.a.map(x => x.ts)).toEqual([3, 9]);
  });
});
