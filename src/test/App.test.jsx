import { render, screen, act } from '@testing-library/react';
import App from '../App';

// ─── Mock heavy child components ────────────────────────────────────────────
vi.mock('../components/layout/TopNav', () => ({
  default: () => <div data-testid="top-nav" />,
}));

vi.mock('../components/layout/Footer', () => ({
  default: () => <div data-testid="footer" />,
}));

vi.mock('../components/WelcomeScreen', () => ({
  default: ({ onClose, onEnter, onSelectCategory }) => (
    <div data-testid="welcome-screen">
      <button onClick={onEnter ?? onClose}>Close</button>
    </div>
  ),
}));

vi.mock('../components/ui/ExploreBar', () => ({
  default: () => <div data-testid="explore-bar" />,
}));

vi.mock('../components/ui/PromptBuilder', () => ({
  default: () => <div data-testid="prompt-builder" />,
}));

vi.mock('../components/layout/Sidebar', () => ({
  default: () => <div data-testid="sidebar" />,
}));

// ─── Mock glossary data ──────────────────────────────────────────────────────
vi.mock('../data/glossary', () => ({
  GLOSSARY_DATA: {
    modal: {
      title: 'Modal',
      definition: 'A dialog',
      vibeTip: 'tip',
      comparison: 'comp',
      prompt: {
        base: 'Add modal',
        options: [],
        requirements: [],
        scaffolds: { shadcn: 'code' },
      },
      demo: () => <div>Modal Demo</div>,
    },
  },
}));

// ─── Mock categories ─────────────────────────────────────────────────────────
vi.mock('../data/categories', () => ({
  CATEGORIES: [
    {
      id: 'overlays',
      name: 'Overlays',
      type: 'Components',
      icon: null,
      items: [{ id: 'modal', name: 'Modal / Dialog' }],
    },
  ],
  CATEGORY_COLORS: {
    overlays: {
      text: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/30',
      active: 'bg-violet-600 text-white',
      hover: 'hover:bg-violet-500/10',
      dot: 'bg-violet-500',
      accent: 'text-violet-500',
      gradient: 'from-violet-600 to-purple-700',
    },
  },
}));

// ─── Shared clamp helper (mirrors the formula in handleResizeStart) ───────────
const clampPanelWidth = (x, width) =>
  Math.min(60, Math.max(25, (x / width) * 100));

// ─── Cleanup before each test ─────────────────────────────────────────────────
beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
});

// ─────────────────────────────────────────────────────────────────────────────
// 1. Panel resize clamp formula (pure math — no rendering needed)
// ─────────────────────────────────────────────────────────────────────────────
describe('clampPanelWidth formula', () => {
  it('clamps to min (25) when x=0, width=1000', () => {
    expect(clampPanelWidth(0, 1000)).toBe(25);
  });

  it('returns 40 when x=400, width=1000', () => {
    expect(clampPanelWidth(400, 1000)).toBe(40);
  });

  it('clamps to max (60) when x=700, width=1000', () => {
    expect(clampPanelWidth(700, 1000)).toBe(60);
  });

  it('returns 50 when x=500, width=1000', () => {
    expect(clampPanelWidth(500, 1000)).toBe(50);
  });

  it('returns exactly 25 when x=250, width=1000', () => {
    expect(clampPanelWidth(250, 1000)).toBe(25);
  });

  it('returns exactly 60 when x=600, width=1000', () => {
    expect(clampPanelWidth(600, 1000)).toBe(60);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. Dark mode — document.documentElement gets "dark" class on mount
// ─────────────────────────────────────────────────────────────────────────────
describe('dark mode', () => {
  it('adds "dark" class to documentElement after render', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. Welcome screen visibility based on localStorage
// ─────────────────────────────────────────────────────────────────────────────
describe('WelcomeScreen visibility', () => {
  it('shows WelcomeScreen when localStorage has no vg-visited key', async () => {
    // localStorage is already cleared in beforeEach
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByTestId('welcome-screen')).toBeInTheDocument();
  });

  it('hides WelcomeScreen when localStorage has vg-visited set', async () => {
    localStorage.setItem('vg-visited', '1');
    await act(async () => {
      render(<App />);
    });
    expect(screen.queryByTestId('welcome-screen')).toBeNull();
  });

  it('shows main glossary UI (top-nav) when vg-visited is set', async () => {
    localStorage.setItem('vg-visited', '1');
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByTestId('top-nav')).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. Smoke test — App renders without throwing
// ─────────────────────────────────────────────────────────────────────────────
describe('App smoke test', () => {
  it('renders without throwing', async () => {
    await expect(
      act(async () => {
        render(<App />);
      })
    ).resolves.not.toThrow();
  });
});
