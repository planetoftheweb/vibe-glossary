import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import TopNav, {
  SCORE_STORAGE_PROMPT_AFTER_VIEWS,
  SCORE_STORAGE_PROMPT_SNOOZE_KEY,
} from '../components/layout/TopNav';
import { CATEGORIES, CATEGORY_COLORS } from '../data/categories';

const makeExplore = () => ({
  progress: { visited: 2, copied: 1, total: 99, percent: 2, mastered: 0, masteredPercent: 0 },
  buildProgress: { visited: 1, copied: 0, total: 40, percent: 2, mastered: 0, masteredPercent: 0 },
  visited: new Set(['modal']),
  copied: new Set(),
  mastered: new Set(),
  badges: new Set(),
  resetProgress: vi.fn(),
  score: { total: 12 },
  level: { name: 'Lurker' },
});

const defaultProps = () => ({
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
  explore: makeExplore(),
  onOpenCheatSheet: vi.fn(),
  onOpenGlossaryIndex: vi.fn(),
  onOpenBuildIndex: vi.fn(),
  onOpenScoreBreakdown: vi.fn(),
  onStartTour: vi.fn(),
  authState: { user: null, authReady: true, busy: false, error: null, clearError: vi.fn() },
});

beforeEach(() => {
  localStorage.removeItem(SCORE_STORAGE_PROMPT_SNOOZE_KEY);
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

describe('account appearance setting', () => {
  it('keeps Dark Mode out of the hamburger menu', async () => {
    const user = userEvent.setup();
    render(<TopNav {...defaultProps()} />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));

    expect(screen.queryByText('Dark Mode')).toBeNull();
  });

  it('shows Dark Mode for signed-out visitors and keeps the menu opaque', async () => {
    const user = userEvent.setup();
    const props = defaultProps();
    render(<TopNav {...props} darkMode={false} />);

    await user.click(screen.getByRole('button', { name: 'Sign in. Back up your progress (optional)' }));
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();

    const menu = screen.getByText('Dark Mode').closest('[class*="bg-white"]');
    expect(menu).toBeTruthy();
    expect(menu.className).not.toMatch(/opacity-0/);
    expect(menu.className).not.toMatch(/bg-white\/\d/);

    await user.click(screen.getByRole('button', { name: 'Dark Mode' }));
    expect(props.setDarkMode).toHaveBeenCalledWith(true);
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByText('Dark Mode')).toBeNull();
  });

  it('also shows Dark Mode for a signed-in user', async () => {
    const user = userEvent.setup();
    const props = defaultProps();
    props.authState = {
      ...props.authState,
      user: { displayName: 'Ray', email: 'ray@example.com' },
      signOut: vi.fn(),
    };
    render(<TopNav {...props} />);

    await user.click(screen.getByRole('button', { name: 'Account: Ray' }));

    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });

  it('closes the signed-out user menu on an outside click', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <button type="button">outside</button>
        <TopNav {...defaultProps()} />
      </div>
    );

    await user.click(screen.getByRole('button', { name: 'Sign in. Back up your progress (optional)' }));
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'outside' }));
    expect(screen.queryByText('Dark Mode')).toBeNull();
  });
});

describe('score storage prompt', () => {
  const usageIds = CATEGORIES.flatMap((category) => category.items.map((item) => item.id))
    .slice(0, SCORE_STORAGE_PROMPT_AFTER_VIEWS);

  it('asks after several signed-out topic views, then opens registration', async () => {
    const user = userEvent.setup();
    const props = defaultProps();
    const { rerender } = render(<TopNav {...props} activeItem={usageIds[0]} />);

    usageIds.slice(1, -1).forEach((activeItem) => {
      rerender(<TopNav {...props} activeItem={activeItem} />);
    });
    expect(screen.queryByRole('dialog', { name: /store your VibeScore/i })).toBeNull();

    rerender(<TopNav {...props} activeItem={usageIds.at(-1)} />);
    expect(await screen.findByRole('dialog', { name: /store your VibeScore/i }))
      .toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Store my score' }));

    expect(screen.queryByRole('dialog', { name: /store your VibeScore/i })).toBeNull();
    expect(await screen.findByRole('button', { name: 'Create account' })).toBeInTheDocument();
    expect(screen.getByText('Already have an account? Sign in')).toBeInTheDocument();
  });

  it('waits while a learning checkpoint is ready', async () => {
    const props = defaultProps();
    props.learningProgress = { count: 5, total: 5, checkpointReady: true };
    const { rerender } = render(<TopNav {...props} activeItem={usageIds[0]} />);

    usageIds.slice(1).forEach((activeItem) => {
      rerender(<TopNav {...props} activeItem={activeItem} />);
    });
    expect(screen.queryByRole('dialog', { name: /store your VibeScore/i })).toBeNull();

    rerender(
      <TopNav
        {...props}
        activeItem={usageIds.at(-1)}
        learningProgress={{ count: 0, total: 5, checkpointReady: false }}
      />
    );
    expect(await screen.findByRole('dialog', { name: /store your VibeScore/i }))
      .toBeInTheDocument();
  });

  it('does not ask a signed-in learner', () => {
    const props = defaultProps();
    props.authState = {
      ...props.authState,
      user: { displayName: 'Ray', email: 'ray@example.com' },
    };
    const { rerender } = render(<TopNav {...props} activeItem={usageIds[0]} />);

    usageIds.slice(1).forEach((activeItem) => {
      rerender(<TopNav {...props} activeItem={activeItem} />);
    });
    expect(screen.queryByRole('dialog', { name: /store your VibeScore/i })).toBeNull();
  });

  it('snoozes the prompt for thirty days after Not now', async () => {
    const user = userEvent.setup();
    const props = defaultProps();
    const first = render(<TopNav {...props} activeItem={usageIds[0]} />);
    usageIds.slice(1).forEach((activeItem) => {
      first.rerender(<TopNav {...props} activeItem={activeItem} />);
    });

    await user.click(await screen.findByRole('button', { name: 'Not now' }));
    expect(Number(localStorage.getItem(SCORE_STORAGE_PROMPT_SNOOZE_KEY)))
      .toBeGreaterThan(0);
    first.unmount();

    const second = render(<TopNav {...props} activeItem={usageIds[0]} />);
    usageIds.slice(1).forEach((activeItem) => {
      second.rerender(<TopNav {...props} activeItem={activeItem} />);
    });
    expect(screen.queryByRole('dialog', { name: /store your VibeScore/i })).toBeNull();
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
    expect(label.className).toMatch(/min-w-0/);
    expect(label.className).toMatch(/max-w-full/);
    expect(label.className).not.toMatch(/min-content/);
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

describe('top-nav utility icons', () => {
  it('uses an announcement icon for What\'s New and reserves sparkles for VibeScore', () => {
    render(<TopNav {...defaultProps()} />);

    const whatsNewIcon = screen
      .getByRole('button', { name: /What'?s new/i })
      .querySelector('svg');
    const vibeScoreIcon = screen
      .getByRole('button', { name: /VibeScore/i })
      .querySelector('svg');

    expect(whatsNewIcon).toHaveClass('lucide-megaphone');
    expect(whatsNewIcon).not.toHaveClass('lucide-sparkles');
    expect(vibeScoreIcon).toHaveClass('lucide-sparkles');
  });
});

describe('Learning menu', () => {
  it('only offers five-item Learning Mode, without paths or Surprise Me', async () => {
    const user = userEvent.setup();
    render(<TopNav {...defaultProps()} />);

    await user.click(screen.getByRole('button', { name: 'Learning' }));

    expect(screen.getByText('Quiz after every five items')).toBeInTheDocument();
    expect(screen.queryByText('Learning Paths')).toBeNull();
    expect(screen.queryByText('Surprise Me')).toBeNull();
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
    expect(label.className).toMatch(/min-w-0/);
    expect(label.className).toMatch(/max-w-full/);
    expect(label.className).not.toMatch(/min-content/);
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

describe('#47 topic pill does not share pixels with search', () => {
  it('keeps Easing a whole word and parks search in the shrink-wrapped right cluster', () => {
    render(<TopNav {...defaultProps()} activeItem="easing" activeCatColors={CATEGORY_COLORS.motion} />);

    const topicPill = screen.getByRole('button', { name: 'Easing' });
    expect(topicPill).toHaveTextContent('Easing');
    expect(topicPill.textContent).not.toMatch(/Easi(?!ng)/);
    const topicLabel = [...topicPill.querySelectorAll('span')].find((el) => el.textContent === 'Easing');
    expect(topicLabel.className).toMatch(/break-keep/);
    expect(topicLabel.className).toMatch(/min-w-0/);
    expect(topicLabel.className).not.toMatch(/min-content/);
    expect(topicLabel.className).not.toMatch(/\btruncate\b/);

    const left = screen.getByTestId('nav-left-cluster');
    expect(left.className).toMatch(/flex-wrap/);
    expect(left.className).toMatch(/min-w-0/);
    expect(left.className).toMatch(/overflow-visible/);
    expect(left.className).not.toMatch(/overflow-hidden/);
    expect(left.contains(topicPill)).toBe(true);

    const right = screen.getByTestId('nav-right-cluster');
    expect(right.className).toMatch(/shrink-0/);
    const search = screen.getByRole('button', { name: 'Search (⌘K)' });
    expect(right.contains(search)).toBe(true);
    expect(left.contains(search)).toBe(false);
  });
});
