export const TOUR_VERSION = 2;

export const TOUR_STEPS = [
  {
    id: 'browse',
    title: 'Pick a component',
    body: 'The left panel shows the definition and a copy-ready AI prompt for whatever component you pick. Try clicking through a few.',
    target: '[data-tour="definition-panel"]',
  },
  {
    id: 'copy-prompt',
    title: 'Copy a prompt',
    body: 'Hit the copy button on the prompt builder to grab a starter you can paste straight into your AI tool.',
    target: '[data-tour="prompt-builder"]',
  },
  {
    id: 'score',
    title: 'Your VibeScore',
    body: 'Every component you visit, prompt you copy, or quiz you pass earns points. This pill shows your running total and level.',
    target: '[data-tour="vibe-score"]',
  },
  {
    id: 'share',
    title: 'Share your progress',
    body: 'Hit a milestone? Open the score breakdown and use this button to share it on social. Bragging rights included.',
    target: '[data-tour="share-score"]',
    action: 'openScoreBreakdown',
  },
  {
    id: 'proof',
    title: 'Class proof',
    body: 'Need to show an instructor you did the work? Click this button to generate a proof link from the score breakdown. No account needed.',
    target: '[data-tour="class-proof"]',
    action: 'openScoreBreakdown',
  },
  {
    id: 'search',
    title: 'Quick search',
    body: 'Press Command+K (or Ctrl+K) anytime to jump straight to any component or build topic.',
    target: '[data-tour="search"]',
  },
  {
    id: 'paths',
    title: 'Learning paths and badges',
    body: 'Open the menu to find curated paths that tie related topics together. Finish one and earn a badge.',
    target: '[data-tour="learning-paths"]',
    action: 'openMenu',
  },
];

const STORAGE_KEY = 'vg-tour-version-seen';

export function hasSeenCurrentTour() {
  try {
    const seen = localStorage.getItem(STORAGE_KEY);
    return seen !== null && Number(seen) >= TOUR_VERSION;
  } catch {
    return false;
  }
}

export function markTourSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, String(TOUR_VERSION));
  } catch {}
}

export function resetTourSeen() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
