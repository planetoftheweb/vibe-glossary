import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProofView from '../components/learn/ProofView';

vi.mock('../lib/proof', () => ({
  classBar: () => ({ met: true, reasons: ['Reached Tinkerer'] }),
  buildProofSnapshot: ({ score, level, badges }) => ({
    s: score, l: level, b: [...(badges || [])], d: Date.now(),
  }),
  buildProofUrl: () => 'https://vibe-glossary.web.app/#proof=abc',
  buildProofText: () => 'My proof text',
  CLASS_BAR_POINTS: 200,
  CLASS_PATH_ID: 'vibe-prompting-ui',
}));

vi.mock('../lib/share', () => ({
  copyToClipboard: vi.fn().mockResolvedValue(true),
}));

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  score: { total: 250 },
  level: 'tinkerer',
  badges: new Set(['badge-1']),
  proofSnapshot: null,
};

describe('ProofView', () => {
  it('does not render Share on social or ShareAchievement', () => {
    render(<ProofView {...defaultProps} />);
    expect(screen.queryByText(/share on social/i)).toBeNull();
    expect(screen.queryByText(/share what you learned/i)).toBeNull();
    expect(screen.queryByLabelText(/share/i)).toBeNull();
  });

  it('renders Copy proof link button', () => {
    render(<ProofView {...defaultProps} />);
    expect(screen.getByText(/copy proof link/i)).toBeInTheDocument();
  });

  it('renders Copy proof text for Canvas button', () => {
    render(<ProofView {...defaultProps} />);
    expect(screen.getByText(/copy proof text for canvas/i)).toBeInTheDocument();
  });

  it('renders exactly one close button', () => {
    render(<ProofView {...defaultProps} />);
    const closeButtons = screen.getAllByLabelText(/close/i);
    expect(closeButtons).toHaveLength(1);
  });

  it('does not render when isOpen is false', () => {
    const { container } = render(<ProofView {...defaultProps} isOpen={false} />);
    expect(container.innerHTML).toBe('');
  });
});
