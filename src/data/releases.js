// What's New feed powers the announcement dropdown in the top nav (and the
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
//            'glossary' | 'build' | 'tour' |
//            'proof' | 'score' | 'account'
import { version as APP_VERSION } from '../../package.json';

export { APP_VERSION };

export const RELEASE_TAGS = ['module', 'feature', 'improvement'];
export const RELEASE_ACTION_KINDS = [
  'glossary', 'build', 'tour', 'proof', 'score', 'account',
];

export const WHATS_NEW = [
  {
    id: 'motion-language',
    version: '0.12.0',
    date: '2026-08-18',
    tag: 'module',
    title: 'Motion language and a scroll landing',
    blurb: 'Five new Design Language topics: motion tokens, particle fields, scroll-linked motion, reduced motion, and infinite scroll vs pages. The homepage now morphs a particle field as you scroll.',
    image: null,
    action: { kind: 'build', id: 'particle-field' },
  },
  {
    id: 'protocols-cluster',
    version: '0.11.0',
    date: '2026-08-17',
    tag: 'module',
    title: 'New cluster: Protocols and APIs',
    blurb: 'How computers actually talk: protocols, HTTP, DNS, SMTP and email, ports and localhost, what an API really is, and real-time with WebSockets. These topics now feed the five-item checkpoint quizzes.',
    image: null,
    action: { kind: 'build', id: 'what-is-a-protocol' },
  },
  {
    id: 'design-principles',
    version: '0.11.0',
    date: '2026-08-17',
    tag: 'module',
    title: 'Design Language: 8 new principle topics',
    blurb: 'Semantic color roles, the DESIGN.md contract, tripwires vs strong defaults, page grammar, empty states, loading stability, iconography, and microcopy. The principles that keep AI-built UIs consistent.',
    image: null,
    action: { kind: 'build', id: 'semantic-color-roles' },
  },
  {
    id: 'accounts-backup',
    version: '0.10.0',
    date: '2026-08-17',
    tag: 'feature',
    title: 'Optional accounts, back up your progress',
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
    blurb: 'A quick walkthrough of the glossary, prompt builder, VibeScore, and five-item learning checkpoints. Replay it any time from here.',
    image: null,
    action: { kind: 'tour' },
  },
  {
    id: 'vibe-prompting-path',
    version: '0.9.0',
    date: '2026-08-17',
    tag: 'module',
    title: 'Vibe prompting for UI',
    blurb: '15 topics across Design Language, AI Literacy, and Web Foundations, now included in the five-item checkpoint flow.',
    image: null,
    action: { kind: 'build', id: 'prompts-roles' },
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
