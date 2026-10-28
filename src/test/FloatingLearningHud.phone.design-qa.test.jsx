import { act, render, screen } from '@testing-library/react';
import FloatingLearningHud, { LEARNING_HUD_STORAGE_KEY } from '../components/learn/FloatingLearningHud';

const props = () => ({
  previous: { id: 'modal', title: 'Modal / Dialog' },
  next: { id: 'hover-card', title: 'Hover Card' },
  currentPosition: 8,
  total: 111,
  onPrevious: vi.fn(),
  onNext: vi.fn(),
  itemLabel: 'component',
  ariaLabel: 'Glossary progression',
  progress: { visited: 8, copied: 3, mastered: 2, total: 111, percent: 7, masteredPercent: 2 },
  progressSections: [],
  visited: new Set(['modal']),
  score: { total: 33, level: 'Lurker' },
  level: { name: 'Lurker' },
  learningProgress: { count: 1, total: 5, checkpointReady: false },
});

function mockPhone(matches) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: String(query).includes('max-width: 767.98px') && matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }));
}

describe('Learning HUD default on phones (#130)', () => {
  beforeEach(() => localStorage.removeItem(LEARNING_HUD_STORAGE_KEY));
  afterEach(() => { delete window.matchMedia; });

  it('starts minimized on a phone with no saved preference, and does not save that default', () => {
    mockPhone(true);
    render(<FloatingLearningHud {...props()} />);
    expect(screen.getByLabelText('Learning HUD')).toHaveAttribute('data-mode', 'minimized');
    expect(localStorage.getItem(LEARNING_HUD_STORAGE_KEY)).toBeNull();
  });

  it('keeps the expanded default on wider screens', () => {
    mockPhone(false);
    render(<FloatingLearningHud {...props()} />);
    expect(screen.getByLabelText('Learning HUD')).toHaveAttribute('data-mode', 'expanded');
  });

  it('keeps the expanded default when matchMedia is unavailable', () => {
    delete window.matchMedia;
    render(<FloatingLearningHud {...props()} />);
    expect(screen.getByLabelText('Learning HUD')).toHaveAttribute('data-mode', 'expanded');
  });

  it('restores a saved preference even on a phone', () => {
    mockPhone(true);
    localStorage.setItem(LEARNING_HUD_STORAGE_KEY, JSON.stringify({ mode: 'expanded', dock: 'bottom', x: 24, y: 112 }));
    render(<FloatingLearningHud {...props()} />);
    expect(screen.getByLabelText('Learning HUD')).toHaveAttribute('data-mode', 'expanded');
  });
});

describe('Learning HUD scroll clearance (#130)', () => {
  const realRO = globalThis.ResizeObserver;
  const realRect = Element.prototype.getBoundingClientRect;
  let height = 0;
  let notify = null;

  beforeEach(() => {
    localStorage.removeItem(LEARNING_HUD_STORAGE_KEY);
    height = 140;
    globalThis.ResizeObserver = class {
      constructor(cb) { notify = cb; }
      observe() {}
      disconnect() { notify = null; }
    };
    Element.prototype.getBoundingClientRect = function rect() {
      if (this.getAttribute?.('aria-label') === 'Learning HUD') return { width: 300, height, top: 0, left: 0, right: 300, bottom: height };
      return realRect.call(this);
    };
  });
  afterEach(() => {
    globalThis.ResizeObserver = realRO;
    Element.prototype.getBoundingClientRect = realRect;
    document.documentElement.style.removeProperty('--vg-hud-clearance');
  });

  it('sits above a footer of any height and only adds the HUD and a gap to the pane clearance', () => {
    const footer = document.createElement('footer');
    document.body.appendChild(footer);
    const rectBefore = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = function rect() {
      if (this === footer) return { width: 320, height: 113, top: 587, left: 0, right: 320, bottom: 700 };
      return rectBefore.call(this);
    };
    const { unmount } = render(<FloatingLearningHud {...props()} />);
    const root = document.documentElement.style;
    expect(root.getPropertyValue('--vg-hud-offset')).toContain('125px');
    expect(root.getPropertyValue('--vg-hud-clearance')).toContain('140px + 12px');
    unmount();
    expect(root.getPropertyValue('--vg-hud-offset')).toBe('');
    footer.remove();
  });

  it('publishes the measured height plus the bottom offset, follows height changes, and clears on unmount', () => {
    const { unmount } = render(<FloatingLearningHud {...props()} />);
    const read = () => document.documentElement.style.getPropertyValue('--vg-hud-clearance');
    expect(read()).toContain('140px');
    expect(read()).toContain('4.75rem');
    height = 56;
    act(() => notify());
    expect(read()).toContain('56px');
    unmount();
    expect(read()).toBe('');
  });
});
