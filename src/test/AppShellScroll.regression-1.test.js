import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const shellCss = readFileSync(
  resolve('src/styles/animations.css'),
  'utf8',
);

describe('document scroll shell regression', () => {
  it('keeps nested lesson overflow inside the viewport instead of exposing the browser canvas', () => {
    const rootRule = shellCss.match(/html,\s*\n\s*body,\s*\n\s*#root\s*{([^}]*)}/);

    expect(rootRule, 'shared html, body, and #root rule').not.toBeNull();
    expect(rootRule[1]).toMatch(/height:\s*100%/);
    expect(rootRule[1]).toMatch(/overflow:\s*clip/);
    expect(rootRule[1]).toMatch(/overscroll-behavior:\s*none/);
    expect(rootRule[1]).toMatch(/background(?:-color)?:\s*#09090b/);
    expect(shellCss).toMatch(/#root\s*{[^}]*contain:\s*paint/);
  });
});
