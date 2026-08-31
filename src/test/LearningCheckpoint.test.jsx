import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LearningCheckpoint from '../components/learn/LearningCheckpoint';

const items = [
  { id: 'modal', title: 'Modal', definition: 'A blocking dialog above the page.' },
  { id: 'drawer', title: 'Drawer', definition: 'A panel that slides from an edge.' },
  { id: 'popover', title: 'Popover', definition: 'A small panel anchored to a trigger.' },
  { id: 'tooltip', title: 'Tooltip', definition: 'A short label that explains a control.' },
  { id: 'toast', title: 'Toast', definition: 'A temporary feedback message.' },
];

const renderCheckpoint = (props = {}) => {
  const onRecordAttempt = vi.fn();
  const onComplete = vi.fn();
  const onQuizComplete = vi.fn();
  render(
    <LearningCheckpoint
      items={items}
      questionPool={items}
      onRecordAttempt={onRecordAttempt}
      onQuizComplete={onQuizComplete}
      onComplete={onComplete}
      {...props}
    />
  );
  return { onRecordAttempt, onQuizComplete, onComplete };
};

describe('LearningCheckpoint', () => {
  it('starts with all five items available for review', () => {
    renderCheckpoint();

    expect(screen.getByRole('heading', { name: 'You’ve explored five items. Nice.' }))
      .toBeInTheDocument();
    expect(screen.getByText(/Complete all five questions to add the points/i)).toBeInTheDocument();
    items.forEach((item) => expect(screen.getByText(item.title)).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Start the five-question quiz/i }))
      .toBeInTheDocument();
  });

  it('lets the learner return to review and resume the current question', async () => {
    const user = userEvent.setup();
    renderCheckpoint();

    await user.click(screen.getByRole('button', { name: /Start the five-question quiz/i }));
    expect(screen.getByText('Which description matches Modal?')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Review items/i }));
    expect(screen.getByRole('button', { name: /Return to question 1/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Return to question 1/i }));
    expect(screen.getByText('Which description matches Modal?')).toBeInTheDocument();
  });

  it('lets the learner skip without recording answers or completing the quiz', async () => {
    const user = userEvent.setup();
    const onSkip = vi.fn();
    const { onRecordAttempt, onQuizComplete, onComplete } = renderCheckpoint({ onSkip });

    await user.click(screen.getByRole('button', { name: 'Skip for now' }));

    expect(onSkip).toHaveBeenCalledTimes(1);
    expect(onRecordAttempt).not.toHaveBeenCalled();
    expect(onQuizComplete).not.toHaveBeenCalled();
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('awards all five scored answers only when the quiz is finished', async () => {
    const user = userEvent.setup();
    const { onRecordAttempt, onQuizComplete, onComplete } = renderCheckpoint();

    await user.click(screen.getByRole('button', { name: /Start the five-question quiz/i }));

    await user.click(screen.getByRole('button', { name: items[1].definition }));
    expect(onRecordAttempt).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: items[1].definition })).toBeDisabled();

    for (let index = 0; index < items.length; index += 1) {
      await user.click(screen.getByRole('button', { name: items[index].definition }));
      expect(onRecordAttempt).not.toHaveBeenCalled();

      await user.click(screen.getByRole('button', {
        name: index === items.length - 1 ? /Finish quiz/i : /Next question/i,
      }));
    }

    expect(screen.getByRole('heading', { name: 'Quiz complete' })).toBeInTheDocument();
    expect(onRecordAttempt).toHaveBeenCalledTimes(5);
    items.forEach((item, index) => {
      expect(onRecordAttempt).toHaveBeenNthCalledWith(
        index + 1,
        item.id,
        expect.objectContaining({ valid: true, correct: true })
      );
    });
    expect(onQuizComplete).toHaveBeenCalledWith({
      topicIds: items.map((item) => item.id),
      count: 5,
    });
    expect(onComplete).not.toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: /Continue learning/i }));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('keeps the current question wording stable when scoring updates attempts', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <LearningCheckpoint
        items={items}
        questionPool={items}
        attemptsByTopic={{}}
        onRecordAttempt={() => {}}
        onComplete={() => {}}
      />
    );

    await user.click(screen.getByRole('button', { name: /Start the five-question quiz/i }));
    expect(screen.getByText('Which description matches Modal?')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: items[0].definition }));
    rerender(
      <LearningCheckpoint
        items={items}
        questionPool={items}
        attemptsByTopic={{ modal: [{ correct: true, valid: true }] }}
        onRecordAttempt={() => {}}
        onComplete={() => {}}
      />
    );

    expect(screen.getByText('Which description matches Modal?')).toBeInTheDocument();
    expect(screen.queryByText('What does Modal do?')).toBeNull();
  });
});
