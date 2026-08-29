/**
 * Shareable addresses for glossary and build-literacy topics.
 *
 * Canonical form is a path Firebase already rewrites to index.html:
 *   /glossary/modal
 *   /build/particle-field
 *
 * Also honors the URLs people already try: /components/:id, ?component=,
 * ?topic=, #/glossary/:id, #particle-field. Proof links (#proof=) stay first.
 */
import { GLOSSARY_DATA } from '../data/glossary';
import { getBuildTopic } from '../data/buildLiteracy';

function decodeSlug(value) {
  if (!value) return '';
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function matchSectionPath(path) {
  const clean = String(path || '/').replace(/\/+$/, '') || '/';
  const m = clean.match(/^\/(glossary|build|components)\/([^/]+)$/);
  if (!m) return null;
  const section = m[1] === 'components' ? 'glossary' : m[1];
  return { section, id: decodeSlug(m[2]) };
}

export function isProofLocation(loc) {
  const hash = loc?.hash || '';
  return hash.startsWith('#proof=');
}

/**
 * @param {Pick<Location, 'pathname' | 'search' | 'hash'>} loc
 * @returns {{ type: 'proof' } | { type: 'topic', section: 'glossary' | 'build' | null, id: string } | { type: 'none' }}
 */
export function parseTopicLocation(loc) {
  const location = loc || (typeof window !== 'undefined' ? window.location : { pathname: '/', search: '', hash: '' });
  const hash = location.hash || '';
  if (hash.startsWith('#proof=')) return { type: 'proof' };

  const fromPath = matchSectionPath(location.pathname || '/');
  if (fromPath) return { type: 'topic', ...fromPath };

  const hashBody = hash.startsWith('#') ? hash.slice(1) : hash;
  if (hashBody && !hashBody.startsWith('proof=')) {
    const hashedPath = hashBody.startsWith('/') ? hashBody : `/${hashBody}`;
    const fromHashPath = matchSectionPath(hashedPath);
    if (fromHashPath) return { type: 'topic', ...fromHashPath };
    if (hashBody && !hashBody.includes('=')) {
      return { type: 'topic', section: null, id: decodeSlug(hashBody) };
    }
  }

  const rawSearch = location.search || '';
  const params = new URLSearchParams(rawSearch.startsWith('?') ? rawSearch.slice(1) : rawSearch);
  const buildId = params.get('topic') || params.get('build') || params.get('b');
  const glossaryId = params.get('component') || params.get('glossary') || params.get('g');
  if (buildId) return { type: 'topic', section: 'build', id: decodeSlug(buildId) };
  if (glossaryId) return { type: 'topic', section: 'glossary', id: decodeSlug(glossaryId) };

  return { type: 'none' };
}

export function isGlossaryTopicId(id) {
  return Boolean(id && GLOSSARY_DATA[id]);
}

export function isBuildTopicId(id) {
  return Boolean(id && getBuildTopic(id));
}

/**
 * Map a parsed location onto a real topic. A path that names the wrong
 * catalog still opens the topic if the id exists in the other one, so
 * /glossary/particle-field lands on the build topic instead of Modal.
 */
export function resolveTopicRef(parsed) {
  if (!parsed || parsed.type !== 'topic' || !parsed.id) return null;
  const { section, id } = parsed;
  if (section === 'build' && isBuildTopicId(id)) return { section: 'build', id };
  if (section === 'glossary' && isGlossaryTopicId(id)) return { section: 'glossary', id };
  if (isBuildTopicId(id)) return { section: 'build', id };
  if (isGlossaryTopicId(id)) return { section: 'glossary', id };
  return null;
}

export function topicHref(section, id) {
  if (!id) return '/';
  const slug = encodeURIComponent(id);
  return section === 'build' ? `/build/${slug}` : `/glossary/${slug}`;
}

export function syncTopicUrl(section, id, { replace = false } = {}) {
  if (typeof window === 'undefined' || !id) return;
  if (isProofLocation(window.location)) return;
  const href = topicHref(section, id);
  const currentPath = (window.location.pathname || '/').replace(/\/+$/, '') || '/';
  const dirty = Boolean(window.location.search || (window.location.hash && !window.location.hash.startsWith('#proof=')));
  if (currentPath === href) {
    if (dirty) window.history.replaceState(null, '', href);
    return;
  }
  window.history[replace ? 'replaceState' : 'pushState'](null, '', href);
}

export function topicFromWindow() {
  if (typeof window === 'undefined') return null;
  return resolveTopicRef(parseTopicLocation(window.location));
}
