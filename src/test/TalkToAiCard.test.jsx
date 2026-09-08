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
  it('puts Prompt and Example in the live example header and shows the prompt text', async () => {
    const user = userEvent.setup();
    render(<TalkToAiCard topic={topic} />);

    expect(screen.getByText('Live example')).toBeInTheDocument();
    expect(screen.getByText('Interview me about spacing first.')).toBeInTheDocument();
    expect(screen.queryByText('A type scale gives every sentence a job.')).not.toBeInTheDocument();
    const prompt = screen.getByRole('button', { name: 'Prompt' });
    const example = screen.getByRole('button', { name: 'Example' });
    expect(prompt).toHaveAttribute('aria-pressed', 'true');
    [prompt, example].forEach((button) => {
      expect(button).not.toHaveAttribute('title');
      expect(button.className).toMatch(/min-h-\[44px\]/);
    });

    await user.click(example);
    expect(screen.getByText('Use space.4 between these cards.')).toBeInTheDocument();
    expect(example).toHaveAttribute('aria-pressed', 'true');
  });
});
