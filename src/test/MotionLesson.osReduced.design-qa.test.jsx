import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MotionLesson from '../components/learn/MotionLesson';

function mockOsPreference(initial) {
  let matches = initial;
  const listeners = new Set();
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    get matches() { return String(query).includes('prefers-reduced-motion') && matches; },
    media: query,
    addEventListener: (_type, fn) => listeners.add(fn),
    removeEventListener: (_type, fn) => listeners.delete(fn),
    addListener: (fn) => listeners.add(fn),
    removeListener: (fn) => listeners.delete(fn),
  }));
  return (next) => {
    matches = next;
    act(() => listeners.forEach((fn) => fn({ matches: next })));
  };
}

describe('Motion studio and the device reduced-motion setting (#132)', () => {
  afterEach(() => { delete window.matchMedia; });

  it('shows the real device state: pressed, aria-disabled, with the explanation', async () => {
    mockOsPreference(true);
    const user = userEvent.setup();
    render(<MotionLesson />);
    const stage = screen.getByTestId('motion-lab-stage');
    const toggle = screen.getByRole('button', { name: /Reduced by your device/i });
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(toggle).toHaveAttribute('aria-disabled', 'true');
    expect(toggle).not.toBeDisabled();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Your device has reduced motion turned on');
    expect(stage).toHaveAttribute('data-reduced', 'true');
    expect(stage).toHaveAttribute('data-duration', '0');
    expect(screen.getByText('NO TRAVEL')).toBeInTheDocument();
    expect(screen.getByText(/meaning stays. The travel disappears/i)).toBeInTheDocument();

    const run = stage.getAttribute('data-run');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(stage.getAttribute('data-run')).toBe(run);
  });

  it('keeps the learner picks visibly selected under the device setting', () => {
    mockOsPreference(true);
    render(<MotionLesson />);
    expect(screen.getByRole('button', { name: /Natural/ })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Use Snap easing' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('keeps the manual toggle working with no device preference', async () => {
    mockOsPreference(false);
    const user = userEvent.setup();
    render(<MotionLesson />);
    const toggle = screen.getByRole('button', { name: 'Try reduced motion' });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    expect(toggle).not.toHaveAttribute('aria-disabled');
    await user.click(toggle);
    expect(screen.getByRole('button', { name: 'Motion reduced' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('motion-lab-stage')).toHaveAttribute('data-reduced', 'true');
    await user.click(screen.getByRole('button', { name: 'Motion reduced' }));
    expect(screen.getByTestId('motion-lab-stage')).toHaveAttribute('data-reduced', 'false');
  });

  it('follows a device preference that changes after mount', () => {
    const setOs = mockOsPreference(false);
    render(<MotionLesson />);
    const stage = screen.getByTestId('motion-lab-stage');
    expect(stage).toHaveAttribute('data-reduced', 'false');
    setOs(true);
    expect(stage).toHaveAttribute('data-reduced', 'true');
    expect(screen.getByRole('button', { name: /Reduced by your device/i })).toHaveAttribute('aria-disabled', 'true');
    setOs(false);
    expect(stage).toHaveAttribute('data-reduced', 'false');
    expect(screen.getByRole('button', { name: 'Try reduced motion' })).toBeInTheDocument();
  });
});
