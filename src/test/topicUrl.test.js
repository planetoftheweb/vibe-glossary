import { describe, it, expect } from 'vitest';
import {
  parseTopicLocation,
  resolveTopicRef,
  topicHref,
  isProofLocation,
} from '../lib/topicUrl';

const loc = (partial) => ({
  pathname: '/',
  search: '',
  hash: '',
  ...partial,
});

describe('parseTopicLocation', () => {
  it('reads /glossary/:id and /build/:id', () => {
    expect(parseTopicLocation(loc({ pathname: '/glossary/modal' }))).toEqual({
      type: 'topic', section: 'glossary', id: 'modal',
    });
    expect(parseTopicLocation(loc({ pathname: '/build/particle-field' }))).toEqual({
      type: 'topic', section: 'build', id: 'particle-field',
    });
  });

  it('treats /components/:id as a glossary path', () => {
    expect(parseTopicLocation(loc({ pathname: '/components/drawer' }))).toEqual({
      type: 'topic', section: 'glossary', id: 'drawer',
    });
  });

  it('honors query strings people already try', () => {
    expect(parseTopicLocation(loc({ search: '?component=modal' }))).toEqual({
      type: 'topic', section: 'glossary', id: 'modal',
    });
    expect(parseTopicLocation(loc({ search: '?topic=particle-field' }))).toEqual({
      type: 'topic', section: 'build', id: 'particle-field',
    });
  });

  it('honors hash paths and a bare hash id', () => {
    expect(parseTopicLocation(loc({ hash: '#/build/particle-field' }))).toEqual({
      type: 'topic', section: 'build', id: 'particle-field',
    });
    expect(parseTopicLocation(loc({ hash: '#particle-field' }))).toEqual({
      type: 'topic', section: null, id: 'particle-field',
    });
  });

  it('leaves #proof= links alone', () => {
    const proof = loc({ hash: '#proof=abc' });
    expect(parseTopicLocation(proof)).toEqual({ type: 'proof' });
    expect(isProofLocation(proof)).toBe(true);
  });

  it('returns none for the home path', () => {
    expect(parseTopicLocation(loc({ pathname: '/' }))).toEqual({ type: 'none' });
  });
});

describe('resolveTopicRef', () => {
  it('opens a build topic even when the path said glossary', () => {
    expect(resolveTopicRef({ type: 'topic', section: 'glossary', id: 'particle-field' })).toEqual({
      section: 'build', id: 'particle-field',
    });
  });

  it('opens a glossary topic from a bare hash', () => {
    expect(resolveTopicRef({ type: 'topic', section: null, id: 'modal' })).toEqual({
      section: 'glossary', id: 'modal',
    });
  });

  it('returns null for an unknown id', () => {
    expect(resolveTopicRef({ type: 'topic', section: 'glossary', id: 'not-a-real-topic' })).toBeNull();
  });
});

describe('topicHref', () => {
  it('builds the canonical shareable path', () => {
    expect(topicHref('glossary', 'modal')).toBe('/glossary/modal');
    expect(topicHref('build', 'particle-field')).toBe('/build/particle-field');
  });
});

describe('unknown topic addresses (#114)', () => {
  it('flags a path or query that names a topic we do not have', async () => {
    const { unknownTopicFromParsed } = await import('../lib/topicUrl');
    expect(unknownTopicFromParsed(parseTopicLocation(loc({ pathname: '/glossary/nope' })))).toEqual({ section: 'glossary', id: 'nope' });
    expect(unknownTopicFromParsed(parseTopicLocation(loc({ pathname: '/build/nope' })))).toEqual({ section: 'build', id: 'nope' });
    expect(unknownTopicFromParsed(parseTopicLocation(loc({ search: '?topic=nope' })))).toEqual({ section: 'build', id: 'nope' });
  });

  it('does not flag real topics, the home path, proof links, or bare hash anchors', async () => {
    const { unknownTopicFromParsed } = await import('../lib/topicUrl');
    expect(unknownTopicFromParsed(parseTopicLocation(loc({ pathname: '/glossary/modal' })))).toBeNull();
    expect(unknownTopicFromParsed(parseTopicLocation(loc({ pathname: '/' })))).toBeNull();
    expect(unknownTopicFromParsed(parseTopicLocation(loc({ hash: '#proof=abc' })))).toBeNull();
    expect(unknownTopicFromParsed(parseTopicLocation(loc({ hash: '#main' })))).toBeNull();
  });
});
