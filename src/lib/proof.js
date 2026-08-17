/**
 * Class proof helpers.
 *
 * A student can share a proof URL that encodes their VibeScore, level, badges,
 * and whether they met the class bar. An instructor opens the link and sees a
 * read-only proof card. No backend, no accounts.
 *
 * The class bar (the minimum an instructor should expect):
 *   - Reach Tinkerer (200 pts), OR
 *   - Complete the "Vibe prompting for UI" learning path (earn the badge).
 *
 * Everything here is pure (no React, no DOM, no localStorage).
 */

import { LEVELS, levelFor } from './scoring.js';

export const CLASS_PATH_ID = 'vibe-prompting';
export const CLASS_BAR_LEVEL_ID = 'tinkerer';
export const CLASS_BAR_POINTS = LEVELS.find(l => l.id === CLASS_BAR_LEVEL_ID)?.min ?? 200;

/**
 * Does the student meet the class bar?
 *
 * Returns { met: bool, reasons: string[] }.
 * `reasons` lists each criterion that passed (useful for proof text).
 */
export function classBar({ score = 0, badges = new Set() } = {}) {
  const reasons = [];
  const level = levelFor(score);

  if (score >= CLASS_BAR_POINTS) {
    reasons.push(`Reached ${level.current.label} (${score} pts)`);
  }
  if (badges.has(CLASS_PATH_ID)) {
    reasons.push('Completed "Vibe prompting for UI" path');
  }

  return { met: reasons.length > 0, reasons };
}

/**
 * Build a compact proof snapshot that can round-trip through a URL hash.
 *
 * Shape: { s, l, b, d, v }
 *   s = score (number)
 *   l = level id (string)
 *   b = array of earned badge ids
 *   d = ISO date string
 *   v = format version (for future-proofing)
 */
export function buildProofSnapshot({ score = 0, level, badges = new Set() } = {}) {
  const lvl = level || levelFor(score);
  return {
    v: 1,
    s: score,
    l: lvl.current.id,
    b: [...badges],
    d: new Date().toISOString(),
  };
}

/**
 * Encode a proof snapshot into a URL-safe string (base64url of JSON).
 */
export function encodeProof(snapshot) {
  const json = JSON.stringify(snapshot);
  if (typeof btoa === 'function') {
    return btoa(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  return Buffer.from(json).toString('base64url');
}

/**
 * Decode a proof string back into a snapshot. Returns null on failure.
 */
export function decodeProof(encoded) {
  try {
    let b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4 !== 0) b64 += '=';
    const json = typeof atob === 'function'
      ? atob(b64)
      : Buffer.from(b64, 'base64').toString('utf-8');
    const obj = JSON.parse(json);
    if (typeof obj.s !== 'number' || typeof obj.l !== 'string') return null;
    return obj;
  } catch {
    return null;
  }
}

/**
 * Build the full proof URL from a snapshot.
 */
export function buildProofUrl(snapshot, origin) {
  const base = origin || (typeof window !== 'undefined' ? window.location.origin : 'https://vibe-glossary.web.app');
  return `${base}/#proof=${encodeProof(snapshot)}`;
}

/**
 * Build human-readable proof text suitable for pasting into Canvas, a form,
 * or an email. Includes the proof URL so the instructor can verify.
 */
export function buildProofText({ snapshot, proofUrl } = {}) {
  if (!snapshot) return '';
  const lvl = LEVELS.find(l => l.id === snapshot.l);
  const levelLabel = lvl ? lvl.label : snapshot.l;
  const bar = classBar({ score: snapshot.s, badges: new Set(snapshot.b || []) });
  const date = snapshot.d ? new Date(snapshot.d).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  }) : 'unknown date';

  const lines = [
    'VibeGlossary Class Proof',
    '========================',
    `VibeScore: ${snapshot.s}`,
    `Level: ${levelLabel}`,
    `Badges earned: ${(snapshot.b || []).length > 0 ? snapshot.b.join(', ') : 'none'}`,
    `Date: ${date}`,
    `Class bar: ${bar.met ? 'MET' : 'NOT MET'}`,
  ];

  if (bar.met && bar.reasons.length) {
    lines.push(`Criteria: ${bar.reasons.join('; ')}`);
  }

  if (proofUrl) {
    lines.push('', `Verify: ${proofUrl}`);
  }

  return lines.join('\n');
}
