import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProgressToast from '../components/learn/ProgressToast';

describe('ProgressToast', () => {
  it('shows the earned points, next target, and a useful action', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    const onDismiss = vi.fn();
    const toast = {
      id: 1,
      kind: 'review',
      title: 'Review unlocked',
      points: 25,
      message: 'Five items are ready.',
      target: { remaining: 17, label: 'Scroller', percent: 66 },
      actionLabel: 'Start review',
      onAction,
    };

    render(<ProgressToast toast={toast} onDismiss={onDismiss} />);
    expect(screen.getByText('+25 pts')).toBeInTheDocument();
    expect(screen.getByText('17 pts to Scroller')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Start review' }));
    expect(onAction).toHaveBeenCalledOnce();
    expect(onDismiss).toHaveBeenCalledWith(1);
  });
});
