import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import TopNav from '../components/layout/TopNav';
import { CATEGORIES, CATEGORY_COLORS } from '../data/categories';

const makeExplore = () => ({
  progress: { visited: 2, copied: 1, total: 99, percent: 2, mastered: 0, masteredPercent: 0 },
  buildProgress: { visited: 1, copied: 0, total: 40, percent: 2, mastered: 0, masteredPercent: 0 },
  visited: new Set(['modal']),
  copied: new Set(),
  mastered: new Set(),
  badges: new Set(),
  surpriseMe: vi.fn().mockReturnValue('tooltip'),
  surpriseMeBuild: vi.fn().mockReturnValue('mvp'),
  resetProgress: vi.fn(),
  score: { total: 12 },
  level: { name: 'Lurker' },
});

const defaultProps = () => ({
  darkMode: true,
  setDarkMode: vi.fn(),
  learnMode: false,
  toggleLearnMode: vi.fn(),
  activeItem: 'tooltip',
  setActiveItem: vi.fn(),
  activeBuildTopic: 'mvp',
  setActiveBuildTopic: vi.fn(),
  categories: CATEGORIES,
  activeCatColors: CATEGORY_COLORS.overlays,
  siteSection: 'glossary',
  setSiteSection: vi.fn(),
  onGetStarted: vi.fn(),
  searchInputRef: createRef(),
  explore: makeExplore(),
  onOpenCheatSheet: vi.fn(),
  onOpenGlossaryIndex: vi.fn(),
  onOpenPaths: vi.fn(),
  onOpenBuildIndex: vi.fn(),
  onOpenBuildPaths: vi.fn(),
  onOpenScoreBreakdown: vi.fn(),
  onStartTour: vi.fn(),
  authState: { user: null, authReady: true, busy: false, error: null, clearError: vi.fn() },
});

describe('category dropdown panel', () => {
  it('renders the category list when the Overlays pill is opened', async () => {
    const user = userEvent.setup();
    render(<TopNav {...defaultProps()} />);

    expect(screen.queryByRole('button', { name: /Inputs/ })).toBeNull();

    await user.click(screen.getByRole('button', { name: 'Overlays' }));

    expect(screen.getByRole('button', { name: /Inputs/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Data Display/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Navigation/ })).toBeInTheDocument();
  });

  it('does not clip the open panel: left cluster stays overflow-visible and still shrinks', async () => {
    const user = userEvent.setup();
    render(<TopNav {...defaultProps()} />);

    const cluster = screen.getByTestId('nav-left-cluster');
    expect(cluster.className).toMatch(/min-w-0/);
    expect(cluster.className).toMatch(/flex-1/);
    expect(cluster.className).toMatch(/overflow-visible/);
    expect(cluster.className).not.toMatch(/overflow-hidden/);

    await user.click(screen.getByRole('button', { name: 'Overlays' }));

    const inputs = screen.getByRole('button', { name: /Inputs/ });
    expect(inputs).toBeInTheDocument();
    expect(cluster.contains(inputs)).toBe(true);
  });
});

describe('settings menu (#14)', () => {
  it('closes on Escape and stays opaque in light mode', async () => {
    const user = userEvent.setup();
    render(<TopNav {...defaultProps()} darkMode={false} />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();

    const menu = screen.getByText('Dark Mode').closest('[class*="bg-white"]');
    expect(menu).toBeTruthy();
    expect(menu.className).not.toMatch(/opacity-0/);
    expect(menu.className).not.toMatch(/bg-white\/\d/);

    await user.keyboard('{Escape}');
    expect(screen.queryByText('Dark Mode')).toBeNull();
  });

  it('closes on outside click', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <button type="button">outside</button>
        <TopNav {...defaultProps()} />
      </div>
    );

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'outside' }));
    expect(screen.queryByText('Dark Mode')).toBeNull();
  });
});
