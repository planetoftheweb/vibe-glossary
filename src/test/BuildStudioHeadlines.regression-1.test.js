import { describe, expect, it } from 'vitest';
import { BUILD_TOPICS_FLAT, BUILD_TOPIC_IDS } from '../data/buildLiteracy';
import {
  BUILD_STUDIO_HEADLINES,
  getBuildStudioHeadline,
} from '../data/buildStudioCopy';

describe('Build Literacy studio headlines', () => {
  it('gives every lesson an explicit, unique teaching promise', () => {
    const headlines = BUILD_TOPIC_IDS.map((id) => {
      expect(BUILD_STUDIO_HEADLINES, `missing headline for ${id}`).toHaveProperty(id);
      return getBuildStudioHeadline(BUILD_TOPICS_FLAT[id]);
    });

    expect(headlines).toHaveLength(BUILD_TOPIC_IDS.length);
    expect(new Set(headlines).size).toBe(BUILD_TOPIC_IDS.length);
  });

  it('uses topic-specific copy instead of the old Engineering Practice fallback', () => {
    expect(getBuildStudioHeadline(BUILD_TOPICS_FLAT['unit-vs-integration']))
      .toBe('Prove the piece. Then prove the pieces still work together.');
    expect(getBuildStudioHeadline(BUILD_TOPICS_FLAT.tdd))
      .toBe('Write the proof before the code.');
    expect(getBuildStudioHeadline(BUILD_TOPICS_FLAT.ci))
      .toBe('Make every change pass the same gate.');
  });
});
