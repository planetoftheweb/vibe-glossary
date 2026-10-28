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
});
