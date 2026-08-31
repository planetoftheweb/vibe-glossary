import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScoreBreakdownModal from '../components/learn/ScoreBreakdownModal';
import ProofView from '../components/learn/ProofView';
import { levelFor } from '../lib/scoring';

const scoreAt = (total) => ({
  total,
  glossary: { total, visited: total, used: 0, passed: 0, mastered: 0, retained: 0, pathBonus: 0 },
  build: { total: 0, visited: 0, used: 0, passed: 0, mastered: 0, retained: 0, pathBonus: 0 },
});

describe('Score progress coach', () => {
  it('translates the next level into an exact, interactive mission', async () => {
    const user = userEvent.setup();
    render(
      <ScoreBreakdownModal
        isOpen
        onClose={() => {}}
        score={scoreAt(33)}
        level={levelFor(33)}
        learningProgress={{ count: 3, total: 5, checkpointReady: false }}
        onContinueLearning={() => {}}
      />
    );

    expect(screen.getByRole('heading', { name: '17 points to Scroller' })).toBeInTheDocument();
    expect(screen.getByText('As few as 1 five-item review can get you there. Every correct review answer adds 5 points.')).toBeInTheDocument();
    expect(screen.getByText('3 review answers')).toBeInTheDocument();
    expect(screen.getByText('1 used prompt')).toBeInTheDocument();
    expect(screen.getByText('2 more items unlock your next review.')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Tinkerer.*Preview requirements/i }));
    expect(screen.getByRole('heading', { name: '167 points to Tinkerer' })).toBeInTheDocument();
    expect(screen.getByText('33 review answers')).toBeInTheDocument();
    expect(screen.getByText('Class requirement: 167 points left')).toBeInTheDocument();
    expect(screen.getAllByText(/As few as 7 five-item reviews/i)).toHaveLength(2);
  });

  it('shows when a review is ready and continues from the mission card', async () => {
    const user = userEvent.setup();
    const onContinueLearning = vi.fn();
    render(
      <ScoreBreakdownModal
        isOpen
        onClose={() => {}}
        score={scoreAt(33)}
        level={levelFor(33)}
        learningProgress={{ count: 5, total: 5, checkpointReady: true }}
        onContinueLearning={onContinueLearning}
      />
    );

    expect(screen.getByText('Your five-item review is ready now.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Start review' }));
    expect(onContinueLearning).toHaveBeenCalledOnce();
  });

  it('makes the remaining class work explicit in Class Proof', () => {
    render(
      <ProofView
        isOpen
        onClose={() => {}}
        score={scoreAt(33)}
        level={levelFor(33)}
        badges={new Set()}
      />
    );

    expect(screen.getByText('167 points left to meet the class requirement')).toBeInTheDocument();
    expect(screen.getByText(/As few as 7 five-item reviews/i)).toBeInTheDocument();
    expect(screen.getByText('33 earned')).toBeInTheDocument();
    expect(screen.getByText('200 required')).toBeInTheDocument();
  });
});
