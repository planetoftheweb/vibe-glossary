import { describe, expect, it } from 'vitest';
import { goalProgress, reviewsCopy } from '../lib/progressCoaching';

describe('goalProgress', () => {
  it('turns a 17 point gap into an exact action recipe', () => {
    expect(goalProgress(33, 50)).toMatchObject({
      remaining: 17,
      reviewAnswers: 3,
      reviewRounds: 1,
      prompts: 1,
      visits: 0,
      percent: 66,
    });
    expect(goalProgress(33, 50).plan).toEqual([
      { id: 'review', count: 3, label: 'review answers', points: 15 },
      { id: 'prompt', count: 1, label: 'used prompt', points: 2 },
    ]);
  });

  it('shows the remaining class workload in five-item reviews', () => {
    const result = goalProgress(33, 200);
    expect(result.remaining).toBe(167);
    expect(result.reviewRounds).toBe(7);
    expect(reviewsCopy(result.reviewRounds)).toBe('As few as 7 five-item reviews');
  });

  it('returns a completed goal without phantom work', () => {
    expect(goalProgress(250, 200)).toMatchObject({
      remaining: 0,
      met: true,
      reviewAnswers: 0,
      reviewRounds: 0,
      plan: [],
    });
  });
});
