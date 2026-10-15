import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TalkToAiCard from '../components/learn/TalkToAiCard';
import ProgressRing from '../components/ui/ProgressRing';

const base = {
  clusterId: 'design-language',
  clusterTitle: 'Design language',
  summary: 'Summary.',
  comparison: 'Comparison.',
  vibeTip: 'Tip.',
  mnemonic: 'Mnemonic.',
  talkToAi: { starter: 'Starter prompt.', example: 'Example prompt.' },
};

const css = readFileSync(resolve(__dirname, '../styles/animations.css'), 'utf8');
const rule = (selector) => {
  const i = css.indexOf(`${selector} {`);
  return i === -1 ? '' : css.slice(i, css.indexOf('}', i));
};

describe('2026-10-14 design QA', () => {
  it('#97 draws So what bars and ticks on one linear scale', () => {
    const { container } = render(<TalkToAiCard topic={{ ...base, id: 'so-what-charts', title: 'So what' }} />);
    const bars = [...container.querySelectorAll('.so-what__bar')];
    expect(bars.map((b) => b.style.getPropertyValue('--bar-pct'))).toEqual(['50%', '81.25%', '68.75%', '100%', '90%']);
    const ticks = [...container.querySelectorAll('.so-what__tick')];
    expect(ticks.map((t) => [t.textContent, t.style.getPropertyValue('--tick-pct')])).toEqual([['80', '100%'], ['40', '50%'], ['0', '0%']]);
  });

  it('#85 / #99 keeps scene sentences, controls and ticks at the readable floor', () => {
    expect(rule('.so-what__y-axis')).toMatch(/font-size: 12px/);
    expect(css).toMatch(/\.so-what__caption,\s*\.disclosure-scene__caption,\s*\.feedback-scene__helper \{[^}]*font-size: 16px/);
    expect(css).toMatch(/\.so-what__toggle-btn,\s*\.disclosure-scene__expander \{[^}]*font-size: 16px/);
    expect(rule('.so-what__takeaway')).toMatch(/font-size: 16px/);
    expect(css).toMatch(/\.feedback-scene__layer p \{[^}]*font-size: 16px/);
    expect(rule('.disclosure-scene__field label')).toMatch(/font-size: 16px/);
    expect(css).not.toMatch(/font-size: 1[01]px/);
  });

  it('#100 gives the new scenes light-mode tokens', () => {
    expect(css).toMatch(/\[data-theme='light'\] \.concept-visual--so-what-charts,[^{]*\{[^}]*--scene-surface: #ffffff/);
  });

  it('#86 / #98 progressive disclosure fields are real labelled inputs', async () => {
    const user = userEvent.setup();
    render(<TalkToAiCard topic={{ ...base, id: 'progressive-disclosure', title: 'Progressive disclosure' }} />);
    const search = screen.getByLabelText('Search');
    await user.type(search, 'Q3');
    expect(search).toHaveValue('Q3');
    expect(screen.getByLabelText('Columns')).toHaveAttribute('tabindex', '-1');
    await user.click(screen.getByRole('button', { name: 'Advanced options' }));
    expect(screen.getByLabelText('Columns')).not.toHaveAttribute('tabindex');
  });

  it('#92 progress rings use Lucide artwork at documented sizes', () => {
    const { container } = render(<ProgressRing percent={40} masteredPercent={10} size={32} />);
    const svgs = [...container.querySelectorAll('svg')];
    expect(svgs.length).toBeGreaterThan(0);
    svgs.forEach((svg) => {
      expect(svg).toHaveClass('lucide');
      expect(svg.getAttribute('viewBox')).toBe('0 0 24 24');
      expect([14, 16, 20, 24, 32]).toContain(Number(svg.getAttribute('width')));
    });
  });

  it('#92 no custom 0 0 36 36 ring artwork remains', () => {
    ['../components/layout/TopNav.jsx', '../components/learn/FloatingLearningHud.jsx', '../components/ui/ExploreBar.jsx'].forEach((f) => {
      expect(readFileSync(resolve(__dirname, f), 'utf8')).not.toMatch(/viewBox="0 0 36 36"/);
    });
  });
});

describe('#87 header topic title', () => {
  const src = readFileSync(resolve(__dirname, '../components/layout/TopNav.jsx'), 'utf8');
  it('drops long topic titles from the header and keeps them in the tip', () => {
    expect(src).toMatch(/const HEADER_TITLE_MAX = 24;/);
    expect(src).toMatch(/dropLabel = labelFit === 'clamp'/);
    expect((src.match(/labelFit="clamp"/g) || []).length).toBe(2);
  });
  it('holds cluster and category names until 2xl so they never overprint the title', () => {
    expect((src.match(/labelFrom="2xl"/g) || []).length).toBe(2);
  });
});
