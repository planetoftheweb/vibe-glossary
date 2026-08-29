import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MotionPatternDemo, {
  EASING_TRAVELERS,
  STAGGER_TRAVEL_PX,
  STAGGER_DURATION_MS,
  STAGGER_STEP_MS,
  commitStartThenPlay,
  CONFETTI_COUNT,
  CONFETTI_SIZE_PX,
  CONFETTI_SPREAD_PX,
  CONFETTI_FLY_MS,
  CONFETTI_FADE_DELAY_MS,
  CONFETTI_FADE_MS,
} from '../components/demos/MotionPatternDemo';

function mockMotion(reduce) {
  let matchesReduce = !!reduce;
  const listeners = new Set();
  window.matchMedia = vi.fn().mockImplementation((query) => {
    const isReduceQuery = String(query).includes('prefers-reduced-motion');
    return {
      get matches() {
        return isReduceQuery && matchesReduce;
      },
      media: query,
      addEventListener: (event, cb) => {
        if (event === 'change') listeners.add(cb);
      },
      removeEventListener: (event, cb) => {
        if (event === 'change') listeners.delete(cb);
      },
      addListener: (cb) => listeners.add(cb),
      removeListener: (cb) => listeners.delete(cb),
    };
  });
  return {
    setReduce(next) {
      matchesReduce = !!next;
      listeners.forEach((cb) => cb({ matches: matchesReduce }));
    },
  };
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
    expect([...rows].map((r) => r.getAttribute('data-stagger-delay'))).toEqual(['0ms', '200ms', '400ms']);
    expect(new Set([...rows].map((r) => r.getAttribute('data-stagger-delay'))).size).toBe(3);
    expect(document.querySelector('[data-stagger-mode="stagger"]')).toBeTruthy();
    expect(screen.getByText(/Inbox slides 80px first/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Play all at once/i }));
    expect([...document.querySelectorAll('[data-stagger-row]')].every((r) => r.getAttribute('data-stagger-delay') === '0ms')).toBe(true);
    expect(screen.getByRole('button', { name: /Replay stagger/i })).toBeInTheDocument();
  });

  it('#34 stagger travel is a large measurable px slide, list stays visible', () => {
    expect(STAGGER_TRAVEL_PX).toBeGreaterThanOrEqual(24);
    expect(STAGGER_DURATION_MS).toBeGreaterThanOrEqual(700);
    expect(STAGGER_STEP_MS).toBeGreaterThanOrEqual(150);
    render(<MotionPatternDemo demoId="stagger" />);
    expect(screen.getByText('Inbox')).toBeVisible();
    expect(screen.getByText('Drafts')).toBeVisible();
    expect(screen.getByText('Sent')).toBeVisible();
    const movers = document.querySelectorAll('[data-stagger-mover]');
    expect(movers).toHaveLength(3);
    movers.forEach((el) => {
      const travel = Number(el.getAttribute('data-stagger-travel'));
      expect(travel).toBeGreaterThanOrEqual(24);
      expect(travel).toBe(STAGGER_TRAVEL_PX);
      expect(el.style.opacity).toBe('1');
      expect(el.style.transform).toMatch(/translateX\((\d+)px\)/);
      const px = Number(el.style.transform.match(/translateX\((\d+)px\)/)[1]);
      expect(px === 0 || px >= 24).toBe(true);
      expect(el.getAttribute('data-stagger-from')).toBe(`translateX(${STAGGER_TRAVEL_PX}px)`);
      expect(el.getAttribute('data-stagger-to')).toBe('translateX(0px)');
      expect(el.style.transitionDuration).toBe(`${STAGGER_DURATION_MS}ms`);
    });
  });

  it('#34 Replay applies start translate before end', async () => {
    const pending = [];
    const origRaf = window.requestAnimationFrame;
    window.requestAnimationFrame = (cb) => {
      pending.push(cb);
      return pending.length;
    };

    try {
      render(<MotionPatternDemo demoId="stagger" />);
      const movers = () => [...document.querySelectorAll('[data-stagger-mover]')];
      movers().forEach((el) => {
        expect(el.style.transform).toBe(`translateX(${STAGGER_TRAVEL_PX}px)`);
        expect(el.getAttribute('data-stagger-phase')).toBe('start');
        expect(el.style.transitionProperty).toBe('none');
      });

      await act(async () => {
        const first = pending.splice(0);
        first.forEach((cb) => cb(0));
      });
      await act(async () => {
        const second = pending.splice(0);
        second.forEach((cb) => cb(0));
      });

      movers().forEach((el) => {
        expect(el.style.transform).toBe('translateX(0px)');
        expect(el.getAttribute('data-stagger-phase')).toBe('end');
        expect(el.style.transitionProperty).toBe('transform');
      });

      fireEvent.click(screen.getByRole('button', { name: /Replay stagger/i }));
      movers().forEach((el) => {
        expect(el.style.transform).toBe(`translateX(${STAGGER_TRAVEL_PX}px)`);
        expect(el.getAttribute('data-stagger-phase')).toBe('start');
        expect(el.style.transitionProperty).toBe('none');
      });
    } finally {
      window.requestAnimationFrame = origRaf;
    }
  });

  it('#34 stagger delays are at least 150ms apart on the stagger path', () => {
    expect(STAGGER_STEP_MS).toBeGreaterThanOrEqual(150);
    expect(STAGGER_DURATION_MS).toBeGreaterThanOrEqual(800);
    render(<MotionPatternDemo demoId="stagger" />);
    const delays = [...document.querySelectorAll('[data-stagger-row]')].map((r) =>
      parseInt(r.getAttribute('data-stagger-delay'), 10),
    );
    expect(delays).toEqual([0, STAGGER_STEP_MS, STAGGER_STEP_MS * 2]);
    expect(delays[1] - delays[0]).toBeGreaterThanOrEqual(150);
    expect(delays[2] - delays[1]).toBeGreaterThanOrEqual(150);
    const teach = document.querySelector('[data-stagger-teach]');
    expect(teach.className).toMatch(/break-words/);
    expect(teach.className).not.toMatch(/truncate|whitespace-nowrap/);
  });

  it('#34 commitStartThenPlay paints start before end', () => {
    const phases = [];
    const pending = [];
    const origRaf = window.requestAnimationFrame;
    window.requestAnimationFrame = (cb) => {
      pending.push(cb);
      return pending.length;
    };
    try {
      commitStartThenPlay((p) => phases.push(p), null);
      expect(phases).toEqual(['start']);
      pending.shift()(0);
      expect(phases).toEqual(['start']);
      pending.shift()(0);
      expect(phases).toEqual(['start', 'end']);
    } finally {
      window.requestAnimationFrame = origRaf;
    }
  });

  it('#44 reduce-on Replay skips the 80px/900ms cascade and keeps rows visible', () => {
    mockMotion(true);
    render(<MotionPatternDemo demoId="stagger" />);
    expect(screen.getByText('Inbox')).toBeVisible();
    expect(screen.getByText('Drafts')).toBeVisible();
    expect(screen.getByText('Sent')).toBeVisible();
    const movers = () => [...document.querySelectorAll('[data-stagger-mover]')];
    movers().forEach((el) => {
      expect(el.style.opacity).toBe('1');
      expect(el.style.transform).toBe('translateX(0px)');
      expect(el.style.transitionDuration).toBe('0ms');
      expect(el.getAttribute('data-stagger-phase')).toBe('end');
    });
    expect([...document.querySelectorAll('[data-stagger-row]')].map((r) => r.getAttribute('data-stagger-delay'))).toEqual(['0ms', '0ms', '0ms']);

    fireEvent.click(screen.getByRole('button', { name: /Replay stagger/i }));

    movers().forEach((el) => {
      expect(el.style.transform).toBe('translateX(0px)');
      expect(el.style.transform).not.toBe(`translateX(${STAGGER_TRAVEL_PX}px)`);
      expect(el.style.transitionDuration).toBe('0ms');
      expect(el.style.transitionDuration).not.toBe(`${STAGGER_DURATION_MS}ms`);
      expect(el.style.opacity).toBe('1');
      expect(el.getAttribute('data-stagger-phase')).toBe('end');
    });
    expect([...document.querySelectorAll('[data-stagger-row]')].map((r) => r.getAttribute('data-stagger-delay'))).toEqual(['0ms', '0ms', '0ms']);
  });

  it('#44 Replay re-reads matchMedia so a late reduce skips the cascade', async () => {
    const pending = [];
    const origRaf = window.requestAnimationFrame;
    window.requestAnimationFrame = (cb) => {
      pending.push(cb);
      return pending.length;
    };
    try {
      const media = mockMotion(false);
      render(<MotionPatternDemo demoId="stagger" />);
      await act(async () => {
        pending.splice(0).forEach((cb) => cb(0));
      });
      await act(async () => {
        pending.splice(0).forEach((cb) => cb(0));
      });

      await act(async () => {
        media.setReduce(true);
      });

      fireEvent.click(screen.getByRole('button', { name: /Replay stagger/i }));

      const movers = [...document.querySelectorAll('[data-stagger-mover]')];
      movers.forEach((el) => {
        expect(el.style.transform).toBe('translateX(0px)');
        expect(el.style.transitionDuration).toBe('0ms');
        expect(el.style.opacity).toBe('1');
        expect(el.getAttribute('data-stagger-phase')).toBe('end');
      });
      expect([...document.querySelectorAll('[data-stagger-row]')].map((r) => r.getAttribute('data-stagger-delay'))).toEqual(['0ms', '0ms', '0ms']);
      // Replay must not have queued the start-then-play cascade.
      expect(pending.length).toBe(0);
    } finally {
      window.requestAnimationFrame = origRaf;
    }
  });

  it('#44 reduce-off cascade is unchanged: 80px, 900ms, 200ms steps', () => {
    mockMotion(false);
    expect(STAGGER_TRAVEL_PX).toBe(80);
    expect(STAGGER_DURATION_MS).toBe(900);
    expect(STAGGER_STEP_MS).toBe(200);
    render(<MotionPatternDemo demoId="stagger" />);
    const movers = document.querySelectorAll('[data-stagger-mover]');
    expect(movers).toHaveLength(3);
    movers.forEach((el) => {
      expect(el.getAttribute('data-stagger-from')).toBe('translateX(80px)');
      expect(el.getAttribute('data-stagger-to')).toBe('translateX(0px)');
      expect(el.style.transitionDuration).toBe('900ms');
      expect(el.style.opacity).toBe('1');
    });
    expect([...document.querySelectorAll('[data-stagger-row]')].map((r) => r.getAttribute('data-stagger-delay'))).toEqual(['0ms', '200ms', '400ms']);
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
    expect(document.querySelectorAll('[data-confetti-bit]').length).toBe(CONFETTI_COUNT);
    const burstColors = new Set([...document.querySelectorAll('[data-confetti-color]')].map((el) => el.getAttribute('data-confetti-color')));
    expect(burstColors.size).toBeGreaterThanOrEqual(4);
    expect(screen.getByRole('button', { name: /Replay confetti/i })).toBeInTheDocument();
    expect(screen.getByText(/Fires once on a real win/i)).toBeInTheDocument();
  });

  it('#35 confetti pieces are large, wide, and stay on screen', async () => {
    const user = userEvent.setup();
    expect(CONFETTI_COUNT).toBeGreaterThanOrEqual(20);
    expect(CONFETTI_SIZE_PX).toBeGreaterThanOrEqual(16);
    expect(CONFETTI_SPREAD_PX).toBeGreaterThanOrEqual(120);
    expect(CONFETTI_FLY_MS).toBeGreaterThanOrEqual(1600);
    expect(CONFETTI_FADE_DELAY_MS).toBeGreaterThanOrEqual(1000);
    expect(CONFETTI_FADE_MS).toBeGreaterThanOrEqual(400);
    render(<MotionPatternDemo demoId="confetti" />);
    await user.click(screen.getByRole('button', { name: 'Complete order' }));
    const stage = document.querySelector('[data-confetti-stage]');
    expect(Number(stage.getAttribute('data-confetti-spread'))).toBeGreaterThanOrEqual(120);
    expect(Number(stage.getAttribute('data-confetti-count'))).toBe(CONFETTI_COUNT);
    const bits = [...document.querySelectorAll('[data-confetti-bit]')];
    expect(bits.length).toBeGreaterThanOrEqual(20);
    bits.forEach((el) => {
      expect(Number(el.getAttribute('data-confetti-size'))).toBeGreaterThanOrEqual(16);
      expect(parseInt(el.style.width, 10)).toBeGreaterThanOrEqual(16);
      expect(Number(el.getAttribute('data-confetti-duration'))).toBeGreaterThanOrEqual(1600);
      expect(el.style.transition).toMatch(/1600ms/);
    });
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
