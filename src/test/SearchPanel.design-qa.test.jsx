import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import TopNav from '../components/layout/TopNav';
import { CATEGORIES, CATEGORY_COLORS } from '../data/categories';

const props = () => ({
  darkMode: true,
  setDarkMode: vi.fn(),
  learnMode: false,
  toggleLearnMode: vi.fn(),
  learningProgress: { count: 0, total: 5, checkpointReady: false },
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
  explore: {
    progress: { visited: 0, copied: 0, total: 99, percent: 0, mastered: 0, masteredPercent: 0 },
    buildProgress: { visited: 0, copied: 0, total: 40, percent: 0, mastered: 0, masteredPercent: 0 },
    visited: new Set(), copied: new Set(), mastered: new Set(), badges: new Set(),
    resetProgress: vi.fn(), score: { total: 0 }, level: { name: 'Lurker' },
  },
  onOpenCheatSheet: vi.fn(),
  onOpenGlossaryIndex: vi.fn(),
  onOpenBuildIndex: vi.fn(),
  onOpenScoreBreakdown: vi.fn(),
  onStartTour: vi.fn(),
  authState: { user: null, authReady: true, busy: false, error: null, clearError: vi.fn() },
});

async function openSearch(user) {
  await user.click(screen.getByRole('button', { name: 'Search (⌘K)' }));
}

describe('search panel design QA (#106 to #111, #118)', () => {
  it('#118 and #107: both inputs are named and both close buttons have a name', async () => {
    const user = userEvent.setup();
    render(<TopNav {...props()} />);
    await openSearch(user);
    const inputs = screen.getAllByLabelText('Search components and build topics');
    expect(inputs).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Close search' })).toHaveLength(2);
  });

  it('#106: close buttons keep a 44px hit box', async () => {
    const user = userEvent.setup();
    render(<TopNav {...props()} />);
    await openSearch(user);
    screen.getAllByRole('button', { name: 'Close search' }).forEach((button) => {
      expect(button.className).toMatch(/min-w-\[44px\]/);
      expect(button.className).toMatch(/min-h-\[44px\]/);
    });
  });

  it('#108: the close button has an in-app tip and no native title', async () => {
    const user = userEvent.setup();
    render(<TopNav {...props()} />);
    await openSearch(user);
    const [button] = screen.getAllByRole('button', { name: 'Close search' });
    expect(button).not.toHaveAttribute('title');
    expect(button.className).toMatch(/\bgroup\b/);
    expect(button.querySelector('[role="tooltip"]')).toHaveTextContent('Close search');
  });

  it('#109: the empty state names the query and Clear search keeps search open', async () => {
    const user = userEvent.setup();
    render(<TopNav {...props()} />);
    await openSearch(user);
    const [input] = screen.getAllByLabelText('Search components and build topics');
    await user.type(input, 'zzqx');
    expect(screen.getAllByText('No matches for "zzqx"').length).toBeGreaterThan(0);
    await user.click(screen.getAllByRole('button', { name: 'Clear search' })[0]);
    expect(input).toHaveValue('');
    expect(screen.queryByText('No matches for "zzqx"')).toBeNull();
    expect(screen.getAllByLabelText('Search components and build topics').length).toBe(2);
  });

  it('#110: the mobile search overlay sits above the breadcrumb row', async () => {
    const user = userEvent.setup();
    render(<TopNav {...props()} />);
    await openSearch(user);
    const overlay = document.querySelectorAll('[data-search-root]');
    const mobile = [...overlay].find((el) => /md:hidden/.test(el.className) && el.querySelector('input'));
    expect(mobile.className).toMatch(/\brelative\b/);
    expect(mobile.className).toMatch(/\bz-30\b/);
  });

  it('#111: an outside click closes search like Esc, an inside click does not', async () => {
    const user = userEvent.setup();
    render(<TopNav {...props()} />);
    await openSearch(user);
    const [input] = screen.getAllByLabelText('Search components and build topics');
    await user.type(input, 'zzqx');
    fireEvent.mouseDown(input);
    expect(screen.getAllByLabelText('Search components and build topics').length).toBe(2);
    fireEvent.mouseDown(document.body);
    expect(screen.queryByLabelText('Search components and build topics')).toBeNull();
  });
});
