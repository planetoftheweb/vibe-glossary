import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TalkToAiCard from '../components/learn/TalkToAiCard';

const topic = {
  id: 'mvp',
  title: 'MVP (Minimum Viable Product)',
  clusterId: 'product',
  summary: 'The smallest version you can show to real people to learn whether the idea works.',
  comparison: 'An MVP tests interest. A first release polishes what people already value.',
  vibeTip: 'List the one or two flows that prove the idea and skip everything else.',
  mnemonic: 'An MVP is a question, not a finished product.',
  talkToAi: { starter: 'Starter', example: 'Example' },
};

describe('Build Literacy concept studio guidance', () => {
  it('tells a new learner which views to choose and what to watch', () => {
    render(<TalkToAiCard topic={topic} />);

    expect(screen.getByText('Try this')).toBeInTheDocument();
    expect(screen.getByText('Start with Map it. Then choose Break it and Use it.')).toBeInTheDocument();
    expect(screen.getByText(/Watch the diagram and this note change/)).toBeInTheDocument();
    expect(screen.getByText('Choose each view in order. Watch the diagram and note change.')).toBeInTheDocument();
  });

  it('explains the consequence after the learner changes the view', async () => {
    const user = userEvent.setup();
    render(<TalkToAiCard topic={topic} />);

    await user.click(screen.getByRole('button', { name: /Break it/i }));

    expect(screen.getByText('What changed')).toBeInTheDocument();
    expect(screen.getByText('Break it shows the mistake this idea helps prevent.')).toBeInTheDocument();
    expect(screen.getByText(/Compare the changed diagram with Map it/)).toBeInTheDocument();
  });
});
