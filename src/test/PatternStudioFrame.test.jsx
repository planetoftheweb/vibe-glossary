import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PatternStudioFrame from '../components/demos/PatternStudioFrame';

const data = {
  title: 'Modal (Dialog)',
  definition: 'A focused decision on top of the page.',
  comparison: 'A modal blocks the page. A popover does not.',
  vibeTip: 'Name how it opens and closes.',
  prompt: {
    options: [
      { id: 'blur', label: 'Blur', text: ', with a blurred backdrop' },
      { id: 'focus', label: 'Focus trap', text: ', keeping focus inside the dialog' },
      { id: 'anim', label: 'Animation', text: ', with a smooth entrance' },
    ],
  },
};

describe('PatternStudioFrame', () => {
  it('turns spec options into a live three-part control deck', async () => {
    const user = userEvent.setup();
    const onOptionToggle = vi.fn();

    render(
      <PatternStudioFrame
        demoId="modal"
        data={data}
        activeOptions={new Set()}
        onOptionToggle={onOptionToggle}
      >
        <button type="button">Open Modal</button>
      </PatternStudioFrame>,
    );

    expect(screen.getByText('Pause the page. Focus the decision.')).toBeInTheDocument();
    expect(document.querySelector('.vg-studio__intro')).toBeNull();
    expect(screen.getByText('Use it when')).toBeInTheDocument();
    expect(screen.getByText('Make sure')).toBeInTheDocument();
    expect(screen.getByText('Live Modal (Dialog)')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Add to the scene/i })).toHaveLength(3);

    await user.click(screen.getAllByRole('button', { name: /Add to the scene/i })[0]);
    expect(onOptionToggle).toHaveBeenCalledWith('blur');
  });

  it('shows the live state and offers one reset for selected choices', async () => {
    const user = userEvent.setup();
    const onOptionToggle = vi.fn();

    render(
      <PatternStudioFrame
        demoId="modal"
        data={data}
        activeOptions={new Set(['blur'])}
        onOptionToggle={onOptionToggle}
      >
        <button type="button">Open Modal</button>
      </PatternStudioFrame>,
    );

    expect(screen.getByRole('button', { name: /Showing in the scene/i })).toHaveAttribute('aria-pressed', 'true');
    await user.click(screen.getByRole('button', { name: /Reset scene/i }));
    expect(onOptionToggle).toHaveBeenCalledWith('blur');
  });
});
