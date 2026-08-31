import { fireEvent, render, screen } from '@testing-library/react';
import ToastDemo from '../components/demos/overlays/ToastDemo';

describe('ToastDemo', () => {
  it('shows a separate toast for every rapid trigger click', () => {
    render(<ToastDemo activeOptions={new Set()} />);
    const trigger = screen.getByRole('button', { name: 'Trigger Toast' });

    fireEvent.click(trigger);
    fireEvent.click(trigger);
    fireEvent.click(trigger);

    expect(screen.getAllByRole('status')).toHaveLength(3);
    expect(screen.getAllByText('Changes Saved')).toHaveLength(3);
  });

  it('defaults to bottom-right placement', () => {
    render(<ToastDemo activeOptions={new Set()} />);

    const notifications = screen.getByLabelText('Toast notifications');
    expect(notifications).toHaveAttribute('data-toast-position', 'bottom-right');
    expect(notifications).toHaveClass('bottom-6', 'right-6', 'items-end');
  });

  it('uses the selected placement and matching entrance direction', () => {
    render(<ToastDemo activeOptions={new Set(['position-top-left'])} />);
    fireEvent.click(screen.getByRole('button', { name: 'Trigger Toast' }));

    const notifications = screen.getByLabelText('Toast notifications');
    expect(notifications).toHaveAttribute('data-toast-position', 'top-left');
    expect(notifications).toHaveClass('top-6', 'left-6', 'items-start');
    expect(screen.getByRole('status')).toHaveClass('animate-slide-in-left');
  });
});
