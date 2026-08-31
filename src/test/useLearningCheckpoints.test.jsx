import { act, renderHook } from '@testing-library/react';
import useLearningCheckpoints, { ITEMS_PER_CHECKPOINT } from '../hooks/useLearningCheckpoints';

const glossaryProps = (id, overrides = {}) => ({
  enabled: true,
  section: 'glossary',
  activeGlossaryId: id,
  activeBuildId: 'mvp',
  ...overrides,
});

describe('useLearningCheckpoints', () => {
  it('opens a checkpoint after five distinct glossary items', () => {
    const { result, rerender } = renderHook(
      (props) => useLearningCheckpoints(props),
      { initialProps: glossaryProps('modal') }
    );

    expect(result.current.size).toBe(ITEMS_PER_CHECKPOINT);
    expect(result.current.current.seen).toEqual(['modal']);

    rerender(glossaryProps('drawer'));
    rerender(glossaryProps('popover'));
    rerender(glossaryProps('tooltip'));
    rerender(glossaryProps('toast'));

    expect(result.current.current.seen).toEqual([]);
    expect(result.current.current.checkpoint).toEqual([
      'modal',
      'drawer',
      'popover',
      'tooltip',
      'toast',
    ]);
  });

  it('does not count a repeated item twice', () => {
    const { result, rerender } = renderHook(
      (props) => useLearningCheckpoints(props),
      { initialProps: glossaryProps('modal') }
    );

    rerender(glossaryProps('drawer'));
    rerender(glossaryProps('modal'));

    expect(result.current.current.seen).toEqual(['modal', 'drawer']);
    expect(result.current.current.checkpoint).toBeNull();
  });

  it('keeps glossary and build progress in separate batches', () => {
    const { result, rerender } = renderHook(
      (props) => useLearningCheckpoints(props),
      { initialProps: glossaryProps('modal') }
    );

    rerender(glossaryProps('modal', { section: 'build', activeBuildId: 'mvp' }));
    rerender(glossaryProps('modal', { section: 'build', activeBuildId: 'prototype' }));

    expect(result.current.sections.glossary.seen).toEqual(['modal']);
    expect(result.current.sections.build.seen).toEqual(['mvp', 'prototype']);
  });

  it('starts a fresh batch only after the completed checkpoint is dismissed', () => {
    const ids = ['modal', 'drawer', 'popover', 'tooltip', 'toast'];
    const { result, rerender } = renderHook(
      (props) => useLearningCheckpoints(props),
      { initialProps: glossaryProps(ids[0]) }
    );

    ids.slice(1).forEach((id) => rerender(glossaryProps(id)));

    act(() => result.current.completeCheckpoint('glossary'));
    expect(result.current.current).toEqual({ seen: [], checkpoint: null, completed: 1 });

    rerender(glossaryProps('alert'));
    expect(result.current.current.seen).toEqual(['alert']);
  });

  it('dismisses a skipped checkpoint without counting it as completed', () => {
    const ids = ['modal', 'drawer', 'popover', 'tooltip', 'toast'];
    const { result, rerender } = renderHook(
      (props) => useLearningCheckpoints(props),
      { initialProps: glossaryProps(ids[0]) }
    );

    ids.slice(1).forEach((id) => rerender(glossaryProps(id)));
    act(() => result.current.skipCheckpoint('glossary'));

    expect(result.current.current).toEqual({ seen: [], checkpoint: null, completed: 0 });
    rerender(glossaryProps('alert'));
    expect(result.current.current.seen).toEqual(['alert']);
  });

  it('does not track items while Learning Mode is off', () => {
    const { result, rerender } = renderHook(
      (props) => useLearningCheckpoints(props),
      { initialProps: glossaryProps('modal', { enabled: false }) }
    );

    expect(result.current.current.seen).toEqual([]);
    rerender(glossaryProps('modal'));
    expect(result.current.current.seen).toEqual(['modal']);
  });
});
