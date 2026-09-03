import { render, screen } from '@testing-library/react';
import TalkToAiCard from '../components/learn/TalkToAiCard';
import BuildTopicView from '../components/learn/BuildTopicView';

const topic = {
  id: 'mvp',
  title: 'MVP (Minimum Viable Product)',
  clusterId: 'product',
  clusterTitle: 'Product',
  summary: 'The smallest version you can show to real people to learn whether the idea works.',
  comparison: 'An MVP tests interest. A first release polishes what people already value.',
  vibeTip: 'List the one or two flows that prove the idea and skip everything else.',
  mnemonic: 'An MVP is a question, not a finished product.',
  talkToAi: { starter: 'Starter', example: 'Example' },
};

describe('Build Literacy concept studio guidance', () => {
  it('keeps the right pane as the picture and the remember line on the lesson', () => {
    render(<TalkToAiCard topic={topic} />);

    expect(screen.getByText('Live example')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Show the mess/i })).not.toBeInTheDocument();
    expect(screen.queryByText('How these views work')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Prompt' })).toBeInTheDocument();
    expect(screen.getByText('Starter')).toBeInTheDocument();
  });

  it('puts the remember sentence on the left, not behind a toggle', () => {
    render(
      <BuildTopicView
        topic={topic}
        cluster={{ id: 'product', title: 'Product', topics: [topic] }}
        glossary={{}}
        learnMode={false}
        toggleLearnMode={() => {}}
        showProgressionNav={false}
      />,
    );

    expect(screen.getByText('Remember')).toBeInTheDocument();
    expect(screen.getByText('An MVP is a question, not a finished product.')).toBeInTheDocument();
  });
});
