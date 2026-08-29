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

describe('#33 header topic pill shows a real word', () => {
  it('renders Easing in full, wraps instead of truncating to E.., and stays at text-base', () => {
    render(<TopNav {...defaultProps()} activeItem="easing" activeCatColors={CATEGORY_COLORS.motion} />);

    const pill = screen.getByRole('button', { name: 'Easing' });
    expect(pill).toHaveTextContent('Easing');
    expect(pill.textContent).not.toMatch(/E\.\./);
    expect(pill.className).toMatch(/text-base/);
    expect(pill.className).toMatch(/md:text-lg/);
    expect(pill.className).not.toMatch(/text-\[10px\]/);
    expect(pill.className).not.toMatch(/text-\[8px\]/);

    const label = [...pill.querySelectorAll('span')].find((el) => el.textContent === 'Easing');
    expect(label).toBeTruthy();
    expect(label.className).not.toMatch(/\btruncate\b/);
    expect(label.className).toMatch(/break-keep/);
    expect(label.className).not.toMatch(/break-words/);
    expect(label.className).toMatch(/whitespace-normal/);
    expect(label.className).toMatch(/min-w-\[max\(5.5rem,min-content\)\]/);
    expect(label.className).toMatch(/hidden lg:inline-block/);
  });

  it('does not cover What\'s New / VibeScore: left cluster still shrinks, right cluster does not', () => {
    render(<TopNav {...defaultProps()} activeItem="easing" activeCatColors={CATEGORY_COLORS.motion} />);

    const left = screen.getByTestId('nav-left-cluster');
    expect(left.className).toMatch(/min-w-0/);
    expect(left.className).toMatch(/flex-1/);
    expect(left.className).not.toMatch(/overflow-hidden/);

    const right = screen.getByTestId('nav-right-cluster');
    expect(right.className).toMatch(/shrink-0/);
    expect(screen.getByRole('button', { name: /What'?s new/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /VibeScore/i })).toBeInTheDocument();
  });
});

describe('#42 header topic pill wraps on spaces, not mid-word', () => {
  const assertWrapAtSpaces = (label) => {
    expect(label).toBeTruthy();
    expect(label.className).toMatch(/whitespace-normal/);
    expect(label.className).toMatch(/break-keep/);
    expect(label.className).not.toMatch(/break-words/);
    expect(label.className).not.toMatch(/break-all/);
    expect(label.className).not.toMatch(/\btruncate\b/);
    expect(label.className).toMatch(/min-w-\[max\(5.5rem,min-content\)\]/);
  };

  it('keeps Overlays as a whole word and still wraps Modal / Dialog at the space', () => {
    render(<TopNav {...defaultProps()} activeItem="modal" />);

    const overlaysPill = screen.getByRole('button', { name: 'Overlays' });
    expect(overlaysPill).toHaveTextContent('Overlays');
    const overlaysLabel = [...overlaysPill.querySelectorAll('span')].find((el) => el.textContent === 'Overlays');
    assertWrapAtSpaces(overlaysLabel);

    const topicPill = screen.getByRole('button', { name: 'Modal / Dialog' });
    expect(topicPill).toHaveTextContent('Modal / Dialog');
    const topicLabel = [...topicPill.querySelectorAll('span')].find((el) => el.textContent === 'Modal / Dialog');
    assertWrapAtSpaces(topicLabel);
    expect(topicPill.className).toMatch(/text-base/);
    expect(topicPill.className).not.toMatch(/text-\[10px\]/);
    expect(topicPill.className).not.toMatch(/text-\[8px\]/);
  });

  it('keeps Celebration as a whole word on Confetti / Celebration', () => {
    render(<TopNav {...defaultProps()} activeItem="confetti" activeCatColors={CATEGORY_COLORS.motion} />);

    const topicPill = screen.getByRole('button', { name: 'Confetti / Celebration' });
    expect(topicPill).toHaveTextContent('Confetti / Celebration');
    expect(topicPill.textContent).toMatch(/Celebration/);
    expect(topicPill.textContent).not.toMatch(/Celebrat(?!ion)/);
    const topicLabel = [...topicPill.querySelectorAll('span')].find((el) => el.textContent === 'Confetti / Celebration');
    assertWrapAtSpaces(topicLabel);
    expect(topicPill.className).toMatch(/text-base/);
    expect(topicPill.className).toMatch(/md:text-lg/);
  });

  it('does not cover What\'s New / VibeScore when long labels wrap', () => {
    render(<TopNav {...defaultProps()} activeItem="confetti" activeCatColors={CATEGORY_COLORS.motion} />);

    const left = screen.getByTestId('nav-left-cluster');
    expect(left.className).toMatch(/min-w-0/);
    expect(left.className).toMatch(/flex-1/);
    expect(left.className).toMatch(/overflow-visible/);
    expect(left.className).not.toMatch(/overflow-hidden/);

    const right = screen.getByTestId('nav-right-cluster');
    expect(right.className).toMatch(/shrink-0/);
    expect(screen.getByRole('button', { name: /What'?s new/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /VibeScore/i })).toBeInTheDocument();
  });
});

describe('#43 wrapped header stays in flow above the panes', () => {
  it('keeps min-h-20 and does not pin or clip the header over the Try It pane', () => {
    const { container } = render(
      <TopNav {...defaultProps()} activeItem="confetti" activeCatColors={CATEGORY_COLORS.motion} />
    );

    const header = container.querySelector('header');
    expect(header).toBeTruthy();
    expect(header.className).toMatch(/shrink-0/);
    expect(header.className).toMatch(/\brelative\b/);
    expect(header.className).not.toMatch(/\bfixed\b/);
    expect(header.className).not.toMatch(/\babsolute\b/);
    expect(header.className).not.toMatch(/overflow-hidden/);

    const bar = header.querySelector('[class*="min-h-20"]');
    expect(bar).toBeTruthy();
    expect(bar.className).toMatch(/min-h-20/);
    expect(bar.className).not.toMatch(/(?:^|\s)h-20(?:\s|$)/);

    const topicLabel = [...container.querySelectorAll('span')].find((el) => el.textContent === 'Confetti / Celebration');
    expect(topicLabel.className).toMatch(/break-keep/);
    expect(topicLabel.className).not.toMatch(/break-words/);
  });
});
