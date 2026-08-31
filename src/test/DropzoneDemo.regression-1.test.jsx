import { fireEvent, render, screen } from '@testing-library/react';
import DropzoneDemo from '../components/demos/inputs/DropzoneDemo';

describe('Dropzone live lesson', () => {
  it('accepts a real dropped file and reports what happened', () => {
    render(<DropzoneDemo activeOptions={new Set(['drag', 'preview'])} />);
    const dropTarget = screen.getByRole('button', { name: /Drag files here or click to browse/i });
    const file = new File(['report'], 'class-notes.pdf', { type: 'application/pdf' });

    fireEvent.dragEnter(dropTarget, { dataTransfer: { files: [file] } });
    expect(screen.getByRole('button', { name: /Drop the files here/i })).toBeInTheDocument();

    fireEvent.drop(dropTarget, { dataTransfer: { files: [file] } });

    expect(screen.getByText('class-notes.pdf')).toBeInTheDocument();
    expect(screen.getByText('1 file selected.')).toBeInTheDocument();
  });

  it('keeps click-to-browse available for people who cannot drag files', () => {
    render(<DropzoneDemo activeOptions={new Set()} />);

    expect(screen.getByLabelText('Choose files to upload')).toHaveAttribute('type', 'file');
    expect(screen.getByRole('button', { name: /click to browse/i })).toBeInTheDocument();
  });
});
