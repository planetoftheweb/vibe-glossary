import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const app = readFileSync(resolve('src/App.jsx'), 'utf8');

describe('TopNav learning controls (#81)', () => {
  it('keeps the Score pill and Class proof chip path live in TopNav', () => {
    expect(app).toMatch(/showLearningControls=\{true\}/);
    expect(app).not.toMatch(/showLearningControls=\{false\}/);
    expect(app).toMatch(/onOpenProof=\{\(\) => \{ setProofSnapshot\(null\); setShowProof\(true\); \}\}/);
  });
});
