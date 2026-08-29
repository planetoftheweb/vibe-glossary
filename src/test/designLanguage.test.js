import { describe, it, expect } from 'vitest';
import { DESIGN_LANGUAGE_CLUSTER } from '../data/designLanguage';
import { BUILD_PATHS } from '../data/buildPaths';
import {
  BUILD_LITERACY_CLUSTERS,
  getBuildTopic,
} from '../data/buildLiteracy';

const topics = DESIGN_LANGUAGE_CLUSTER.topics;

describe('DESIGN_LANGUAGE_CLUSTER', () => {
  it('has a non-empty id and title', () => {
    expect(DESIGN_LANGUAGE_CLUSTER.id).toBe('design-language');
    expect(DESIGN_LANGUAGE_CLUSTER.title.length).toBeGreaterThan(0);
  });

  it('has at least 23 topics (18 prior + 5 motion)', () => {
    expect(topics.length).toBeGreaterThanOrEqual(23);
  });

  it('has unique topic ids', () => {
    const ids = topics.map(t => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('Design Language topic shape', () => {
  describe.each(topics.map(t => [t.id, t]))('%s', (_id, topic) => {
    it('has all required fields', () => {
      expect(typeof topic.id).toBe('string');
      expect(typeof topic.title).toBe('string');
      expect(typeof topic.summary).toBe('string');
      expect(typeof topic.details).toBe('string');
      expect(typeof topic.comparison).toBe('string');
      expect(typeof topic.vibeTip).toBe('string');
      expect(typeof topic.mnemonic).toBe('string');
      expect(topic.talkToAi).toBeDefined();
      expect(typeof topic.talkToAi.starter).toBe('string');
      expect(typeof topic.talkToAi.example).toBe('string');
      expect(Array.isArray(topic.relatedGlossaryIds)).toBe(true);
    });

    it('has non-empty required strings', () => {
      expect(topic.title.trim().length).toBeGreaterThan(0);
      expect(topic.summary.trim().length).toBeGreaterThan(0);
      expect(topic.details.trim().length).toBeGreaterThan(0);
      expect(topic.comparison.trim().length).toBeGreaterThan(0);
      expect(topic.vibeTip.trim().length).toBeGreaterThan(0);
      expect(topic.mnemonic.trim().length).toBeGreaterThan(0);
      expect(topic.talkToAi.starter.trim().length).toBeGreaterThan(0);
      expect(topic.talkToAi.example.trim().length).toBeGreaterThan(0);
    });

    it('contains no em dashes in student-facing copy', () => {
      const fields = [topic.summary, topic.details, topic.comparison, topic.vibeTip, topic.mnemonic, topic.talkToAi.starter, topic.talkToAi.example];
      for (const f of fields) {
        expect(f).not.toContain('\u2014');
        expect(f).not.toContain('\u2013');
      }
    });
  });
});

describe('New topics exist', () => {
  const newTopicIds = ['contrast-wcag', 'readable-type', 'design-contract', 'one-primary-cta', 'brand-constraints', 'motion-tokens', 'particle-field', 'scroll-linked-motion', 'reduced-motion', 'infinite-vs-pages'];

  it.each(newTopicIds)('%s is present in the cluster', (id) => {
    expect(topics.find(t => t.id === id)).toBeDefined();
  });

  it.each(newTopicIds)('%s is resolvable via getBuildTopic', (id) => {
    expect(getBuildTopic(id)).not.toBeNull();
    expect(getBuildTopic(id).clusterId).toBe('design-language');
  });
});

describe('design-language path quiz', () => {
  const path = BUILD_PATHS.find(p => p.id === 'design-language');

  it('exists', () => {
    expect(path).toBeDefined();
  });

  it('has 5 quiz questions', () => {
    expect(path.quiz).toHaveLength(5);
  });

  it('every answerId resolves to a known build topic', () => {
    for (const q of path.quiz) {
      expect(getBuildTopic(q.answerId)).not.toBeNull();
    }
  });

  it('every optionId resolves to a known build topic', () => {
    for (const q of path.quiz) {
      for (const optId of q.optionIds) {
        expect(getBuildTopic(optId)).not.toBeNull();
      }
    }
  });
});

describe('vibe-prompting class path', () => {
  const path = BUILD_PATHS.find(p => p.id === 'vibe-prompting');

  it('exists', () => {
    expect(path).toBeDefined();
  });

  it('has isCrossCluster set to true', () => {
    expect(path.isCrossCluster).toBe(true);
  });

  it('has items spanning multiple clusters', () => {
    const clusterIds = new Set(
      path.items.map(id => getBuildTopic(id)?.clusterId).filter(Boolean)
    );
    expect(clusterIds.size).toBeGreaterThanOrEqual(2);
  });

  it('every item resolves to a known build topic', () => {
    for (const id of path.items) {
      expect(getBuildTopic(id)).not.toBeNull();
    }
  });

  it('has 5 quiz questions', () => {
    expect(path.quiz).toHaveLength(5);
  });

  it('every quiz answerId resolves to a known build topic', () => {
    for (const q of path.quiz) {
      expect(getBuildTopic(q.answerId)).not.toBeNull();
    }
  });

  it('every quiz optionId resolves to a known build topic', () => {
    for (const q of path.quiz) {
      for (const optId of q.optionIds) {
        expect(getBuildTopic(optId)).not.toBeNull();
      }
    }
  });
});
