import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LearningCheckpointModal from '../components/learn/LearningCheckpointModal';

const items = [
  { id: 'modal', title: 'Modal', definition: 'A blocking dialog above the page.' },
  { id: 'drawer', title: 'Drawer', definition: 'A panel that slides from an edge.' },
  { id: 'popover', title: 'Popover', definition: 'A small panel anchored to a trigger.' },
  { id: 'tooltip', title: 'Tooltip', definition: 'A short label that explains a control.' },
  { id: 'toast', title: 'Toast', definition: 'A temporary feedback message.' },
];

function renderModal(onSkip = vi.fn()) {
  render(
    <LearningCheckpointModal
      items={items}
      questionPool={items}
      onSkip={onSkip}
    />
  );
  return onSkip;
}

describe('LearningCheckpointModal', () => {
  it('renders the checkpoint as a modal and moves focus inside', async () => {
    renderModal();

    expect(screen.getByRole('dialog', { name: 'Five-item learning checkpoint' }))
      .toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Skip checkpoint for now' }))
        .toHaveFocus();
    });
  });

  it.each(['Escape', 'ArrowRight'])('skips when %s is pressed', (key) => {
    const onSkip = renderModal();

    fireEvent.keyDown(window, { key });

    expect(onSkip).toHaveBeenCalledTimes(1);
  });
});
