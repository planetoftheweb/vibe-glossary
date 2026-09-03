import { render, screen } from '@testing-library/react';
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
  it('shows the live example without studio verbs or drawers', () => {
    render(<TalkToAiCard topic={topic} />);

    expect(screen.getByText('Give every gap a beat.')).toBeInTheDocument();
    expect(screen.getByText('Live example')).toBeInTheDocument();
    expect(document.querySelector('.concept-visual--spacing')).toHaveAttribute('data-lens', 'map');
    expect(screen.queryByRole('button', { name: /Show the mess/i })).not.toBeInTheDocument();
    expect(screen.queryByText('Use with AI')).not.toBeInTheDocument();
    expect(screen.queryByText('Remember this')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Copy a prompt' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Copy a filled-in example' })).toBeInTheDocument();
    screen.getAllByRole('button', { name: /Copy /i }).forEach((button) => {
      expect(button).not.toHaveAttribute('title');
      expect(button.className).toMatch(/min-h-\[44px\]/);
    });
  });
});
