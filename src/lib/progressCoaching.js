import { POINTS } from './scoring.js';

export const REVIEW_SIZE = 5;
export const REVIEW_ROUND_POINTS = REVIEW_SIZE * POINTS.passed;

/**
 * Translate a point threshold into concrete learning work.
 *
 * A "review answer" is one correct checkpoint question (+5). A complete
 * five-item review can therefore add up to 25 points. The exact mix uses
 * prompt copies (+2) and visits (+1) to cover the small remainder without
 * claiming that a learner must overshoot a goal.
 */
export function goalProgress(score = 0, target = 0) {
  const safeScore = Math.max(0, Number(score) || 0);
  const safeTarget = Math.max(0, Number(target) || 0);
  const remaining = Math.max(0, safeTarget - safeScore);
  const reviewAnswers = Math.floor(remaining / POINTS.passed);
  const afterReviews = remaining - (reviewAnswers * POINTS.passed);
  const prompts = Math.floor(afterReviews / POINTS.used);
  const visits = afterReviews - (prompts * POINTS.used);

  return {
    target: safeTarget,
    remaining,
    met: remaining === 0,
    percent: safeTarget === 0 ? 100 : Math.min(100, Math.round((safeScore / safeTarget) * 100)),
    reviewAnswers,
    reviewRounds: remaining === 0 ? 0 : Math.ceil(remaining / REVIEW_ROUND_POINTS),
    prompts,
    visits,
    plan: [
      reviewAnswers > 0 && {
        id: 'review',
        count: reviewAnswers,
        label: reviewAnswers === 1 ? 'review answer' : 'review answers',
        points: reviewAnswers * POINTS.passed,
      },
      prompts > 0 && {
        id: 'prompt',
        count: prompts,
        label: prompts === 1 ? 'used prompt' : 'used prompts',
        points: prompts * POINTS.used,
      },
      visits > 0 && {
        id: 'visit',
        count: visits,
        label: visits === 1 ? 'new item' : 'new items',
        points: visits * POINTS.visited,
      },
    ].filter(Boolean),
  };
}
export function reviewsCopy(reviewRounds) {
  if (reviewRounds <= 0) return 'Requirement complete';
  return `As few as ${reviewRounds} five-item ${reviewRounds === 1 ? 'review' : 'reviews'}`;
}
