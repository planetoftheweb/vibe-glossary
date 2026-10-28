import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve('src/styles/animations.css'), 'utf8');
const indexHtml = readFileSync(resolve('index.html'), 'utf8');

describe('design QA static contracts', () => {
  it('#119: index.html adds the dark class before the app script, unless light is saved', () => {
    const inline = indexHtml.indexOf("classList.add('dark')");
    const moduleScript = indexHtml.indexOf('type="module"');
    expect(inline).toBeGreaterThan(-1);
    expect(inline).toBeLessThan(moduleScript);
    expect(indexHtml).toMatch(/vg-dark-mode'\) !== 'false'/);
  });

  it('#113: ships a styled public/404.html with a link back to the glossary', () => {
    expect(existsSync(resolve('public/404.html'))).toBe(true);
    const html = readFileSync(resolve('public/404.html'), 'utf8');
    expect(html).toMatch(/Browse the glossary/);
    expect(html).toMatch(/Poppins/);
    expect(html).toMatch(/#09090b/);
    expect(html).not.toMatch(/\u2014/);
  });

  it('#127: no scene CSS names the unloaded "Hubot Sans" face without the variable family first', () => {
    const bad = css.match(/font-family:\s*'Hubot Sans'(?!\s*Variable)[^;]*;/g) || [];
    expect(bad).toEqual([]);
  });

  it('#117: prompt tabs out-rank the stage toolbar font reset', () => {
    expect(css).toMatch(/\.vg-studio \.concept-studio__prompt-tab\s*\{[^}]*font-size:\s*16px/);
  });

  it('#124: the Motion lab slider has a 44px hit area', () => {
    const rule = css.match(/\.motion-lab__control input\[type='range'\]\s*\{([^}]*)\}/);
    expect(rule[1]).toMatch(/height:\s*44px/);
  });

  it('#123: Motion lab option explanations wrap at 16px, no ellipsis', () => {
    const rule = css.match(/\.motion-lab__choice-grid button small\s*\{([^}]*)\}/);
    expect(rule[1]).toMatch(/font-size:\s*16px/);
    expect(rule[1]).not.toMatch(/ellipsis|nowrap/);
    expect(rule[1]).not.toMatch(/#706a7f/);
  });

  it('#116 and #125: caption colors use the helper gray or stronger', () => {
    expect(css).not.toMatch(/color:\s*#777082/);
    expect(css).not.toMatch(/\.token-scene__rail span\s*\{\s*color:\s*#787181/);
  });

  it('#129: Easing and Particle lab buttons are 16px and wrap instead of shrinking', () => {
    const particle = css.match(/\.particle-field__control-group button,\s*\.particle-field__transport button\s*\{([^}]*)\}/);
    expect(particle[1]).toMatch(/font-size:\s*16px/);
    expect(particle[1]).toMatch(/min-height:\s*44px/);
    expect(css).toMatch(/\.particle-field__control-group > div\s*\{[^}]*flex-wrap:\s*wrap/);
    expect(css).toMatch(/\.particle-field__transport\s*\{[^}]*flex-wrap:\s*wrap/);
    expect(css).toMatch(/\.easing-lab__transport\s*\{[^}]*flex-wrap:\s*wrap/);
    const easing = css.match(/\.easing-lab__transport button\s*\{[^}]*font-size:\s*(\d+)px/);
    expect(easing[1]).toBe('16');
  });

  it('#131: Replay is the solid indigo primary and the lab has no teal', () => {
    const replay = css.match(/\.motion-lab__replay\s*\{([^}]*)\}/);
    expect(replay[1]).toMatch(/background:\s*#4f46e5/);
    expect(replay[1]).toMatch(/border:\s*1px solid #6366f1/);
    expect(replay[1]).toMatch(/box-shadow:\s*none/);
    const lines = css.split('\n');
    const start = lines.findIndex((l) => l.startsWith('.motion-lab {'));
    const lab = lines.slice(start, start + 840).join('\n');
    expect(lab).not.toMatch(/#5eead4|#99f6e4|#2dd4bf|rgb\(94 234 212|rgb\(20 184 166/i);
  });

  it('#112: short viewports never change the two-column decision', () => {
    expect(css).toMatch(/@container vg-split \(min-width: 1200px\) \{/);
    expect(css).not.toMatch(/@container vg-split \(min-width: 1200px\) and \(min-height/);
  });
});
