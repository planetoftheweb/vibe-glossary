import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MotionPatternDemo from '../components/demos/MotionPatternDemo';

describe('Motion glossary beginner guidance', () => {
  it('turns the easing preview into a concrete compare exercise', () => {
    render(<MotionPatternDemo demoId="easing" />);

    expect(screen.getByText('Try this')).toBeInTheDocument();
    expect(screen.getByText('Choose Slow-mo, then press Replay.')).toBeInTheDocument();
    expect(screen.getByText(/Watch how each one starts and stops differently/)).toBeInTheDocument();
    expect(document.querySelector('.vg-studio__intro')).toBeNull();
  });

  it('lets learners replay a count-up instead of watching a one-time animation', async () => {
    const user = userEvent.setup();
    render(<MotionPatternDemo demoId="countup" />);

    const replay = screen.getByRole('button', { name: 'Replay count' });
    await user.click(replay);

    expect(replay).toBeInTheDocument();
    expect(screen.getByText('Press Replay count and follow the number to 128.')).toBeInTheDocument();
  });

  it('gives the moving marquee a pause control', async () => {
    const user = userEvent.setup();
    render(<MotionPatternDemo demoId="marquee" />);

    await user.click(screen.getByRole('button', { name: 'Pause row' }));

    expect(screen.getByRole('button', { name: 'Play row' })).toBeInTheDocument();
    expect(screen.getByText('Pause the row, then play it again.')).toBeInTheDocument();
  });
});
