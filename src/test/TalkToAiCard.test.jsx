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
  it('teaches the concept before presenting the AI handoff', async () => {
    const user = userEvent.setup();
    render(<TalkToAiCard topic={topic} />);

    expect(screen.getByText('Give every gap a beat.')).toBeInTheDocument();
    expect(document.querySelector('.concept-visual--spacing')).toHaveAttribute('data-lens', 'map');
    expect(screen.getByRole('button', { name: /Copy starter prompt/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Copy real example/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Break it/i }));
    expect(document.querySelector('.concept-visual--spacing')).toHaveAttribute('data-lens', 'stress');
    expect(screen.getByText('What changed')).toBeInTheDocument();
    expect(screen.getByText('Break it shows the mistake this idea helps prevent.')).toBeInTheDocument();
    expect(screen.getByText(/Random values make every relationship feel accidental/i)).toBeInTheDocument();
  });

  it('keeps AI copy actions inside a full hit target', () => {
    render(<TalkToAiCard topic={topic} />);
    screen.getAllByRole('button', { name: /Copy /i }).forEach((button) => {
      expect(button.className).toMatch(/min-h-\[44px\]/);
    });
  });
});
