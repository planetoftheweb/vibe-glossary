// What's New feed — powers the sparkles dropdown in the top nav (and the
// collapsible section in the main menu on phones). Newest entries first.
//
// Add an entry here for every release with user-facing features so new
// learning modules get showcased; the /deploy pipeline includes this step.
//
// Entry shape:
//   id       unique slug (also used to track "seen" state)
//   version  semver string of the release that shipped it
//   date     YYYY-MM-DD
//   tag      'module' | 'feature' | 'improvement'
//   title    short headline
//   blurb    1–2 plain-language sentences
//   image    optional path under /public (e.g. '/releases/accounts.png')
//   action   optional deep link: { kind, id? } where kind is one of
//            'glossary' | 'build' | 'tour' | 'paths' | 'build-paths' |
//            'proof' | 'score' | 'account'
import { version as APP_VERSION } from '../../package.json';

export { APP_VERSION };

export const RELEASE_TAGS = ['module', 'feature', 'improvement'];
export const RELEASE_ACTION_KINDS = [
  'glossary', 'build', 'tour', 'paths', 'build-paths', 'proof', 'score', 'account',
];

export const WHATS_NEW = [
  {
    id: 'accounts-backup',
    version: '0.10.0',
    date: '2026-08-17',
    tag: 'feature',
    title: 'Optional accounts — back up your progress',
    blurb: 'Sign in with Google or email to keep your VibeScore, badges, and progress safe across devices. No account needed to use the site.',
    image: null,
    action: { kind: 'account' },
  },
  {
    id: 'feature-tour',
    version: '0.10.0',
    date: '2026-08-17',
    tag: 'feature',
    title: 'Guided feature tour',
    blurb: 'A quick walkthrough of the glossary, prompt builder, VibeScore, and learning paths. Replay it any time from here.',
    image: null,
    action: { kind: 'tour' },
  },
  {
    id: 'vibe-prompting-path',
    version: '0.9.0',
    date: '2026-08-17',
    tag: 'module',
    title: 'New path: Vibe prompting for UI',
    blurb: '15 topics across Design Language, AI Literacy, and Web Foundations with an end-of-path quiz. Earn the badge to meet the class bar.',
    image: null,
    action: { kind: 'build-paths' },
  },
  {
    id: 'class-proof',
    version: '0.9.0',
    date: '2026-08-17',
    tag: 'feature',
    title: 'Class proof links',
    blurb: 'Submit your progress as class work: copy a proof link showing your VibeScore, level, and badges. Instructors open it to verify.',
    image: null,
    action: { kind: 'proof' },
  },
  {
    id: 'design-language-topics',
    version: '0.9.0',
    date: '2026-08-17',
    tag: 'module',
    title: '5 new Design Language topics',
    blurb: 'Color contrast and WCAG, readable type, design tokens as a contract, one primary call to action, and brand constraints.',
    image: null,
    action: { kind: 'build', id: 'contrast-wcag' },
  },
];

const SEEN_KEY = 'vg-whatsnew-seen';

export function latestReleaseId() {
  return WHATS_NEW[0]?.id || null;
}

export function hasUnseenReleases() {
  try {
    return latestReleaseId() !== localStorage.getItem(SEEN_KEY);
  } catch {
    return false;
  }
}

export function markReleasesSeen() {
  try {
    const id = latestReleaseId();
    if (id) localStorage.setItem(SEEN_KEY, id);
  } catch { /* private mode — the dot just stays */ }
}
