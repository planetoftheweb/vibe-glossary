import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExploreBar from '../components/ui/ExploreBar';
import { CATEGORIES } from '../data/categories';
import { GLOSSARY_DATA } from '../data/glossary';

// ---------------------------------------------------------------------------
// Shared mock data
// ---------------------------------------------------------------------------
const mockActiveCatColors = {
  text: 'text-violet-400',
  bg: 'bg-violet-500/10',
  border: 'border-violet-500/30',
  active: 'bg-violet-600 text-white',
  hover: 'hover:bg-violet-500/10',
  dot: 'bg-violet-500',
  accent: 'text-violet-500',
  gradient: 'from-violet-600 to-purple-700',
};

const makeExplore = (overrides = {}) => ({
  componentOfTheDay: 'modal',
  progress: { visited: 2, copied: 1, total: 49, percent: 4 },
  visited: new Set(['modal', 'drawer']),
  copied: new Set(['modal']),
  surpriseMe: vi.fn().mockReturnValue('tabs'),
  resetProgress: vi.fn(),
  ...overrides,
});

const defaultProps = (exploreOverrides = {}) => ({
  explore: makeExplore(exploreOverrides),
  activeItem: null,
  onSelectItem: vi.fn(),
  activeCatColors: mockActiveCatColors,
});

// ---------------------------------------------------------------------------
// 1. findCategory logic — tested via rendered component
// ---------------------------------------------------------------------------
describe('findCategory (via rendered component)', () => {
  it('renders without error when componentOfTheDay is "modal" (modal is in overlays)', () => {
    const props = defaultProps({ componentOfTheDay: 'modal' });
    expect(() => render(<ExploreBar {...props} />)).not.toThrow();
  });

  it('renders the glossary entry title for componentOfTheDay in the "Today:" button', () => {
    const props = defaultProps({ componentOfTheDay: 'modal' });
    render(<ExploreBar {...props} />);
    const expectedTitle = GLOSSARY_DATA['modal'].title;
    expect(screen.getByText(expectedTitle)).toBeInTheDocument();
  });

  it('renders a different component title correctly (tabs)', () => {
    const props = defaultProps({ componentOfTheDay: 'tabs' });
    render(<ExploreBar {...props} />);
    const expectedTitle = GLOSSARY_DATA['tabs'].title;
    expect(screen.getByText(expectedTitle)).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// 2. Progress display
// ---------------------------------------------------------------------------
describe('progress display', () => {
  it('renders "{visited}/{total} explored" text', () => {
    const props = defaultProps();
    render(<ExploreBar {...props} />);
    expect(screen.getByText('2/49 explored')).toBeInTheDocument();
  });

  it('reflects custom visited/total values', () => {
    const props = defaultProps({
      progress: { visited: 10, copied: 3, total: 49, percent: 20 },
    });
    render(<ExploreBar {...props} />);
    expect(screen.getByText('10/49 explored')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// 3. Prompts copied count
// ---------------------------------------------------------------------------
describe('prompts copied count', () => {
  it('displays the copied count in the "prompts copied" line', () => {
    const props = defaultProps();
    render(<ExploreBar {...props} />);
    expect(screen.getByText('1 prompts copied')).toBeInTheDocument();
  });

  it('reflects a different copied count', () => {
    const props = defaultProps({
      progress: { visited: 2, copied: 5, total: 49, percent: 4 },
    });
    render(<ExploreBar {...props} />);
    expect(screen.getByText('5 prompts copied')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// 4. "Surprise Me" button
// ---------------------------------------------------------------------------
describe('"Surprise Me" button', () => {
  it('calls surpriseMe() when clicked', async () => {
    const user = userEvent.setup();
    const props = defaultProps();
    render(<ExploreBar {...props} />);

    await user.click(screen.getByRole('button', { name: /surprise me/i }));

    expect(props.explore.surpriseMe).toHaveBeenCalledTimes(1);
  });

  it('calls onSelectItem with the id returned by surpriseMe()', async () => {
    const user = userEvent.setup();
    const props = defaultProps();
    render(<ExploreBar {...props} />);

    await user.click(screen.getByRole('button', { name: /surprise me/i }));

    expect(props.onSelectItem).toHaveBeenCalledWith('tabs');
  });
});

// ---------------------------------------------------------------------------
// 5. Trophy/expand button toggles the expanded panel
// ---------------------------------------------------------------------------
describe('expand/collapse progress panel', () => {
  it('does not show the expanded panel initially', () => {
    const props = defaultProps();
    render(<ExploreBar {...props} />);
    expect(screen.queryByText('Your Progress')).not.toBeInTheDocument();
  });

  it('shows the expanded panel after clicking the trophy button', async () => {
    const user = userEvent.setup();
    const props = defaultProps();
    render(<ExploreBar {...props} />);

    await user.click(screen.getByTitle('View progress'));

    expect(screen.getByText('Your Progress')).toBeInTheDocument();
  });

  it('hides the expanded panel when the button is clicked again (toggle)', async () => {
    const user = userEvent.setup();
    const props = defaultProps();
    render(<ExploreBar {...props} />);

    const expandBtn = screen.getByTitle('View progress');
    await user.click(expandBtn);
    await user.click(expandBtn);

    expect(screen.queryByText('Your Progress')).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// 6. All 9 category names appear in the expanded panel
// ---------------------------------------------------------------------------
describe('expanded panel — category names', () => {
  it('shows all 9 category names when expanded', async () => {
    const user = userEvent.setup();
    const props = defaultProps();
    render(<ExploreBar {...props} />);

    await user.click(screen.getByTitle('View progress'));

    expect(CATEGORIES).toHaveLength(9);

    for (const cat of CATEGORIES) {
      expect(screen.getByText(cat.name)).toBeInTheDocument();
    }
  });
});

// ---------------------------------------------------------------------------
// 7. Item pill click calls onSelectItem with the item's id
// ---------------------------------------------------------------------------
describe('item pill clicks', () => {
  it('calls onSelectItem with the correct id when an item pill is clicked', async () => {
    const user = userEvent.setup();
    const props = defaultProps();
    render(<ExploreBar {...props} />);

    // Expand the panel
    await user.click(screen.getByTitle('View progress'));

    // Find the "Popover" pill (it's in overlays, id = 'popover')
    const popoverPill = screen.getByRole('button', { name: /popover/i });
    await user.click(popoverPill);

    expect(props.onSelectItem).toHaveBeenCalledWith('popover');
  });

  it('calls onSelectItem with the correct id for a pill in a different category', async () => {
    const user = userEvent.setup();
    const props = defaultProps();
    render(<ExploreBar {...props} />);

    await user.click(screen.getByTitle('View progress'));

    // "Tabs vs. Segments" is in navigation with id = 'tabs'
    const tabsPill = screen.getByRole('button', { name: /tabs vs\. segments/i });
    await user.click(tabsPill);

    expect(props.onSelectItem).toHaveBeenCalledWith('tabs');
  });
});

// ---------------------------------------------------------------------------
// 8. Reset button calls explore.resetProgress
// ---------------------------------------------------------------------------
describe('Reset button', () => {
  it('calls explore.resetProgress when Reset is clicked', async () => {
    const user = userEvent.setup();
    const props = defaultProps();
    render(<ExploreBar {...props} />);

    // Expand to reveal the Reset button
    await user.click(screen.getByTitle('View progress'));

    await user.click(screen.getByRole('button', { name: /reset/i }));

    expect(props.explore.resetProgress).toHaveBeenCalledTimes(1);
  });
});
