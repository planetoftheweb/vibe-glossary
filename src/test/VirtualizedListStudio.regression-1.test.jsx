import { fireEvent, render, screen } from '@testing-library/react';
import CompactPatternDemo from '../components/demos/CompactPatternDemo';

const data = {
  title: 'Virtualized List',
  definition: 'Only build the rows visible on screen.',
  comparison: 'Use a normal list for smaller datasets.',
  vibeTip: 'Name the row size and overscan.',
  prompt: {
    options: [
      { id: 'opt1', label: 'Dynamic height', text: ', supporting variable row heights with measurement' },
      { id: 'opt2', label: 'Sticky header', text: ', pairing with a sticky column header' },
      { id: 'opt3', label: 'Overscan', text: ', tuning overscan count for smoother fast scroll' },
    ],
  },
};

vi.mock('../hooks/useGlossary', () => ({
  useGlossary: () => ({ virtuallist: data }),
}));

describe('Virtualized list glossary studio', () => {
  it('turns the preview into a full-size 10,000-row workload window', () => {
    render(<CompactPatternDemo demoId="virtuallist" activeOptions={new Set()} />);

    const lab = document.querySelector('[data-virtual-list-lab]');
    const rendered = Number(lab.getAttribute('data-rendered-rows'));

    expect(lab).toHaveAttribute('data-total-rows', '10000');
    expect(rendered).toBeGreaterThan(5);
    expect(rendered).toBeLessThan(50);
    expect(document.querySelectorAll('[data-virtual-row]')).toHaveLength(rendered);
    expect(document.querySelector('.pattern-studio__demo')).toHaveClass('pattern-studio__demo--fill');
    expect(screen.getByText('10,000 deployment records')).toBeInTheDocument();
    expect(screen.getByText('Browser draws this window')).toBeInTheDocument();
  });

  it('makes dynamic height, sticky header, and overscan visible in the scene', () => {
    const { rerender } = render(<CompactPatternDemo demoId="virtuallist" activeOptions={new Set()} />);
    const baseRendered = Number(document.querySelector('[data-virtual-list-lab]').getAttribute('data-rendered-rows'));

    rerender(
      <CompactPatternDemo
        demoId="virtuallist"
        activeOptions={new Set(['opt1', 'opt2', 'opt3'])}
      />,
    );

    const lab = document.querySelector('[data-virtual-list-lab]');
    expect(lab).toHaveAttribute('data-row-model', 'variable');
    expect(document.querySelector('.virtual-list-lab__columns')).toHaveAttribute('data-sticky', 'true');
    expect(screen.getByText('Measured')).toBeInTheDocument();
    expect(screen.getByText('Pinned')).toBeInTheDocument();
    expect(screen.getByText('10 rows')).toBeInTheDocument();
    expect(Number(lab.getAttribute('data-rendered-rows'))).toBeGreaterThan(baseRendered);
  });

  it('swaps the rendered row window as the user scrolls', () => {
    render(<CompactPatternDemo demoId="virtuallist" activeOptions={new Set()} />);

    const viewport = screen.getByRole('region', { name: /Virtualized list of 10,000 deployment records/i });
    Object.defineProperty(viewport, 'scrollTop', { configurable: true, value: 3600, writable: true });
    fireEvent.scroll(viewport);

    const firstRendered = Number(document.querySelector('[data-virtual-row]').getAttribute('data-virtual-row'));
    expect(firstRendered).toBeGreaterThan(0);
    expect(screen.queryByText('#0001')).not.toBeInTheDocument();
    expect(screen.getByText(/Rows \d+–\d+ of 10,000/)).toBeInTheDocument();
  });
});
