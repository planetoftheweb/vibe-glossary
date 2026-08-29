import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MotionPatternDemo, { EASING_TRAVELERS } from '../components/demos/MotionPatternDemo';

function mockMotion(reduce) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: reduce && String(query).includes('prefers-reduced-motion'),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }));
}

beforeEach(() => {
  mockMotion(false);
});

describe('#24 easing travelers teach real curves', () => {
  it('renders three travelers with distinct CSS timings and a Replay control', () => {
    render(<MotionPatternDemo demoId="easing" />);
    const travelers = document.querySelectorAll('[data-easing]');
    expect(travelers).toHaveLength(3);
    const timings = [...travelers].map((el) => el.getAttribute('data-timing'));
    expect(timings).toEqual(['ease-out', 'ease-in', 'linear']);
    expect(new Set(timings).size).toBe(3);
    expect(EASING_TRAVELERS.map((t) => t.timing)).toEqual(['ease-out', 'ease-in', 'linear']);
    travelers.forEach((el) => {
      expect(el.className).not.toMatch(/vg-bob/);
      expect(el.style.transitionTimingFunction).toBe(el.getAttribute('data-timing'));
    });
    expect(screen.getByRole('button', { name: /Replay easing compare/i })).toBeInTheDocument();
    expect(screen.getByText(/Ease-out gets there fast then settles/i)).toBeInTheDocument();
  });

  it('uses 0ms duration when the OS asks for reduced motion', () => {
    mockMotion(true);
    render(<MotionPatternDemo demoId="easing" />);
    document.querySelectorAll('[data-easing]').forEach((el) => {
      expect(el.getAttribute('data-duration-ms')).toBe('0');
    });
  });
});

describe('#25 motion pattern previews are real', () => {
  it('Particle Field has page copy and a toggle', () => {
    render(<MotionPatternDemo demoId="particlefield" />);
    expect(screen.getByText('The page still reads')).toBeInTheDocument();
    expect(document.querySelectorAll('[data-particle-dot]').length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /Hide particles/i })).toBeInTheDocument();
  });

  it('Parallax exposes three labeled speeds in a scroll viewport', () => {
    render(<MotionPatternDemo demoId="parallax" />);
    expect(document.querySelector('[data-parallax-scroller]')).toBeTruthy();
    expect(document.querySelector('[data-parallax-speed="0.2"]')).toBeTruthy();
    expect(document.querySelector('[data-parallax-speed="0.6"]')).toBeTruthy();
    expect(document.querySelector('[data-parallax-speed="1"]')).toBeTruthy();
  });

  it('Stagger prints delays and can switch to all-at-once', async () => {
    const user = userEvent.setup();
    render(<MotionPatternDemo demoId="stagger" />);
    const rows = document.querySelectorAll('[data-stagger-row]');
    expect(rows).toHaveLength(3);
    expect([...rows].map((r) => r.getAttribute('data-stagger-delay'))).toEqual(['0ms', '50ms', '100ms']);
    expect(new Set([...rows].map((r) => r.getAttribute('data-stagger-delay'))).size).toBe(3);
    expect(document.querySelector('[data-stagger-mode="stagger"]')).toBeTruthy();
    expect(screen.getByText(/Inbox moves first/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Play all at once/i }));
    expect([...document.querySelectorAll('[data-stagger-row]')].every((r) => r.getAttribute('data-stagger-delay') === '0ms')).toBe(true);
    expect(screen.getByRole('button', { name: /Replay stagger/i })).toBeInTheDocument();
  });

  it('Scroll Reveal is its own scroll panel with Reset', () => {
    render(<MotionPatternDemo demoId="scrollreveal" />);
    expect(document.querySelector('[data-scroll-reveal]')).toBeTruthy();
    expect(screen.getByText(/Cards rise as they cross this line/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset scroll reveal/i })).toBeInTheDocument();
    expect(document.querySelectorAll('[data-reveal-card]').length).toBe(4);
  });

  it('Reduced Motion shows motion-on and reduced panels', () => {
    render(<MotionPatternDemo demoId="reducedmotion" />);
    expect(document.querySelector('[data-motion-panel="motion"]')).toBeTruthy();
    expect(document.querySelector('[data-motion-panel="reduced"]')).toBeTruthy();
    expect(screen.getByText(/Do not just shorten the same loop/i)).toBeInTheDocument();
  });

  it('Page Transition has List to Detail with Navigate and Replay', async () => {
    const user = userEvent.setup();
    render(<MotionPatternDemo demoId="pagetransition" />);
    expect(document.querySelector('[data-page-screen="list"]')).toBeTruthy();
    expect(document.querySelector('[data-page-ms]').getAttribute('data-page-ms')).toBe('200');
    await user.click(screen.getByRole('button', { name: /Navigate to detail/i }));
    expect(await screen.findByText(/200ms is enough/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Replay page transition/i })).toBeInTheDocument();
  });

  it('Spring compares ease-out and spring against a target line', () => {
    render(<MotionPatternDemo demoId="spring" />);
    expect(document.querySelector('[data-target-line]')).toBeTruthy();
    const ease = document.querySelector('[data-spring="ease-out"]');
    const spring = document.querySelector('[data-spring="spring"]');
    expect(ease.getAttribute('data-timing')).toBe('ease-out');
    expect(spring.getAttribute('data-timing')).toMatch(/cubic-bezier/);
    expect(ease.getAttribute('data-timing')).not.toBe(spring.getAttribute('data-timing'));
    expect(screen.getByRole('button', { name: /Replay spring compare/i })).toBeInTheDocument();
  });

  it('Confetti fires once on Complete order and shows a toast', async () => {
    const user = userEvent.setup();
    render(<MotionPatternDemo demoId="confetti" />);
    expect(screen.queryByText('Order complete')).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Complete order' }));
    expect(screen.getByText('Order complete')).toBeInTheDocument();
    expect(document.querySelectorAll('[data-confetti-bit]').length).toBeGreaterThanOrEqual(24);
    const burstColors = new Set([...document.querySelectorAll('[data-confetti-color]')].map((el) => el.getAttribute('data-confetti-color')));
    expect(burstColors.size).toBeGreaterThanOrEqual(4);
    expect(screen.getByRole('button', { name: /Replay confetti/i })).toBeInTheDocument();
    expect(screen.getByText(/Fires once on a real win/i)).toBeInTheDocument();
  });

  it('Hover Micro still lifts on hover', () => {
    render(<MotionPatternDemo demoId="hovermicro" />);
    const btn = screen.getByRole('button', { name: 'Save draft' });
    expect(btn.className).toMatch(/duration-150/);
    expect(btn.className).toMatch(/ease-out/);
  });

  it('Reduced Motion OS path keeps the reduced toast instant', () => {
    mockMotion(true);
    render(<MotionPatternDemo demoId="reducedmotion" />);
    expect(screen.getByText(/Your OS asked for reduced motion/i)).toBeInTheDocument();
    const motion = document.querySelector('[data-motion-panel="motion"]');
    expect(motion.style.transition).toBe('none');
  });

  it('user-facing demo copy has no em dashes or native title=', () => {
    ['easing', 'particlefield', 'parallax', 'stagger', 'scrollreveal', 'reducedmotion', 'pagetransition', 'spring', 'confetti'].forEach((id) => {
      const { unmount, container } = render(<MotionPatternDemo demoId={id} />);
      expect(container.textContent, id).not.toMatch(/\u2014/);
      expect(container.querySelector('[title]'), id).toBeNull();
      unmount();
    });
  });
});
