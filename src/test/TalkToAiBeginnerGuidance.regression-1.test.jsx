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
  it('lets a new learner see the idea without a three-view lesson', () => {
    render(<TalkToAiCard topic={topic} />);

    expect(screen.getByText('Live example')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Show the mess/i })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.queryByText('Try this')).not.toBeInTheDocument();
    expect(screen.queryByText('How these views work')).not.toBeInTheDocument();
    expect(screen.getByText('Use with AI').closest('details')).not.toHaveAttribute('open');
    expect(screen.getByText('Remember this').closest('details')).not.toHaveAttribute('open');
  });

  it('shows the weak default when the learner asks to see the mess', async () => {
    const user = userEvent.setup();
    render(<TalkToAiCard topic={topic} />);

    await user.click(screen.getByRole('button', { name: /Show the mess/i }));

    expect(document.querySelector('.concept-visual')).toHaveAttribute('data-lens', 'stress');
    expect(screen.getByText('Weak link exposed')).toBeInTheDocument();
  });
});
