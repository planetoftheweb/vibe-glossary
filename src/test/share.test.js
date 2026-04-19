import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  buildShareText,
  buildShareUrls,
  suggestedTags,
  canNativeShare,
  nativeShare,
  copyToClipboard,
  defaultShareUrl,
} from '../lib/share';

describe('buildShareText', () => {
  it('formats a vibe-score share with the level', () => {
    const text = buildShareText({ kind: 'vibe-score', score: 152, level: 'Tinkerer' });
    expect(text).toContain('152 VibeScore');
    expect(text).toContain('Tinkerer level');
    expect(text).toContain('Vibe Glossary');
  });

  it('formats a vibe-score share without a level', () => {
    const text = buildShareText({ kind: 'vibe-score', score: 12 });
    expect(text).toContain('12 VibeScore');
    expect(text).not.toContain('level');
  });

  it('formats a level-up share', () => {
    const text = buildShareText({ kind: 'level-up', level: 'Shipper' });
    expect(text).toContain('New level');
    expect(text).toContain('Shipper');
  });

  it('formats a path-badge share for the build section', () => {
    const text = buildShareText({ kind: 'path-badge', pathName: 'AI literacy', section: 'build' });
    expect(text).toContain('AI literacy badge');
    expect(text).toContain('Build Literacy');
  });

  it('defaults a path-badge share to the UI Glossary copy', () => {
    const text = buildShareText({ kind: 'path-badge', pathName: 'Surfaces & overlays' });
    expect(text).toContain('UI Glossary');
  });

  it('formats a topic-mastered share with the topic title', () => {
    const text = buildShareText({ kind: 'topic-mastered', title: 'Modal / Dialog' });
    expect(text).toContain('Mastered Modal / Dialog');
  });

  it('falls back gracefully when kind is unknown', () => {
    const text = buildShareText({ kind: 'whatever' });
    expect(text).toContain('Vibe Glossary');
  });
});

describe('suggestedTags', () => {
  it('always includes the core tags', () => {
    expect(suggestedTags({})).toEqual(expect.arrayContaining(['VibeCoding', 'VibeGlossary']));
  });

  it('adds BuildLiteracy for build-section path badges', () => {
    expect(suggestedTags({ kind: 'path-badge', section: 'build' })).toContain('BuildLiteracy');
  });

  it('adds UIDesign for non-build path badges', () => {
    expect(suggestedTags({ kind: 'path-badge' })).toContain('UIDesign');
  });
});

describe('buildShareUrls', () => {
  const text = 'I just hit 200 VibeScore on Vibe Glossary.';
  const url = 'https://vibeglossary.app/';
  const tags = ['VibeCoding'];

  it('returns URLs for every supported platform', () => {
    const urls = buildShareUrls({ text, url, tags });
    expect(Object.keys(urls).sort()).toEqual([
      'bluesky', 'facebook', 'linkedin', 'mailto', 'reddit', 'x',
    ]);
  });

  it('encodes the X intent with text + url + hashtag', () => {
    const { x } = buildShareUrls({ text, url, tags });
    expect(x).toContain('twitter.com/intent/tweet');
    expect(x).toContain(encodeURIComponent('#VibeCoding'));
    expect(x).toContain(encodeURIComponent(url));
  });

  it('uses the LinkedIn share-offsite endpoint', () => {
    const { linkedin } = buildShareUrls({ text, url });
    expect(linkedin).toContain('linkedin.com/sharing/share-offsite/');
    expect(linkedin).toContain(encodeURIComponent(url));
  });

  it('puts text and url in the Facebook quote/u params', () => {
    const { facebook } = buildShareUrls({ text, url });
    expect(facebook).toContain('facebook.com/sharer/sharer.php');
    expect(facebook).toContain('quote=');
    expect(facebook).toContain('u=');
  });

  it('builds a Bluesky compose intent with text + url inline', () => {
    const { bluesky } = buildShareUrls({ text, url });
    expect(bluesky).toContain('bsky.app/intent/compose');
    expect(bluesky).toContain(encodeURIComponent(url));
  });

  it('builds a Reddit submit URL with title + url', () => {
    const { reddit } = buildShareUrls({ text, url });
    expect(reddit).toContain('reddit.com/submit');
    expect(reddit).toContain(encodeURIComponent(text));
  });

  it('builds a mailto with subject + body', () => {
    const { mailto } = buildShareUrls({ text, url, subject: 'Look at this' });
    expect(mailto).toContain('mailto:?');
    expect(mailto).toContain(encodeURIComponent('Look at this'));
    expect(mailto).toContain(encodeURIComponent(url));
  });

  it('falls back to the default share URL when none is supplied', () => {
    const { x } = buildShareUrls({ text });
    expect(x).toContain(encodeURIComponent(defaultShareUrl()));
  });
});

describe('canNativeShare / nativeShare', () => {
  beforeEach(() => {
    delete globalThis.navigator;
  });

  afterEach(() => {
    delete globalThis.navigator;
  });

  it('returns false when navigator.share is missing', () => {
    globalThis.navigator = {};
    expect(canNativeShare()).toBe(false);
  });

  it('returns true when navigator.share exists', () => {
    globalThis.navigator = { share: vi.fn() };
    expect(canNativeShare()).toBe(true);
  });

  it('throws when nativeShare is called without support', async () => {
    globalThis.navigator = {};
    await expect(nativeShare({ text: 'hi' })).rejects.toThrow(/not available/);
  });

  it('resolves true when the user completes a native share', async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    globalThis.navigator = { share };
    await expect(nativeShare({ title: 't', text: 'x', url: 'https://e.io/' })).resolves.toBe(true);
    expect(share).toHaveBeenCalledWith({ title: 't', text: 'x', url: 'https://e.io/' });
  });

  it('resolves false when the user cancels the native share', async () => {
    const err = Object.assign(new Error('cancelled'), { name: 'AbortError' });
    globalThis.navigator = { share: vi.fn().mockRejectedValue(err) };
    await expect(nativeShare({ text: 'x' })).resolves.toBe(false);
  });
});

describe('copyToClipboard', () => {
  beforeEach(() => {
    delete globalThis.navigator;
  });

  afterEach(() => {
    delete globalThis.navigator;
  });

  it('uses navigator.clipboard when available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    globalThis.navigator = { clipboard: { writeText } };
    await expect(copyToClipboard('hello')).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith('hello');
  });

  it('falls back to false when no clipboard API is available in node', async () => {
    globalThis.navigator = {};
    const original = globalThis.document;
    delete globalThis.document;
    await expect(copyToClipboard('hello')).resolves.toBe(false);
    if (original) globalThis.document = original;
  });
});
