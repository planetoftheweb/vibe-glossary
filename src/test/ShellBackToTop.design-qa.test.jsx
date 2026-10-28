import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { createRef } from 'react';
import ShellBackToTop from '../components/layout/ShellBackToTop';

const mockMatch = (matches) => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches, media: query, addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {},
  }));
};

function setup(phone) {
  mockMatch(phone);
  const shell = document.createElement('div');
  shell.scrollTo = vi.fn(({ top }) => { shell.scrollTop = top; });
  document.body.appendChild(shell);
  const ref = createRef();
  ref.current = shell;
  render(<ShellBackToTop shellRef={ref} />);
  return shell;
}

describe('#137 back-to-top control', () => {
  afterEach(() => { document.body.innerHTML = ''; });

  it('stays hidden until the crumb row has scrolled away, then returns to the top', () => {
    const shell = setup(true);
    expect(screen.queryByTestId('shell-back-to-top')).toBeNull();
    act(() => { shell.scrollTop = 500; fireEvent.scroll(shell); });
    const btn = screen.getByTestId('shell-back-to-top');
    expect(btn).toHaveAttribute('aria-label', 'Back to topic navigation');
    expect(btn.className).toMatch(/min-h-\[44px\]/);
    fireEvent.click(btn);
    expect(shell.scrollTo).toHaveBeenCalledWith({ top: 0 });
  });

  it('never shows from sm up, where the crumb row is pinned', () => {
    const shell = setup(false);
    act(() => { shell.scrollTop = 500; fireEvent.scroll(shell); });
    expect(screen.queryByTestId('shell-back-to-top')).toBeNull();
  });
});
