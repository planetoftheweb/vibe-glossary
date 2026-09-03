import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TalkToAiCard from '../components/learn/TalkToAiCard';

const topic = {
  id: 'spacing-scale',
  clusterId: 'design-language',
  clusterTitle: 'Design language',
  title: 'Spacing scale (the 4 or 8px grid)',
  summary: 'Multiples of 4 or 8 for every gap, padding, and margin.',
  comparison: 'Random values feel accidental. A scale creates rhythm.',
  vibeTip: 'Ask the AI to use the existing spacing scale.',
  mnemonic: 'Spacing on a grid feels intentional.',
  talkToAi: {
    starter: 'Interview me about spacing first.',
    example: 'Use space.4 between these cards.',
  },
};

describe('TalkToAiCard concept studio', () => {
  it('shows the live example first and keeps AI copy as a closed drawer', async () => {
    const user = userEvent.setup();
    render(<TalkToAiCard topic={topic} />);

    expect(screen.getByText('Give every gap a beat.')).toBeInTheDocument();
    expect(screen.getByText('Live example')).toBeInTheDocument();
    expect(document.querySelector('.concept-visual--spacing')).toHaveAttribute('data-lens', 'map');
    expect(screen.queryByRole('button', { name: /Map it/i })).not.toBeInTheDocument();
    expect(screen.queryByText('How these views work')).not.toBeInTheDocument();
    expect(screen.getByText('Use with AI').closest('details')).not.toHaveAttribute('open');
    expect(screen.getByRole('button', { name: /Copy starter prompt/i })).toBeInTheDocument();
    screen.getAllByRole('button', { name: /Copy /i }).forEach((button) => {
      expect(button).not.toHaveAttribute('title');
    });

    await user.click(screen.getByRole('button', { name: /Show the mess/i }));
    expect(document.querySelector('.concept-visual--spacing')).toHaveAttribute('data-lens', 'stress');
    expect(screen.getByText(/Random values make every relationship feel accidental/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Show the idea/i })).toHaveAttribute('aria-pressed', 'true');
  });

  it('keeps AI copy actions inside a full hit target', () => {
    render(<TalkToAiCard topic={topic} />);
    screen.getAllByRole('button', { name: /Copy /i }).forEach((button) => {
      expect(button.className).toMatch(/min-h-\[44px\]/);
    });
  });
});
