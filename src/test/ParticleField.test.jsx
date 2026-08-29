import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { ParticleField } from '../components/ParticleField';

describe('ParticleField', () => {
  const originalGetContext = HTMLCanvasElement.prototype.getContext;
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    HTMLCanvasElement.prototype.getContext = originalGetContext;
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
  });

  it('does not throw when WebGL is missing', () => {
    HTMLCanvasElement.prototype.getContext = vi.fn(() => null);
    expect(() => render(<ParticleField scrollerRef={{ current: null }} />)).not.toThrow();
  });

  it('marks a present canvas as aria-hidden, and allows a null render when there is no WebGL', () => {
    HTMLCanvasElement.prototype.getContext = vi.fn(() => null);
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));
    const { container } = render(<ParticleField scrollerRef={{ current: null }} />);
    const canvas = container.querySelector('canvas');
    if (canvas) {
      expect(canvas.getAttribute('aria-hidden')).toBe('true');
    }
  });

  it('renders no canvas when the user prefers reduced motion', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: String(query).includes('prefers-reduced-motion'),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));
    const { container } = render(<ParticleField scrollerRef={{ current: null }} />);
    expect(container.querySelector('canvas')).toBeNull();
  });
});
