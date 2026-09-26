import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

function src(path) {
  return readFileSync(resolve(path), 'utf8');
}

describe('Definition pane overflow (#78)', () => {
  it('contains the glossary and Engineering panes so they never scroll sideways', () => {
    const app = src('src/App.jsx');
    const build = src('src/components/learn/BuildLiteracyView.jsx');

    expect(app).toMatch(/data-tour="definition-panel"[^>]*overflow-x-hidden/);
    expect(build).toMatch(/data-tour="definition-panel"[\s\S]*?overflow-x-hidden/);
    expect(app).toMatch(/min-w-0 max-w-full/);
    expect(build).toMatch(/min-w-0 max-w-full/);
  });

  it('scales glossary titles instead of mid-word breaks', () => {
    const app = src('src/App.jsx');
    const topic = src('src/components/learn/BuildTopicView.jsx');
    const panel = src('src/components/ui/DefinitionPanel.jsx');
    const css = src('src/styles/animations.css');

    expect(app).toMatch(/<h1 className="[^"]*vg-glossary-title/);
    expect(topic).toMatch(/<h1 className="[^"]*vg-glossary-title/);
    expect(app).not.toMatch(/<h1 className="[^"]*break-words/);
    expect(topic).not.toMatch(/<h1 className="[^"]*break-words/);
    expect(css).toMatch(/\.vg-glossary-title\s*\{[^}]*hyphens:\s*auto/);
    expect(panel).toContain('break-words');
    expect(topic).toMatch(/mnemonic[\s\S]*break-words/);
  });
});
