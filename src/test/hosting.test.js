import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const firebase = JSON.parse(readFileSync(resolve(process.cwd(), 'firebase.json'), 'utf8'));
const indexHtml = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');

function headerFor(source) {
  return (firebase.hosting.headers || []).find((h) => h.source === source);
}

function cacheControl(source) {
  const rule = headerFor(source);
  const row = rule?.headers?.find((h) => h.key === 'Cache-Control');
  return row?.value || '';
}

describe('#37 hashed-bundle deploys must not white-screen return visitors', () => {
  it('sends no-cache on HTML and immutable on hashed assets', () => {
    const htmlCache = cacheControl('**');
    expect(htmlCache).toMatch(/no-cache|max-age=0/);
    expect(htmlCache).toMatch(/must-revalidate/);
    const assets = cacheControl('/assets/**');
    expect(assets).toMatch(/max-age=31536000/);
    expect(assets).toMatch(/immutable/);
  });

  it('does not rewrite missing /assets/*.js to the SPA HTML', () => {
    const rewrites = firebase.hosting.rewrites || [];
    expect(rewrites.some((r) => r.source === '**')).toBe(false);
    expect(rewrites.some((r) => String(r.source || '').includes('/assets'))).toBe(false);
    expect(rewrites.some((r) => String(r.regex || '').includes('assets'))).toBe(false);
    const dests = rewrites.filter((r) => r.destination === '/index.html').map((r) => r.source);
    expect(dests).toEqual(expect.arrayContaining(['/', '/glossary/**', '/build/**']));
    dests.forEach((src) => {
      expect(src).not.toBe('**');
      expect(String(src)).not.toMatch(/assets/);
    });
  });

  it('index.html has an inline boot check with a refresh fallback', () => {
    expect(indexHtml).toMatch(/data-boot-fallback/);
    expect(indexHtml).toMatch(/script\[type="module"\]/);
    expect(indexHtml).toMatch(/location\.reload/);
    expect(indexHtml).toMatch(/This page needs a refresh/);
  });
});
