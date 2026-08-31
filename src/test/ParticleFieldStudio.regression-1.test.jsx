import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MotionPatternDemo, { PARTICLE_FIELD_COUNT } from '../components/demos/MotionPatternDemo';

function mockReducedMotion(reduce) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: String(query).includes('prefers-reduced-motion') && reduce,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }));
}

describe('Particle Field studio', () => {
  beforeEach(() => mockReducedMotion(false));

  it('turns density and formation into visible experiments without moving the content layer', async () => {
    const user = userEvent.setup();
    render(<MotionPatternDemo demoId="particlefield" />);

    const lab = document.querySelector('[data-particle-lab]');
    expect(lab).toHaveAttribute('data-formation', 'nebula');
    expect(lab).toHaveAttribute('data-density', 'balanced');
    expect(document.querySelectorAll('[data-particle-dot]')).toHaveLength(PARTICLE_FIELD_COUNT);
    expect(document.querySelectorAll('[data-particle-active="true"]')).toHaveLength(64);

    await user.click(screen.getByRole('button', { name: 'V mark' }));
    await user.click(screen.getByRole('button', { name: 'Immersive' }));

    expect(lab).toHaveAttribute('data-formation', 'v-mark');
    expect(lab).toHaveAttribute('data-density', 'immersive');
    expect(document.querySelectorAll('[data-particle-active="true"]')).toHaveLength(PARTICLE_FIELD_COUNT);
    expect(screen.getByText('96 points · V mark')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Hide particles' }));
    expect(lab).toHaveAttribute('data-field-visible', 'false');
    expect(screen.getByText('Decoration off · content intact')).toBeInTheDocument();
    expect(screen.getByText('The page still reads')).toBeInTheDocument();
  });

  it('starts paused and disables playback when the system requests reduced motion', () => {
    mockReducedMotion(true);
    render(<MotionPatternDemo demoId="particlefield" />);

    expect(document.querySelector('[data-particle-lab]')).toHaveAttribute('data-motion', 'paused');
    expect(screen.getByRole('button', { name: 'Motion reduced by system preference' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Hide particles' })).toBeEnabled();
  });
});
