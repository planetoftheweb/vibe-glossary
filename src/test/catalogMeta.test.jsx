import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { CATEGORIES } from '../data/categories';
import { BUILD_LITERACY_CLUSTERS } from '../data/buildLiteracy';

// #89: public meta descriptions must match the catalog the welcome screen counts.
describe('index.html catalog counts', () => {
  const html = readFileSync(resolve(__dirname, '../../index.html'), 'utf8');
  const uiTotal = CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);
  const buildTotal = BUILD_LITERACY_CLUSTERS.reduce((sum, c) => sum + ((c.topics && c.topics.length) || 0), 0);

  it.each(['name="description"', 'property="og:description"', 'name="twitter:description"'])('%s states current counts', (attr) => {
    const tag = html.split('\n').find((l) => l.includes(attr));
    expect(tag).toContain(`${uiTotal} interactive UI components`);
    expect(tag).toContain(`${buildTotal} build-literacy topics`);
  });

  it('keeps theme-color at #09090b', () => {
    expect(html).toContain('<meta name="theme-color" content="#09090b" />');
  });
});
