import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MotionPatternDemo from '../components/demos/MotionPatternDemo';

function mockReducedMotion(reduce) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: String(query).includes('prefers-reduced-motion') && reduce,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }));
}

describe('Easing glossary studio', () => {
  beforeEach(() => mockReducedMotion(false));

  it('uses equal-time footprints and a live curve to explain the selected easing', async () => {
    const user = userEvent.setup();
    render(<MotionPatternDemo demoId="easing" />);

    const lab = document.querySelector('[data-easing-lab]');
    const initialTrail = [...document.querySelectorAll('[data-easing-trail]')];
    const earlyEaseOutPosition = parseFloat(initialTrail[1].style.left);

    expect(lab).toHaveAttribute('data-selected-easing', 'ease-out');
    expect(lab).toHaveAttribute('data-duration', '300');
    expect(initialTrail).toHaveLength(8);
    expect(screen.getByRole('img', { name: 'Ease-out speed curve' })).toBeInTheDocument();
    expect(screen.getByText('Fast first. Soft at the finish.')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Ease-in: For exits' }));

    const earlyEaseInPosition = parseFloat(document.querySelectorAll('[data-easing-trail]')[1].style.left);
    expect(lab).toHaveAttribute('data-selected-easing', 'ease-in');
    expect(earlyEaseInPosition).toBeLessThan(earlyEaseOutPosition);
    expect(screen.getByRole('img', { name: 'Ease-in speed curve' })).toBeInTheDocument();
    expect(screen.getByText('Quiet start. Fast departure.')).toBeInTheDocument();
    // #120: the labels name when to use each curve. The demo still plays the same trip.
    expect(screen.getByText(/Same trip, slow start, fast finish/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ease-out: For entrances' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Linear: For loops' })).toBeInTheDocument();
  });

  it('offers a study speed and replay without changing the distance', async () => {
    const user = userEvent.setup();
    render(<MotionPatternDemo demoId="easing" />);

    const lab = document.querySelector('[data-easing-lab]');
    const firstRun = Number(lab.getAttribute('data-run'));

    // #121: the ½× control doubles 300ms to 600ms (not 1200ms).
    await user.click(screen.getByRole('button', { name: 'Slow study' }));
    expect(lab).toHaveAttribute('data-duration', '600');
    document.querySelectorAll('[data-easing]').forEach((control) => {
      expect(control).toHaveAttribute('data-duration-ms', '600');
    });
    expect(screen.getByText(/You ran Ease-out at 600ms with Slow study on/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Replay easing compare' }));
    expect(Number(lab.getAttribute('data-run'))).toBeGreaterThan(firstRun);
  });

  it('keeps the final state and removes travel for reduced motion', () => {
    mockReducedMotion(true);
    render(<MotionPatternDemo demoId="easing" />);

    expect(document.querySelector('[data-easing-lab]')).toHaveAttribute('data-duration', '0');
    expect(screen.getByRole('button', { name: 'Slow study' })).toBeDisabled();
    expect(screen.getByText('The final state appears without travel.')).toBeInTheDocument();
  });
});
