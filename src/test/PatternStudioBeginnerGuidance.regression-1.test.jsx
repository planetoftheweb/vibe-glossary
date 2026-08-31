import { render, screen } from '@testing-library/react';
import PatternStudioFrame from '../components/demos/PatternStudioFrame';

const data = {
  title: 'Modal (Dialog)',
  definition: 'A focused decision on top of the page.',
  prompt: {
    options: [
      { id: 'blur', label: 'Blur', text: ' with a backdrop-blur effect' },
      { id: 'trap', label: 'Focus Trap', text: ' ensuring focus remains trapped within' },
    ],
  },
};

describe('beginner guidance in every pattern studio', () => {
  it('starts with a concrete action and an observable result', () => {
    render(
      <PatternStudioFrame demoId="modal" data={data} activeOptions={new Set()} onOptionToggle={vi.fn()}>
        <button type="button">Open Modal</button>
      </PatternStudioFrame>,
    );

    expect(screen.getByText('Try this')).toBeInTheDocument();
    expect(screen.getByText('Start with Blur.')).toBeInTheDocument();
    expect(screen.getByText(/Select the \+ button next to Blur/)).toBeInTheDocument();
    expect(screen.getAllByText(/page behind the pattern becomes softly blurred/i)).toHaveLength(2);
    expect(screen.getByText('Keyboard focus stays inside the open pattern until it closes.')).toBeInTheDocument();
  });

  it('explains the visible consequence after a choice is enabled', () => {
    render(
      <PatternStudioFrame demoId="modal" data={data} activeOptions={new Set(['trap'])} onOptionToggle={vi.fn()}>
        <button type="button">Open Modal</button>
      </PatternStudioFrame>,
    );

    expect(screen.getByText('What changed')).toBeInTheDocument();
    expect(screen.getByText('You turned on Focus Trap.')).toBeInTheDocument();
    expect(screen.getByText(/Now use the live example/)).toBeInTheDocument();
    expect(screen.getByText(/Turn the choice off and repeat to compare/)).toBeInTheDocument();
  });
});
