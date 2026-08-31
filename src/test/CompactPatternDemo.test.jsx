import { render, screen } from '@testing-library/react';
import CompactPatternDemo from '../components/demos/CompactPatternDemo';

vi.mock('../hooks/useGlossary', () => ({
  useGlossary: () => ({ hovercard: { title: 'Hover Card' } }),
}));

describe('CompactPatternDemo hover card', () => {
  it('centers a clear hover instruction in the preview', () => {
    render(<CompactPatternDemo demoId="hovercard" activeOptions={new Set()} />);

    expect(screen.getByRole('button', { name: 'Hover over this text to show the card' })).toBeInTheDocument();
    expect(document.querySelector('[data-preview-alignment="center"]')).toHaveClass(
      'min-h-full',
      'items-center',
      'justify-center',
    );
  });

  it('adds keyboard guidance when the Focus option is selected', () => {
    render(<CompactPatternDemo demoId="hovercard" activeOptions={new Set(['opt2'])} />);

    expect(screen.getByRole('button', { name: 'Hover over or focus this text to show the card' })).toBeInTheDocument();
  });
});
