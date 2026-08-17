import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import WelcomeScreen from '../components/WelcomeScreen';
import { TOUR_STEPS, TOUR_VERSION, hasSeenCurrentTour, markTourSeen, resetTourSeen } from '../data/tour';

// ─── WelcomeScreen tests ────────────────────────────────────────────────────

describe('WelcomeScreen', () => {
  const defaultProps = {
    onEnter: vi.fn(),
    onSelectCategory: vi.fn(),
    onSelectBuildTopic: vi.fn(),
    onStartTour: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not render a How it works section', () => {
    render(<WelcomeScreen {...defaultProps} />);
    expect(screen.queryByText('How it works')).toBeNull();
    expect(screen.queryByText('01')).toBeNull();
    expect(screen.queryByText('02')).toBeNull();
    expect(screen.queryByText('03')).toBeNull();
  });

  it('renders the Browse components CTA in the hero', () => {
    render(<WelcomeScreen {...defaultProps} />);
    const btn = screen.getByRole('button', { name: /browse components/i });
    expect(btn).toBeInTheDocument();
  });

  it('Browse components CTA calls onSelectCategory with the first item', async () => {
    const user = userEvent.setup();
    render(<WelcomeScreen {...defaultProps} />);
    const btn = screen.getByRole('button', { name: /browse components/i });
    await user.click(btn);
    expect(defaultProps.onSelectCategory).toHaveBeenCalledWith('modal');
  });

  it('renders the Take the tour button when onStartTour is provided', () => {
    render(<WelcomeScreen {...defaultProps} />);
    const btn = screen.getByRole('button', { name: /take the tour/i });
    expect(btn).toBeInTheDocument();
  });

  it('Take the tour button calls onStartTour', async () => {
    const user = userEvent.setup();
    render(<WelcomeScreen {...defaultProps} />);
    const btn = screen.getByRole('button', { name: /take the tour/i });
    await user.click(btn);
    expect(defaultProps.onStartTour).toHaveBeenCalled();
  });

  it('does not render the old X/Skip intro button', () => {
    render(<WelcomeScreen {...defaultProps} />);
    expect(screen.queryByTitle('Skip intro')).toBeNull();
  });

  it('does not render the Take the tour button when onStartTour is absent', () => {
    render(<WelcomeScreen {...{ ...defaultProps, onStartTour: undefined }} />);
    expect(screen.queryByRole('button', { name: /take the tour/i })).toBeNull();
  });
});

// ─── Tour data shape tests ──────────────────────────────────────────────────

describe('Tour steps data', () => {
  it('TOUR_VERSION is a positive integer', () => {
    expect(Number.isInteger(TOUR_VERSION)).toBe(true);
    expect(TOUR_VERSION).toBeGreaterThan(0);
  });

  it('has at least 3 steps', () => {
    expect(TOUR_STEPS.length).toBeGreaterThanOrEqual(3);
  });

  it('each step has id, title, body, and target', () => {
    for (const step of TOUR_STEPS) {
      expect(step).toHaveProperty('id');
      expect(step).toHaveProperty('title');
      expect(step).toHaveProperty('body');
      expect(step).toHaveProperty('target');
      expect(typeof step.id).toBe('string');
      expect(typeof step.title).toBe('string');
      expect(typeof step.body).toBe('string');
      expect(typeof step.target).toBe('string');
      expect(step.id.length).toBeGreaterThan(0);
      expect(step.title.length).toBeGreaterThan(0);
      expect(step.body.length).toBeGreaterThan(0);
      expect(step.target.length).toBeGreaterThan(0);
    }
  });

  it('each step target uses a data-tour selector', () => {
    for (const step of TOUR_STEPS) {
      expect(step.target).toMatch(/\[data-tour=/);
    }
  });

  it('step IDs are unique', () => {
    const ids = TOUR_STEPS.map(s => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('no em dashes in student-facing copy', () => {
    for (const step of TOUR_STEPS) {
      expect(step.title).not.toContain('\u2014');
      expect(step.body).not.toContain('\u2014');
    }
  });

  it('TOUR_VERSION is at least 2 (bumped for action-aware tour)', () => {
    expect(TOUR_VERSION).toBeGreaterThanOrEqual(2);
  });

  it('steps that need an open panel declare an action', () => {
    const stepsNeedingAction = TOUR_STEPS.filter(s =>
      ['share', 'proof', 'paths'].includes(s.id)
    );
    expect(stepsNeedingAction.length).toBeGreaterThan(0);
    for (const step of stepsNeedingAction) {
      expect(step).toHaveProperty('action');
      expect(typeof step.action).toBe('string');
      expect(step.action.length).toBeGreaterThan(0);
    }
  });

  it('share step targets the share control, not the score pill', () => {
    const shareStep = TOUR_STEPS.find(s => s.id === 'share');
    expect(shareStep).toBeDefined();
    expect(shareStep.target).not.toBe('[data-tour="vibe-score"]');
    expect(shareStep.target).toMatch(/\[data-tour=/);
  });

  it('proof step targets the class proof button, not the score pill', () => {
    const proofStep = TOUR_STEPS.find(s => s.id === 'proof');
    expect(proofStep).toBeDefined();
    expect(proofStep.target).not.toBe('[data-tour="vibe-score"]');
    expect(proofStep.target).toMatch(/\[data-tour=/);
  });

  it('paths step targets the learning paths item, not the menu wrapper', () => {
    const pathsStep = TOUR_STEPS.find(s => s.id === 'paths');
    expect(pathsStep).toBeDefined();
    expect(pathsStep.target).not.toBe('[data-tour="main-menu"]');
    expect(pathsStep.target).toMatch(/\[data-tour=/);
  });

  it('action values are valid action names', () => {
    const validActions = ['openScoreBreakdown', 'openMenu', 'focusSearch'];
    for (const step of TOUR_STEPS) {
      if (step.action) {
        expect(validActions).toContain(step.action);
      }
    }
  });
});

// ─── Tour persistence tests ─────────────────────────────────────────────────

describe('Tour persistence (localStorage)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('hasSeenCurrentTour returns false on first visit', () => {
    expect(hasSeenCurrentTour()).toBe(false);
  });

  it('markTourSeen persists and hasSeenCurrentTour returns true', () => {
    markTourSeen();
    expect(hasSeenCurrentTour()).toBe(true);
  });

  it('resetTourSeen clears the flag', () => {
    markTourSeen();
    resetTourSeen();
    expect(hasSeenCurrentTour()).toBe(false);
  });

  it('version bump re-offers the tour', () => {
    localStorage.setItem('vg-tour-version-seen', String(TOUR_VERSION - 1));
    expect(hasSeenCurrentTour()).toBe(false);
  });

  it('same version does not re-offer', () => {
    localStorage.setItem('vg-tour-version-seen', String(TOUR_VERSION));
    expect(hasSeenCurrentTour()).toBe(true);
  });

  it('higher stored version still counts as seen', () => {
    localStorage.setItem('vg-tour-version-seen', String(TOUR_VERSION + 1));
    expect(hasSeenCurrentTour()).toBe(true);
  });
});
