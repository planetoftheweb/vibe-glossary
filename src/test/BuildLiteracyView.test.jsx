import { render, screen } from '@testing-library/react';
import BuildLiteracyView from '../components/learn/BuildLiteracyView';
import { BUILD_TOPIC_IDS } from '../data/buildLiteracy';

vi.mock('../components/learn/WebFoundationLesson', () => ({
  default: () => <div data-testid="web-foundation-lesson" />,
}));

vi.mock('../components/learn/BuildTopicView', () => ({
  default: () => <div data-testid="build-topic-view">Build topic</div>,
}));

vi.mock('../components/learn/LearningCheckpointModal', () => ({
  default: ({ items }) => <div role="dialog">{items.length} checkpoint items</div>,
}));

vi.mock('../components/learn/TalkToAiCard', () => ({
  default: () => <div data-testid="talk-to-ai" />,
}));

vi.mock('../components/learn/MotionLesson', () => ({
  default: () => <div data-testid="motion-lesson" />,
}));

describe('BuildLiteracyView learning checkpoints', () => {
  const baseProps = {
    activeTopicId: BUILD_TOPIC_IDS[4],
    setActiveTopicId: vi.fn(),
    learnMode: true,
    toggleLearnMode: vi.fn(),
    attempts: {},
    recordQuizAttempt: vi.fn(),
    tiers: {},
    learningProgress: { count: 5, total: 5, checkpointReady: true },
    panelWidth: 40,
    setPanelWidth: vi.fn(),
    isDesktop: true,
    infoOpen: true,
    setInfoOpen: vi.fn(),
  };

  it('shows a ready checkpoint as a modal over the Web Foundations lesson', () => {
    render(
      <BuildLiteracyView
        {...baseProps}
        learningCheckpointIds={BUILD_TOPIC_IDS.slice(0, 5)}
      />
    );

    expect(screen.getByRole('dialog')).toHaveTextContent('5 checkpoint items');
    expect(screen.getByTestId('web-foundation-lesson')).toBeInTheDocument();
  });

  it('uses the full lesson view before the checkpoint is ready', () => {
    render(
      <BuildLiteracyView
        {...baseProps}
        learningCheckpointIds={null}
        learningProgress={{ count: 1, total: 5, checkpointReady: false }}
      />
    );

    expect(screen.getByTestId('web-foundation-lesson')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByTestId('build-topic-view')).toBeNull();
  });

  it('turns the Motion topic preview into an interactive lesson', () => {
    render(
      <BuildLiteracyView
        {...baseProps}
        activeTopicId="motion"
        learnMode={false}
        learningCheckpointIds={null}
        learningProgress={{ count: 0, total: 5, checkpointReady: false }}
      />
    );

    expect(screen.getByTestId('motion-lesson')).toBeInTheDocument();
    expect(screen.queryByTestId('talk-to-ai')).toBeNull();
    expect(screen.getByRole('button', { name: /Motion lab/i })).toBeInTheDocument();
  });
});
