import { describe, it, expect } from 'vitest';
import {
  WHATS_NEW,
  APP_VERSION,
  RELEASE_TAGS,
  RELEASE_ACTION_KINDS,
  latestReleaseId,
} from '../data/releases';

const SEMVER = /^\d+\.\d+\.\d+$/;

describe('What\'s New feed', () => {
  it('has at least one entry and a semver app version', () => {
    expect(WHATS_NEW.length).toBeGreaterThan(0);
    expect(APP_VERSION).toMatch(SEMVER);
  });

  it('entries have the required shape', () => {
    WHATS_NEW.forEach(entry => {
      expect(entry.id, 'id').toBeTruthy();
      expect(entry.version, `${entry.id} version`).toMatch(SEMVER);
      expect(entry.date, `${entry.id} date`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(RELEASE_TAGS, `${entry.id} tag`).toContain(entry.tag);
      expect(typeof entry.title, `${entry.id} title`).toBe('string');
      expect(entry.title.length).toBeGreaterThan(4);
      expect(typeof entry.blurb, `${entry.id} blurb`).toBe('string');
      expect(entry.blurb.length).toBeGreaterThan(20);
    });
  });

  it('entry ids are unique', () => {
    const ids = WHATS_NEW.map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('actions use known kinds so the nav can route them', () => {
    WHATS_NEW.filter(e => e.action).forEach(entry => {
      expect(RELEASE_ACTION_KINDS, `${entry.id} action kind`).toContain(entry.action.kind);
    });
  });

  it('is ordered newest release first', () => {
    const toNum = (v) => v.split('.').map(Number);
    for (let i = 1; i < WHATS_NEW.length; i++) {
      const [aMaj, aMin, aPat] = toNum(WHATS_NEW[i - 1].version);
      const [bMaj, bMin, bPat] = toNum(WHATS_NEW[i].version);
      const a = aMaj * 1e6 + aMin * 1e3 + aPat;
      const b = bMaj * 1e6 + bMin * 1e3 + bPat;
      expect(a, `${WHATS_NEW[i].id} out of order`).toBeGreaterThanOrEqual(b);
    }
  });

  it('exposes the newest entry id for seen-state tracking', () => {
    expect(latestReleaseId()).toBe(WHATS_NEW[0].id);
  });
});
