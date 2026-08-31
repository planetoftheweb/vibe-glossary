import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FloatingLearningHud, { LEARNING_HUD_STORAGE_KEY } from '../components/learn/FloatingLearningHud';

const baseProps = () => ({
  previous: { id: 'modal', title: 'Modal / Dialog' },
  next: { id: 'hover-card', title: 'Hover Card' },
  currentPosition: 8,
  total: 111,
  onPrevious: vi.fn(),
  onNext: vi.fn(),
  itemLabel: 'component',
  ariaLabel: 'Glossary progression',
  progress: {
    visited: 8,
    copied: 3,
    mastered: 2,
    total: 111,
    percent: 7,
    masteredPercent: 2,
  },
  progressSections: [
    {
      id: 'overlays',
      name: 'Overlays',
      items: [{ id: 'modal' }, { id: 'hover-card' }],
      colors: { dot: 'bg-violet-500', gradient: 'from-violet-500 to-purple-500' },
    },
  ],
  visited: new Set(['modal']),
  sectionLabel: 'UI glossary progress',
  score: { total: 33 },
  level: {
    current: { id: 'lurker', label: 'Lurker', min: 0, blurb: 'Just looking around. Welcome.' },
    next: { id: 'scroller', label: 'Scroller', min: 50, blurb: 'Getting your bearings.' },
    pointsToNext: 17,
  },
  learningProgress: { count: 3, total: 5, checkpointReady: false },
  accentClass: 'text-violet-500',
  onOpenScoreDetails: vi.fn(),
  onOpenProof: vi.fn(),
  onContinueLearning: vi.fn(),
});

beforeEach(() => {
  localStorage.removeItem(LEARNING_HUD_STORAGE_KEY);
});

describe('FloatingLearningHud', () => {
  it('keeps progression obvious while floating above the page', () => {
    render(<FloatingLearningHud {...baseProps()} />);

    const nav = screen.getByRole('navigation', { name: 'Glossary progression' });
    expect(nav).toHaveTextContent('Previous');
    expect(nav).toHaveTextContent('Modal / Dialog');
    expect(nav).toHaveTextContent('8 of 111');
    expect(nav).toHaveTextContent('Use');
    expect(nav).toHaveTextContent('Hover Card');
    expect(screen.getByRole('button', { name: 'Score 33, level Lurker' })).toBeInTheDocument();
  });

  it('opens a Progress popup with the circular meter and section breakdown', async () => {
    const user = userEvent.setup();
    const { container } = render(<FloatingLearningHud {...baseProps()} />);

    await user.click(screen.getByRole('button', { name: 'UI glossary progress: 8 of 111' }));

    const popup = screen.getByRole('dialog', { name: 'Progress' });
    expect(popup).toHaveTextContent('UI glossary progress');
    expect(popup).toHaveTextContent('8/111 explored');
    expect(popup).toHaveTextContent('2 more items to your next review');
    expect(popup).toHaveTextContent('Overlays');
    expect(within(popup).getByText('1/2')).toBeInTheDocument();
    expect(container.querySelectorAll('#learning-hud-progress circle').length).toBeGreaterThanOrEqual(4);
  });

  it('opens Score as its own popup and connects the next mission actions', async () => {
    const user = userEvent.setup();
    const props = baseProps();
    render(<FloatingLearningHud {...props} />);

    await user.click(screen.getByRole('button', { name: 'Score 33, level Lurker' }));

    const popup = screen.getByRole('dialog', { name: 'Score' });
    expect(popup).toHaveTextContent('Score 33');
    expect(popup).toHaveTextContent('Lurker');
    expect(popup).toHaveTextContent('17 points to Scroller');
    expect(popup).toHaveTextContent('167 to class goal');

    await user.click(within(popup).getByRole('button', { name: 'Full score plan' }));
    expect(props.onOpenScoreDetails).toHaveBeenCalledTimes(1);
  });

  it('can dock, minimize, hide, and restore without trapping the learner', async () => {
    const user = userEvent.setup();
    render(<FloatingLearningHud {...baseProps()} />);

    await user.click(screen.getByRole('button', { name: 'Dock learning HUD' }));
    await user.click(screen.getByRole('menuitem', { name: 'Dock to top' }));
    expect(screen.getByLabelText('Learning HUD')).toHaveAttribute('data-dock', 'top');

    await user.click(screen.getByRole('button', { name: 'Minimize learning HUD' }));
    expect(screen.getByRole('button', { name: 'Expand learning HUD' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Hide learning HUD' }));
    expect(screen.getByRole('button', { name: 'Show learning HUD' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Show learning HUD' }));
    await user.click(screen.getByRole('button', { name: 'Expand learning HUD' }));
    expect(screen.getByRole('navigation', { name: 'Glossary progression' })).toBeInTheDocument();
  });

  it('switches to free positioning when the drag handle moves', async () => {
    render(<FloatingLearningHud {...baseProps()} />);
    const handle = screen.getByRole('button', { name: 'Move learning HUD' });

    fireEvent.pointerDown(handle, { button: 0, pointerId: 4, clientX: 100, clientY: 100 });
    fireEvent.pointerMove(handle, { pointerId: 4, clientX: 180, clientY: 190 });
    fireEvent.pointerUp(handle, { pointerId: 4, clientX: 180, clientY: 190 });

    expect(screen.getByLabelText('Learning HUD')).toHaveAttribute('data-dock', 'free');
    expect(screen.getByLabelText('Learning HUD')).toHaveStyle({ left: '80px', top: '90px' });
    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem(LEARNING_HUD_STORAGE_KEY)).dock).toBe('free');
    });
  });

  it('moves from anywhere on the expanded HUD header', () => {
    render(<FloatingLearningHud {...baseProps()} />);
    const dragBar = screen.getByTestId('learning-hud-drag-bar');

    fireEvent.pointerDown(dragBar, { button: 0, pointerId: 7, clientX: 120, clientY: 110 });
    fireEvent.pointerMove(dragBar, { pointerId: 7, clientX: 210, clientY: 175 });
    fireEvent.pointerUp(dragBar, { pointerId: 7, clientX: 210, clientY: 175 });

    expect(screen.getByLabelText('Learning HUD')).toHaveAttribute('data-dock', 'free');
    expect(screen.getByLabelText('Learning HUD')).toHaveStyle({ left: '90px', top: '88px' });
  });
});
