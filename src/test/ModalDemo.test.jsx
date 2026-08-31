import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalDemo, { MODAL_EXIT_DURATION_MS } from '../components/demos/overlays/ModalDemo';

describe('ModalDemo animation', () => {
  it('keeps the modal mounted while the close animation plays', () => {
    vi.useFakeTimers();

    try {
      render(<ModalDemo activeOptions={new Set(['anim'])} />);
      fireEvent.click(screen.getByRole('button', { name: 'Open Modal' }));

      const backdrop = document.querySelector('.animate-modal-backdrop');
      const dialog = document.querySelector('.animate-modal-dialog');
      expect(backdrop).toBeInTheDocument();
      expect(dialog).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'Close' }));

      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
      expect(backdrop).toHaveClass('animate-modal-backdrop-out');
      expect(dialog).toHaveClass('animate-modal-dialog-out');

      act(() => vi.advanceTimersByTime(MODAL_EXIT_DURATION_MS - 1));
      expect(screen.getByText('Confirm Action')).toBeInTheDocument();

      act(() => vi.advanceTimersByTime(1));
      expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it('closes immediately when animation is not selected', async () => {
    const user = userEvent.setup();
    render(<ModalDemo activeOptions={new Set()} />);

    await user.click(screen.getByRole('button', { name: 'Open Modal' }));
    await user.click(screen.getByRole('button', { name: 'Close' }));

    expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument();
  });

  it('closes immediately when reduced motion is preferred', async () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });

    try {
      const user = userEvent.setup();
      render(<ModalDemo activeOptions={new Set(['anim'])} />);

      await user.click(screen.getByRole('button', { name: 'Open Modal' }));
      await user.click(screen.getByRole('button', { name: 'Close' }));

      expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument();
    } finally {
      window.matchMedia = originalMatchMedia;
    }
  });
});
