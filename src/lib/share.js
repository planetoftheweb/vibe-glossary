/**
 * Social-share helpers for learning achievements.
 *
 * Pure, framework-free utilities so the share menu, level-up cards, and tests
 * all share one consistent message format. Nothing here touches React or
 * persistent storage; the UI layer wires `nativeShare` and the URL builders
 * into actual buttons.
 *
 * Two design choices worth knowing about:
 *  1. We never expose the learner's raw score in URLs as anything other than
 *     a number we already show on screen. There is no telemetry sneaked into
 *     the share text.
 *  2. The share copy is intentionally human and modest. We promote learning,
 *     not flexing. "I just hit Tinkerer on VibeGlossary" beats "I CRUSHED IT".
 */

const APP_NAME = 'Vibe Glossary';
const APP_TAGLINE = 'a friendly UI + Build Literacy glossary for vibe coders';

/**
 * Default canonical URL. The browser layer can override per share, but having
 * a sensible fallback lets the lib stay testable in node.
 */
export function defaultShareUrl() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin + (window.location.pathname || '/');
  }
  return 'https://vibeglossary.app/';
}

/**
 * Build the share text for an achievement. Keeps the wording short enough for
 * X (under 200 chars before the URL) but rich enough to read well on LinkedIn.
 *
 * `kind` controls the wording. We intentionally keep the verbs first-person so
 * the learner is the author, not a marketing tagline.
 */
export function buildShareText(achievement = {}) {
  const { kind, title, score, level, pathName, section } = achievement;

  switch (kind) {
    case 'vibe-score': {
      const lvl = level ? ` and reached the ${level} level` : '';
      return `I just hit ${score} VibeScore${lvl} on ${APP_NAME}. ${APP_TAGLINE}.`;
    }
    case 'level-up': {
      return `New level on ${APP_NAME}: ${level}. ${APP_TAGLINE}.`;
    }
    case 'path-badge': {
      const where = section === 'build' ? 'Build Literacy' : 'UI Glossary';
      return `Just earned the ${pathName} badge in the ${where} on ${APP_NAME}. Five questions, no peeking. ${APP_TAGLINE}.`;
    }
    case 'topic-mastered': {
      return `Mastered ${title} on ${APP_NAME}. Two clean quiz passes, different sessions, different question. ${APP_TAGLINE}.`;
    }
    default: {
      return `Learning vibe coding on ${APP_NAME}. ${APP_TAGLINE}.`;
    }
  }
}

/**
 * Suggested hashtags. Kept short and on-topic. Platforms that don't surface
 * hashtags (Email, Copy) just ignore them; X/LinkedIn append them inline.
 */
export function suggestedTags(achievement = {}) {
  const base = ['VibeCoding', 'VibeGlossary'];
  if (achievement.kind === 'path-badge' && achievement.section === 'build') {
    return [...base, 'BuildLiteracy'];
  }
  if (achievement.kind === 'path-badge') {
    return [...base, 'UIDesign'];
  }
  return base;
}

function appendTags(text, tags) {
  if (!tags?.length) return text;
  return `${text} ${tags.map(t => `#${t}`).join(' ')}`;
}

/**
 * Build platform-specific share URLs.
 *
 * Returns an object keyed by platform id: `x`, `linkedin`, `facebook`,
 * `bluesky`, `reddit`, `mailto`. Each value is a fully-encoded URL the UI
 * can stick into an `<a target="_blank">` or `window.open`.
 */
export function buildShareUrls({ text, url, tags = [], subject } = {}) {
  const safeUrl = url || defaultShareUrl();
  const taggedText = appendTags(text || '', tags);
  const enc = encodeURIComponent;

  return {
    x: `https://twitter.com/intent/tweet?text=${enc(taggedText)}&url=${enc(safeUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(safeUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(safeUrl)}&quote=${enc(taggedText)}`,
    bluesky: `https://bsky.app/intent/compose?text=${enc(`${taggedText} ${safeUrl}`)}`,
    reddit: `https://www.reddit.com/submit?title=${enc(text || '')}&url=${enc(safeUrl)}`,
    mailto: `mailto:?subject=${enc(subject || text || APP_NAME)}&body=${enc(`${taggedText}\n\n${safeUrl}`)}`,
  };
}

/**
 * True when the browser exposes the Web Share API. Always false in non-browser
 * environments so tests can rely on the same gate.
 */
export function canNativeShare() {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
}

/**
 * Trigger the native share sheet. Returns a promise that resolves to `true`
 * on success, `false` if the user cancelled, and rejects on programmer error
 * (no support, missing payload).
 */
export async function nativeShare({ title, text, url } = {}) {
  if (!canNativeShare()) {
    throw new Error('Web Share API not available');
  }
  try {
    await navigator.share({
      title: title || APP_NAME,
      text: text || '',
      url: url || defaultShareUrl(),
    });
    return true;
  } catch (err) {
    if (err && err.name === 'AbortError') return false;
    throw err;
  }
}

/**
 * Copy a string to the clipboard. Returns true on success, false otherwise.
 * Falls back to a hidden textarea + execCommand for older browsers.
 */
export async function copyToClipboard(value) {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      /* fall through to legacy path */
    }
  }
  if (typeof document === 'undefined') return false;
  try {
    const ta = document.createElement('textarea');
    ta.value = value;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
