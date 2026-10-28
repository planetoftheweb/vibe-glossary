import { render, screen } from '@testing-library/react';
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
