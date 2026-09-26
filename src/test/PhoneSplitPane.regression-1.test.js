import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const shellCss = readFileSync(
  resolve('src/styles/animations.css'),
  'utf8',
);

describe('phone glossary split pane regression', () => {
  it('does not apply the short-height 28% definition cap on phone widths', () => {
    // The short-landscape tablet rule must require min-width so phone tab
    // mode is not capped while Live Preview stays display:none.
    expect(shellCss).toMatch(
      /@container\s+vg-split\s*\(\s*min-width:\s*768px\s*\)\s*and\s*\(\s*max-height:\s*700px\s*\)/,
    );
    expect(shellCss).not.toMatch(
      /@container\s+vg-split\s*\(\s*max-height:\s*700px\s*\)\s*\{/,
    );
  });

  it('lets the active phone pane fill and scroll instead of leaving a dead void', () => {
    const phoneRule = shellCss.match(
      /@media\s*\(\s*max-width:\s*767\.98px\s*\)\s*\{([\s\S]*?)\n\}/,
    );
    expect(phoneRule, 'phone max-width media rule').not.toBeNull();
    expect(phoneRule[1]).toMatch(/\.vg-pane-def/);
    expect(phoneRule[1]).toMatch(/\.vg-pane-preview/);
    expect(phoneRule[1]).toMatch(/flex:\s*1\s+1\s+auto/);
    expect(phoneRule[1]).toMatch(/max-height:\s*none/);
  });
});
