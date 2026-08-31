import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScoreStoragePrompt from '../components/learn/ScoreStoragePrompt';

describe('ScoreStoragePrompt', () => {
  it('explains registration while keeping local progress safe', () => {
    render(<ScoreStoragePrompt score={42} onStore={() => {}} onLater={() => {}} />);

    expect(screen.getByRole('dialog', { name: 'Want to store your VibeScore?' }))
      .toBeInTheDocument();
    expect(screen.getByText(/You’ve earned 42 points/i)).toBeInTheDocument();
    expect(screen.getByText(/Registration is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Your local progress stays either way/i)).toBeInTheDocument();
  });

  it('focuses the store action and lets Escape choose Not now', async () => {
    const user = userEvent.setup();
    const onLater = vi.fn();
    render(<ScoreStoragePrompt score={12} onStore={() => {}} onLater={onLater} />);

    expect(screen.getByRole('button', { name: 'Store my score' })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(onLater).toHaveBeenCalledTimes(1);
  });
});
