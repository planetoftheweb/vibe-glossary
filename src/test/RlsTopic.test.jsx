import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TalkToAiCard from '../components/learn/TalkToAiCard';
import { BUILD_TOPICS_FLAT } from '../data/buildLiteracy';

describe('Row Level Security topic', () => {
  const topic = BUILD_TOPICS_FLAT.rls;

  it('lives in the auth cluster with the full topic shape', () => {
    expect(topic.clusterId).toBe('auth');
    expect(topic.summary).toMatch(/Row Level Security \(RLS\)/);
    expect(topic.mnemonic).toBe('Login opens the door. RLS picks the rows.');
    expect(topic.talkToAi.starter).toMatch(/second account/);
    expect(topic.talkToAi.starter).toMatch(/private window/);
    const copy = [topic.title, topic.summary, topic.details, topic.comparison, topic.vibeTip,
      topic.talkToAi.starter, topic.talkToAi.example, topic.mnemonic].join(' ');
    expect(copy).not.toMatch(/\u2014/);
  });

  it('shows leaked rows with RLS off and only owned rows with RLS on', async () => {
    const user = userEvent.setup();
    const { container } = render(<TalkToAiCard topic={topic} />);
    expect(container.querySelectorAll('.rls-scene__row')).toHaveLength(4);
    expect(container.querySelectorAll('.rls-scene__row.is-leak')).toHaveLength(2);

    await user.click(screen.getByRole('button', { name: 'RLS off' }));
    expect(screen.getByRole('button', { name: 'RLS on' })).toHaveAttribute('aria-pressed', 'true');
    expect(container.querySelectorAll('.rls-scene__row')).toHaveLength(2);
    expect(container.querySelectorAll('.rls-scene__row.is-leak')).toHaveLength(0);

    await user.click(screen.getByRole('button', { name: 'Signed in as Ben' }));
    const rows = [...container.querySelectorAll('.rls-scene__row')];
    expect(rows).toHaveLength(1);
    expect(rows[0]).toHaveTextContent('A3 user flow');
    expect(rows[0]).toHaveTextContent('Yours');
  });
});
