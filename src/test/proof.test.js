import { describe, it, expect } from 'vitest';
import {
  classBar,
  buildProofSnapshot,
  encodeProof,
  decodeProof,
  buildProofUrl,
  buildProofText,
  CLASS_BAR_POINTS,
  CLASS_PATH_ID,
} from '../lib/proof';

describe('classBar', () => {
  it('is not met with zero score and no badges', () => {
    const result = classBar({ score: 0, badges: new Set() });
    expect(result.met).toBe(false);
    expect(result.reasons).toHaveLength(0);
  });

  it('is met when score reaches Tinkerer threshold', () => {
    const result = classBar({ score: CLASS_BAR_POINTS, badges: new Set() });
    expect(result.met).toBe(true);
    expect(result.reasons.length).toBeGreaterThan(0);
    expect(result.reasons[0]).toContain('Tinkerer');
  });

  it('is met when score exceeds Tinkerer threshold', () => {
    const result = classBar({ score: 500, badges: new Set() });
    expect(result.met).toBe(true);
    expect(result.reasons[0]).toContain('Shipper');
  });

  it('is met when class path badge is earned even with low score', () => {
    const result = classBar({ score: 10, badges: new Set([CLASS_PATH_ID]) });
    expect(result.met).toBe(true);
    expect(result.reasons.some(r => r.includes('Vibe prompting'))).toBe(true);
  });

  it('is met with both criteria (two reasons)', () => {
    const result = classBar({ score: 300, badges: new Set([CLASS_PATH_ID]) });
    expect(result.met).toBe(true);
    expect(result.reasons).toHaveLength(2);
  });

  it('is not met at 199 pts without the class path badge', () => {
    const result = classBar({ score: 199, badges: new Set() });
    expect(result.met).toBe(false);
  });

  it('defaults safely when called with no arguments', () => {
    const result = classBar();
    expect(result.met).toBe(false);
    expect(result.reasons).toEqual([]);
  });
});

describe('buildProofSnapshot', () => {
  it('produces a snapshot with the expected shape', () => {
    const snap = buildProofSnapshot({
      score: 250,
      badges: new Set(['design-language', 'vibe-prompting']),
    });
    expect(snap.v).toBe(1);
    expect(snap.s).toBe(250);
    expect(snap.l).toBe('tinkerer');
    expect(snap.b).toEqual(expect.arrayContaining(['design-language', 'vibe-prompting']));
    expect(snap.d).toBeTruthy();
  });

  it('defaults to lurker with zero score', () => {
    const snap = buildProofSnapshot({ score: 0 });
    expect(snap.l).toBe('lurker');
    expect(snap.b).toEqual([]);
  });
});

describe('encodeProof / decodeProof', () => {
  it('round-trips a snapshot through encode and decode', () => {
    const original = {
      v: 1,
      s: 200,
      l: 'tinkerer',
      b: ['design-language'],
      d: '2026-08-15T00:00:00.000Z',
    };
    const encoded = encodeProof(original);
    expect(typeof encoded).toBe('string');
    expect(encoded.length).toBeGreaterThan(0);

    const decoded = decodeProof(encoded);
    expect(decoded).toEqual(original);
  });

  it('produces URL-safe characters (no +, /, or =)', () => {
    const encoded = encodeProof({ v: 1, s: 999, l: 'vibe-coder', b: ['a', 'b', 'c'], d: new Date().toISOString() });
    expect(encoded).not.toMatch(/[+/=]/);
  });

  it('returns null for garbage input', () => {
    expect(decodeProof('not-valid-base64!!!')).toBeNull();
  });

  it('returns null for valid base64 but invalid JSON', () => {
    const fakeB64 = btoa('this is not json').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    expect(decodeProof(fakeB64)).toBeNull();
  });

  it('returns null for JSON missing required fields', () => {
    const noScore = btoa(JSON.stringify({ v: 1, l: 'lurker' })).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    expect(decodeProof(noScore)).toBeNull();
  });
});

describe('buildProofUrl', () => {
  it('builds a URL with #proof= hash', () => {
    const snap = { v: 1, s: 200, l: 'tinkerer', b: [], d: '2026-08-15T00:00:00.000Z' };
    const url = buildProofUrl(snap, 'https://vibe-glossary.web.app');
    expect(url).toMatch(/^https:\/\/vibe-glossary\.web\.app\/#proof=/);
  });

  it('the encoded part decodes back to the snapshot', () => {
    const snap = { v: 1, s: 200, l: 'tinkerer', b: ['vibe-prompting'], d: '2026-08-15T00:00:00.000Z' };
    const url = buildProofUrl(snap, 'https://example.com');
    const encoded = url.split('#proof=')[1];
    expect(decodeProof(encoded)).toEqual(snap);
  });
});

describe('buildProofText', () => {
  it('includes all required proof fields', () => {
    const snap = { v: 1, s: 250, l: 'tinkerer', b: ['design-language'], d: '2026-08-15T00:00:00.000Z' };
    const text = buildProofText({ snapshot: snap, proofUrl: 'https://example.com/#proof=abc' });
    expect(text).toContain('VibeGlossary Class Proof');
    expect(text).toContain('250');
    expect(text).toContain('Tinkerer');
    expect(text).toContain('design-language');
    expect(text).toContain('MET');
    expect(text).toContain('https://example.com/#proof=abc');
  });

  it('shows NOT MET when class bar is not reached', () => {
    const snap = { v: 1, s: 10, l: 'lurker', b: [], d: '2026-08-15T00:00:00.000Z' };
    const text = buildProofText({ snapshot: snap });
    expect(text).toContain('NOT MET');
  });

  it('handles missing snapshot gracefully', () => {
    expect(buildProofText({})).toBe('');
    expect(buildProofText()).toBe('');
  });

  it('contains no em dashes', () => {
    const snap = { v: 1, s: 500, l: 'shipper', b: ['vibe-prompting', 'design-language'], d: '2026-08-15T00:00:00.000Z' };
    const text = buildProofText({ snapshot: snap, proofUrl: 'https://example.com' });
    expect(text).not.toContain('\u2014');
    expect(text).not.toContain('\u2013');
  });
});
