import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import HoverTip from '../components/ui/HoverTip';
import TopicTierBadge from '../components/learn/TopicTierBadge';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('#137 HoverTip viewport bounds', () => {
  it.each([320, 390])('clamps both edges at %ipx on mount, hover, focus, resize and text updates', (vw) => {
    vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(vw);
    let bounds = { left: vw === 390 ? 251 : 152, width: 271 };
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function () {
      const dx = Number.parseFloat(this.style.translate) || 0;
      return { left: bounds.left + dx, right: bounds.left + bounds.width + dx, width: bounds.width };
    });
    const control = (text) => (
      <button aria-label="Learning Mode" className="group relative min-h-[44px] min-w-[44px]">
        <HoverTip text={text} />
      </button>
    );
    const { rerender, unmount } = render(control('Turn off Learning Mode'));
    const tip = screen.getByRole('tooltip');
    const button = screen.getByRole('button', { name: 'Learning Mode' });
    const expectClamped = () => {
      const rect = tip.getBoundingClientRect();
      expect(rect.left).toBeGreaterThanOrEqual(8);
      expect(rect.right).toBeLessThanOrEqual(vw - 8);
    };
    expect(tip.style.translate).toBe(`${vw - 8 - bounds.left - bounds.width}px 0`);
    expectClamped();
    bounds = { left: -40, width: 160 };
    fireEvent.pointerEnter(button);
    expect(tip.style.translate).toBe('48px 0');
    expectClamped();
    bounds = { left: vw - 80, width: 200 };
    fireEvent.focusIn(button);
    expectClamped();
    bounds = { left: -20, width: 180 };
    fireEvent(window, new Event('resize'));
    expectClamped();
    bounds = { left: vw - 60, width: 270 };
    rerender(control('Complete its checkpoint question to reach Passed.'));
    expectClamped();
    expect(tip.className).toContain('whitespace-normal');
    expect(tip.className).toContain('max-w-[min(18rem,calc(100vw-2rem))]');
    expect(tip.className).not.toMatch(/truncate|whitespace-nowrap/);
    for (const token of ['pointer-events-none', 'group-hover:opacity-100', 'group-focus-visible:opacity-100']) {
      expect(tip.className).toContain(token);
    }
    expect(button.getAttribute('aria-label')).toBe('Learning Mode');
    unmount();
    const measure = vi.spyOn(tip, 'getBoundingClientRect').mockClear();
    fireEvent.pointerEnter(button);
    fireEvent.focusIn(button);
    fireEvent(window, new Event('resize'));
    expect(measure).not.toHaveBeenCalled();
  });

  it('keeps the tier control named, focusable and at least 44px in both dimensions', () => {
    render(<TopicTierBadge tier={{ visited: true }} />);
    const tip = screen.getByRole('tooltip');
    const control = tip.parentElement;
    expect(control.getAttribute('aria-label')).toBe('Visited. Copy a prompt to reach Used.');
    expect(control.tabIndex).toBe(0);
    expect(control.className).toContain('min-h-[44px]');
    expect(control.className).toContain('min-w-[44px]');
  });

  it('can hide and show without changing hook order', () => {
    const { rerender } = render(<HoverTip text="Tip" hidden />);
    expect(screen.queryByRole('tooltip')).toBeNull();
    rerender(<HoverTip text="Tip" />);
    expect(screen.getByRole('tooltip')).toBeTruthy();
    rerender(<HoverTip text="" />);
    expect(screen.queryByRole('tooltip')).toBeNull();
  });
});

describe('#141 and #142 contrast contracts', () => {
  const luminance = (hex) => {
    const channels = hex.match(/\w\w/g).map((part) => {
      const value = parseInt(part, 16) / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };

  it('sets both inactive section tabs to zinc 600 in light and zinc 400 in dark', () => {
    const nav = readFileSync(resolve('src/components/layout/TopNav.jsx'), 'utf8');
    for (const section of ['glossary', 'build']) {
      expect(nav).toContain(`siteSection === '${section}'\n                  ? 'bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white'\n                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'`);
    }
  });

  it('sets the minimized HUD of label to zinc 400', () => {
    const hud = readFileSync(resolve('src/components/learn/FloatingLearningHud.jsx'), 'utf8');
    expect(hud).toContain('<span className="text-zinc-400">of</span>');
    expect(hud).not.toContain('<span className="text-zinc-500">of</span>');
  });

  it.each([
    ['52525b', 'f4f4f5'],
    ['a1a1aa', '18181b'],
    ['a1a1aa', '151517'],
    ['a1a1aa', '09090b'],
  ])('passes AA for #%s on #%s', (foreground, background) => {
    const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
    expect((values[0] + 0.05) / (values[1] + 0.05)).toBeGreaterThanOrEqual(4.5);
  });
});
