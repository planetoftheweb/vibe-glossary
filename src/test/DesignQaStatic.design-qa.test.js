import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
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

  it('#131 and #136: the Motion lab uses only zinc, indigo and Design language fuchsia values', () => {
    const lines = css.split('\n');
    const start = lines.findIndex((l) => l.startsWith('.motion-lab {'));
    const end = lines.findIndex((l, n) => n > start && l.startsWith('/* Shared teaching studio'));
    const lab = lines.slice(start, end).join('\n');
    const banned = ['#ccfbf1', '#064e3b', '#c4b5fd', '#f472b6', '#60a5fa', '#a78bfa', '#7c3aed', '#8b5cf6', '#ec4899', '#c026d3, #ec4899',
      '#f8f7ff', '#aaa5bd', '#d6d2e2', '#d5d1e1', '#b4aec4', '#8f899f', '#686274', '#a29cac', '#777181',
      '#121019', '#17121f', '#08060f', '#0d0a14', 'rgb(14 11 23', 'rgb(20 15 33', 'rgb(244 114 182', 'rgb(167 139 250', 'rgb(124 58 237'];
    for (const value of banned) expect(lab.toLowerCase()).not.toContain(value.toLowerCase());
    expect(lab).not.toMatch(/--motion-lab-(violet|mint)/);
  });

  it('#136: the Motion lab has light-theme overrides keyed on data-theme, and cue labels use the helper gray', () => {
    expect(css).toMatch(/\[data-theme='light'\] \.motion-lab__hero h2\s*\{[^}]*#18181b/);
    expect(css).toMatch(/\[data-theme='light'\] \.motion-lab__reduce\[aria-pressed='true'\]\s*\{[^}]*#4338ca/);
    expect(css).not.toMatch(/html:not\(\.dark\) \.motion-lab/);
    const labels = css.match(/\.motion-lab__timeline-labels\s*\{([^}]*)\}/)[1];
    const track = css.match(/\.motion-lab__track\s*\{([^}]*)\}/)[1];
    expect(labels).toMatch(/color:\s*#a1a1aa/);
    expect(track).toMatch(/color:\s*#a1a1aa/);
  });

  it('#116: Easing timeline labels and the Build topic captions use helper contrast or stronger', () => {
    expect(css).toMatch(/\.easing-lab__timeline\s*\{[^}]*color:\s*#a1a1aa/);
    const topic = readFileSync(resolve('src/components/learn/BuildTopicView.jsx'), 'utf8');
    expect(topic).not.toMatch(/uppercase tracking-wider text-zinc-400 dark:text-zinc-500/);
  });

  it('#138: no white-text primary or secondary link hovers to indigo 500', () => {
    const walk = (dir) => readdirSync(dir).flatMap((name) => {
      const full = join(dir, name);
      return statSync(full).isDirectory() ? walk(full) : [full];
    });
    const offenders = walk(resolve('src'))
      .filter((f) => /\.(jsx?|css)$/.test(f) && !f.includes('/test/'))
      .filter((f) => /(?<![\w/-])(group-)?hover:(bg|text)-indigo-500(?![/\w])/.test(readFileSync(f, 'utf8')));
    expect(offenders).toEqual([]);
    const notFound = readFileSync(resolve('public/404.html'), 'utf8');
    expect(notFound).toMatch(/a\.button:hover\s*\{\s*background:\s*#4338ca/);
    expect(notFound).toMatch(/Source Code Pro/);
    expect(css).toMatch(/\.motion-lab__replay:hover\s*\{\s*background:\s*#4338ca/);
  });

  it('#137: the topic menu is a real width that stays on screen, and long hyphenation is off from lg', () => {
    const nav = readFileSync(resolve('src/components/layout/TopNav.jsx'), 'utf8');
    expect(nav).toMatch(/width="min\(20rem, calc\(100vw - 1\.5rem\)\)"/);
    expect(nav).not.toMatch(/flex-1 truncate">\{topic\.title\}/);
    expect(css).toMatch(/@media \(min-width: 1024px\) \{\s*\.vg-glossary-title \{\s*hyphens:\s*manual;\s*-webkit-hyphens:\s*manual;/);
  });
  it('#137: below sm the shell scrolls and only the sticky 80px bar stays pinned', () => {
    const nav = readFileSync(resolve('src/components/layout/TopNav.jsx'), 'utf8');
    // The header is sticky below sm, and the crumb rows sit outside it so they scroll away.
    const header = nav.match(/<header className="([^"]+)"/)[1];
    expect(header).toMatch(/max-sm:sticky/);
    expect(header).toMatch(/max-sm:top-0/);
    const headerEnd = nav.indexOf('</header>');
    const firstCrumbs = nav.indexOf('<MobileCrumbsShell gradient');
    expect(headerEnd).toBeGreaterThan(-1);
    expect(firstCrumbs).toBeGreaterThan(headerEnd);
    expect(nav.match(/<div data-mobile-crumbs/g)).toHaveLength(2);
    const block = css.match(/@media \(max-width: 639\.98px\) \{\s*html \.app-shell \{[\s\S]*?\n\}\n/)[0];
    expect(block).toMatch(/overflow-y:\s*auto/);
    expect(block).toMatch(/container-type:\s*inline-size/);
    expect(block).toMatch(/\.vg-phone-tabs \{\s*scroll-margin-top/);
    // Both views: the tab strip is scrolled into view when a tab is picked, the shell wrappers flow.
    for (const file of ['src/App.jsx', 'src/components/learn/BuildLiteracyView.jsx']) {
      const src = readFileSync(resolve(file), 'utf8');
      expect(src).toMatch(/scrollToTabs\(\)/);
      expect(src).toMatch(/vg-shell-flow/);
      expect(src).toMatch(/ref=\{tabsRef\}/);
    }
    expect(readFileSync(resolve('src/App.jsx'), 'utf8')).toMatch(/<ShellBackToTop shellRef=\{shellRef\} \/>/);
  });

  it('#139: no bare animate-pulse, spin, ping or bounce in components (reduced motion)', () => {
    const walk = (dir) => readdirSync(dir).flatMap((name) => {
      const full = join(dir, name);
      return statSync(full).isDirectory() ? walk(full) : [full];
    });
    const offenders = walk(resolve('src/components'))
      .filter((f) => /\.jsx?$/.test(f))
      .filter((f) => /(?<![\w:-])animate-(pulse|spin|ping|bounce)\b/.test(readFileSync(f, 'utf8')));
    expect(offenders).toEqual([]);
    expect(readFileSync(resolve('src/components/ui/PromptBuilder.jsx'), 'utf8')).toMatch(/motion-safe:animate-pulse/);
  });
});
