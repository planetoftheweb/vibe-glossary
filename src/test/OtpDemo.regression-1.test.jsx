import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OtpDemo from '../components/demos/inputs/OtpDemo';

describe('OTP live lesson', () => {
  it('lets a learner type the code and see auto-advance happen', async () => {
    const user = userEvent.setup();
    render(<OtpDemo activeOptions={new Set(['focus'])} />);

    const first = screen.getByRole('textbox', { name: 'Digit 1 of 4' });
    const second = screen.getByRole('textbox', { name: 'Digit 2 of 4' });

    await user.click(first);
    await user.type(first, '3');

    expect(first).toHaveValue('3');
    expect(second).toHaveFocus();
    expect(screen.getByText(/Auto-advance is on/)).toBeInTheDocument();
  });

  it('fills all four boxes when a full code is pasted', () => {
    render(<OtpDemo activeOptions={new Set()} />);
    const first = screen.getByRole('textbox', { name: 'Digit 1 of 4' });

    fireEvent.paste(first, {
      clipboardData: { getData: () => '12 34' },
    });

    expect(screen.getByRole('textbox', { name: 'Digit 1 of 4' })).toHaveValue('1');
    expect(screen.getByRole('textbox', { name: 'Digit 2 of 4' })).toHaveValue('2');
    expect(screen.getByRole('textbox', { name: 'Digit 3 of 4' })).toHaveValue('3');
    expect(screen.getByRole('textbox', { name: 'Digit 4 of 4' })).toHaveValue('4');
    expect(screen.getByText(/Code complete/)).toBeInTheDocument();
  });
});
