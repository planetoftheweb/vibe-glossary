import { renderHook, act } from '@testing-library/react';
import useExploreMode from '../hooks/useExploreMode';
import { CATEGORIES } from '../data/categories';

const ALL_IDS = CATEGORIES.flatMap(cat => cat.items.map(i => i.id));
const TOTAL = ALL_IDS.length;

const STORAGE_KEY = 'vg-explored';
const COPIED_KEY = 'vg-copied';

beforeEach(() => {
  localStorage.clear();
});

// ---------------------------------------------------------------------------
// 1. componentOfTheDay
// ---------------------------------------------------------------------------
describe('componentOfTheDay', () => {
  it('returns a valid component ID from ALL_IDS', () => {
    const { result } = renderHook(() => useExploreMode());
    expect(ALL_IDS).toContain(result.current.componentOfTheDay);
  });

  it('is deterministic — same value on repeated renders the same day', () => {
    const { result: r1 } = renderHook(() => useExploreMode());
    const { result: r2 } = renderHook(() => useExploreMode());
    expect(r1.current.componentOfTheDay).toBe(r2.current.componentOfTheDay);
  });
});

// ---------------------------------------------------------------------------
// 2. loadSet — tested via initial hook state
// ---------------------------------------------------------------------------
describe('initial state (loadSet)', () => {
  it('starts with empty visited set when localStorage is clear', () => {
    const { result } = renderHook(() => useExploreMode());
    expect(result.current.visited.size).toBe(0);
  });

  it('starts with empty copied set when localStorage is clear', () => {
    const { result } = renderHook(() => useExploreMode());
    expect(result.current.copied.size).toBe(0);
  });

  it('rehydrates visited from localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(['modal', 'drawer']));
    const { result } = renderHook(() => useExploreMode());
    expect(result.current.visited.has('modal')).toBe(true);
    expect(result.current.visited.has('drawer')).toBe(true);
    expect(result.current.visited.size).toBe(2);
  });

  it('rehydrates copied from localStorage', () => {
    localStorage.setItem(COPIED_KEY, JSON.stringify(['tooltip']));
    const { result } = renderHook(() => useExploreMode());
    expect(result.current.copied.has('tooltip')).toBe(true);
    expect(result.current.copied.size).toBe(1);
  });

  it('returns empty visited Set when localStorage contains corrupt JSON', () => {
    localStorage.setItem(STORAGE_KEY, 'not-valid-json{{{');
    const { result } = renderHook(() => useExploreMode());
    expect(result.current.visited.size).toBe(0);
  });

  it('returns empty copied Set when localStorage contains corrupt JSON', () => {
    localStorage.setItem(COPIED_KEY, 'not-valid-json{{{');
    const { result } = renderHook(() => useExploreMode());
    expect(result.current.copied.size).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// 3. saveSet — verified via markVisited side-effects
// ---------------------------------------------------------------------------
describe('saveSet (via markVisited side-effects)', () => {
  it('writes updated visited list to localStorage after markVisited', () => {
    const { result } = renderHook(() => useExploreMode());
    act(() => { result.current.markVisited('modal'); });

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(stored).toContain('modal');
  });
});

// ---------------------------------------------------------------------------
// 4. markVisited
// ---------------------------------------------------------------------------
describe('markVisited', () => {
  it('adds the id to the visited set', () => {
    const { result } = renderHook(() => useExploreMode());
    act(() => { result.current.markVisited('modal'); });
    expect(result.current.visited.has('modal')).toBe(true);
  });

  it('is idempotent — calling twice does not duplicate the id', () => {
    const { result } = renderHook(() => useExploreMode());
    act(() => { result.current.markVisited('modal'); });
    act(() => { result.current.markVisited('modal'); });
    expect(result.current.visited.size).toBe(1);
  });

  it('persists visited id to localStorage', () => {
    const { result } = renderHook(() => useExploreMode());
    act(() => { result.current.markVisited('drawer'); });
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(stored).toContain('drawer');
  });

  it('accumulates multiple distinct ids', () => {
    const { result } = renderHook(() => useExploreMode());
    act(() => { result.current.markVisited('modal'); });
    act(() => { result.current.markVisited('popover'); });
    expect(result.current.visited.size).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// 5. markCopied
// ---------------------------------------------------------------------------
describe('markCopied', () => {
  it('adds the id to the copied set', () => {
    const { result } = renderHook(() => useExploreMode());
    act(() => { result.current.markCopied('tooltip'); });
    expect(result.current.copied.has('tooltip')).toBe(true);
  });

  it('is idempotent — calling twice does not duplicate the id', () => {
    const { result } = renderHook(() => useExploreMode());
    act(() => { result.current.markCopied('tooltip'); });
    act(() => { result.current.markCopied('tooltip'); });
    expect(result.current.copied.size).toBe(1);
  });

  it('persists copied id to localStorage', () => {
    const { result } = renderHook(() => useExploreMode());
    act(() => { result.current.markCopied('slider'); });
    const stored = JSON.parse(localStorage.getItem(COPIED_KEY));
    expect(stored).toContain('slider');
  });
});

// ---------------------------------------------------------------------------
// 6. surpriseMe
// ---------------------------------------------------------------------------
describe('surpriseMe', () => {
  it('returns a valid id from ALL_IDS', () => {
    const { result } = renderHook(() => useExploreMode());
    const id = result.current.surpriseMe();
    expect(ALL_IDS).toContain(id);
  });

  it('prefers unvisited ids when some remain unvisited', () => {
    const { result } = renderHook(() => useExploreMode());

    // Mark all IDs visited except the last one
    const allButLast = ALL_IDS.slice(0, -1);
    act(() => {
      allButLast.forEach(id => result.current.markVisited(id));
    });

    // With only one unvisited id left, surpriseMe must return it
    const lastId = ALL_IDS[ALL_IDS.length - 1];
    const picked = result.current.surpriseMe();
    expect(picked).toBe(lastId);
  });

  it('falls back to ALL_IDS when all ids have been visited', () => {
    const { result } = renderHook(() => useExploreMode());

    act(() => {
      ALL_IDS.forEach(id => result.current.markVisited(id));
    });

    // All visited — result must still be a valid id
    const picked = result.current.surpriseMe();
    expect(ALL_IDS).toContain(picked);
  });
});

// ---------------------------------------------------------------------------
// 7. progress
// ---------------------------------------------------------------------------
describe('progress', () => {
  it('starts with visited count of 0', () => {
    const { result } = renderHook(() => useExploreMode());
    expect(result.current.progress.visited).toBe(0);
  });

  it('starts with copied count of 0', () => {
    const { result } = renderHook(() => useExploreMode());
    expect(result.current.progress.copied).toBe(0);
  });

  it('total matches the number of ALL_IDS entries (99)', () => {
    const { result } = renderHook(() => useExploreMode());
    expect(result.current.progress.total).toBe(TOTAL);
    expect(result.current.progress.total).toBe(99);
  });

  it('updates visited count after markVisited', () => {
    const { result } = renderHook(() => useExploreMode());
    act(() => { result.current.markVisited('modal'); });
    expect(result.current.progress.visited).toBe(1);
  });

  it('updates copied count after markCopied', () => {
    const { result } = renderHook(() => useExploreMode());
    act(() => { result.current.markCopied('modal'); });
    expect(result.current.progress.copied).toBe(1);
  });

  it('percent is a rounded integer', () => {
    const { result } = renderHook(() => useExploreMode());
    expect(Number.isInteger(result.current.progress.percent)).toBe(true);
  });

  it('percent is 0 when nothing visited', () => {
    const { result } = renderHook(() => useExploreMode());
    expect(result.current.progress.percent).toBe(0);
  });

  it('percent is 100 when all ids visited', () => {
    const { result } = renderHook(() => useExploreMode());
    act(() => {
      ALL_IDS.forEach(id => result.current.markVisited(id));
    });
    expect(result.current.progress.percent).toBe(100);
  });

  it('percent rounds correctly for partial progress', () => {
    const { result } = renderHook(() => useExploreMode());
    // Mark one item visited; expected: Math.round(1/99*100) = 1
    act(() => { result.current.markVisited(ALL_IDS[0]); });
    expect(result.current.progress.percent).toBe(Math.round((1 / TOTAL) * 100));
  });
});

// ---------------------------------------------------------------------------
// 8. resetProgress
// ---------------------------------------------------------------------------
describe('resetProgress', () => {
  it('clears the visited set', () => {
    const { result } = renderHook(() => useExploreMode());
    act(() => { result.current.markVisited('modal'); });
    act(() => { result.current.resetProgress(); });
    expect(result.current.visited.size).toBe(0);
  });

  it('clears the copied set', () => {
    const { result } = renderHook(() => useExploreMode());
    act(() => { result.current.markCopied('tooltip'); });
    act(() => { result.current.resetProgress(); });
    expect(result.current.copied.size).toBe(0);
  });

  it('removes the visited localStorage key', () => {
    const { result } = renderHook(() => useExploreMode());
    act(() => { result.current.markVisited('modal'); });
    act(() => { result.current.resetProgress(); });
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('removes the copied localStorage key', () => {
    const { result } = renderHook(() => useExploreMode());
    act(() => { result.current.markCopied('tooltip'); });
    act(() => { result.current.resetProgress(); });
    expect(localStorage.getItem(COPIED_KEY)).toBeNull();
  });

  it('resets progress counts to zero', () => {
    const { result } = renderHook(() => useExploreMode());
    act(() => { result.current.markVisited('modal'); });
    act(() => { result.current.markCopied('drawer'); });
    act(() => { result.current.resetProgress(); });
    expect(result.current.progress.visited).toBe(0);
    expect(result.current.progress.copied).toBe(0);
    expect(result.current.progress.percent).toBe(0);
  });
});
