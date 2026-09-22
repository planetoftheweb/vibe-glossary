import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VibeScorePill from '../components/learn/VibeScorePill';

const baseProps = () => ({
  score: { total: 250 },
  level: {
    current: { id: 'tinkerer', label: 'Tinkerer', min: 200 },
    next: { id: 'builder', label: 'Builder', min: 500 },
    pointsToNext: 250,
  },
  onClick: vi.fn(),
});

describe('VibeScorePill', () => {
  it('shows a class proof chip when the class bar is met', () => {
    const onOpenProof = vi.fn();
    render(
      <VibeScorePill {...baseProps()} classBarMet onOpenProof={onOpenProof} />,
    );
    expect(
      screen.getByRole('button', { name: /class proof/i }),
    ).toBeInTheDocument();
  });

  it('hides the class proof chip when the class bar is not met', () => {
    render(
      <VibeScorePill
        {...baseProps()}
        score={{ total: 50 }}
        classBarMet={false}
        onOpenProof={vi.fn()}
      />,
    );
    expect(screen.queryByRole('button', { name: /class proof/i })).toBeNull();
  });

  it('calls onOpenProof when the class proof chip is clicked', async () => {
    const user = userEvent.setup();
    const onOpenProof = vi.fn();
    render(
      <VibeScorePill {...baseProps()} classBarMet onOpenProof={onOpenProof} />,
    );
    await user.click(screen.getByRole('button', { name: /class proof/i }));
    expect(onOpenProof).toHaveBeenCalledOnce();
  });

  it('gives the class proof chip a 44px min-height touch target', () => {
    render(
      <VibeScorePill {...baseProps()} classBarMet onOpenProof={vi.fn()} />,
    );
    const chip = screen.getByRole('button', { name: /class proof/i });
    expect(chip.className).toMatch(/min-h-\[44px\]/);
  });
});
