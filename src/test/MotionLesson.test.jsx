import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MotionLesson from '../components/learn/MotionLesson';

describe('MotionLesson', () => {
  it('starts as a large three-dial motion studio', () => {
    render(<MotionLesson />);

    expect(screen.getByRole('heading', { name: /You're the director now/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Animation duration')).toHaveValue('280');
    expect(screen.getByText('01 · Duration')).toBeInTheDocument();
    expect(screen.getByText('02 · Easing')).toBeInTheDocument();
    expect(screen.getByText('03 · Choreography')).toBeInTheDocument();

    const stage = screen.getByTestId('motion-lab-stage');
    expect(stage).toHaveAttribute('data-duration', '280');
    expect(stage).toHaveAttribute('data-easing', 'snap');
    expect(stage).toHaveAttribute('data-choreography', 'story');
    expect(screen.getByText(/The backdrop sets the scene/i)).toBeInTheDocument();
  });

  it('lets the learner make the motion deliberately bad and explains why', async () => {
    const user = userEvent.setup();
    render(<MotionLesson />);

    await user.click(screen.getByRole('button', { name: /Dramatic620ms/i }));
    expect(screen.getByTestId('motion-lab-stage')).toHaveAttribute('data-duration', '620');
    expect(screen.getByText(/feel the interface making you wait/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Use Linear easing' }));
    await user.click(screen.getByRole('button', { name: 'All together' }));
    expect(screen.getByTestId('motion-lab-stage')).toHaveAttribute('data-easing', 'linear');
    expect(screen.getByTestId('motion-lab-stage')).toHaveAttribute('data-choreography', 'together');
  });

  it('replays the stage and demonstrates a real reduced-motion alternative', async () => {
    const user = userEvent.setup();
    render(<MotionLesson />);
    const stage = screen.getByTestId('motion-lab-stage');
    const firstRun = Number(stage.getAttribute('data-run'));

    await user.click(screen.getByRole('button', { name: 'Replay scene' }));
    expect(Number(stage.getAttribute('data-run'))).toBe(firstRun + 1);

    await user.click(screen.getByRole('button', { name: 'Try reduced motion' }));
    expect(stage).toHaveAttribute('data-reduced', 'true');
    expect(stage).toHaveAttribute('data-duration', '0');
    expect(screen.getByText(/meaning stays. The travel disappears/i)).toBeInTheDocument();
  });
});
