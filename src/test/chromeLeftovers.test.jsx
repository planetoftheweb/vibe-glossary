import { render, screen } from '@testing-library/react';
import TopicTierBadge from '../components/learn/TopicTierBadge';
import TalkToAiCard from '../components/learn/TalkToAiCard';
import PromptBuilder from '../components/ui/PromptBuilder';
import ScoreBreakdownModal from '../components/learn/ScoreBreakdownModal';
import Footer from '../components/layout/Footer';
import BuildTopicView from '../components/learn/BuildTopicView';
import { AUTH_ERROR_COPY, AUTH_ERROR_FALLBACK } from '../lib/authErrors';
import { levelFor } from '../lib/scoring';

vi.mock('../hooks/useCategories', () => ({
  useCategories: () => [{ id: 'overlays', items: [{ id: 'modal' }] }],
}));

const topic = {
  id: 'particle-field',
  title: 'Particle Field',
  summary: 'Wallpaper behind the page.',
  definition: 'Wallpaper behind the page.',
  talkToAi: { starter: 'Hello starter', example: 'Hello example' },
};

describe('#21 Learning Mode and Copy keep compact paint and a 44px hit box', () => {
  it('Learning Mode button is 44px tall while the chip stays compact', () => {
    render(
      <BuildTopicView
        topic={topic}
        cluster={{ id: 'design-language', title: 'Design language', topics: [topic] }}
        glossary={{}}
        learnMode={false}
        toggleLearnMode={() => {}}
        quizPool={[]}
      />
    );
    const btn = screen.getByRole('button', { name: 'Turn on Learning Mode' });
    expect(btn.className).toMatch(/min-h-\[44px\]/);
    expect(btn.className).not.toMatch(/bg-indigo-600/);
    const paint = btn.querySelector('span.rounded-full');
    expect(paint).toBeTruthy();
    expect(paint.className).toMatch(/py-1/);
    expect(paint.className).not.toMatch(/min-h-\[44px\]/);
    expect(paint.textContent).toMatch(/Learning off/);
  });

  it('Talk to AI Copy chip sits in a 44px hit box', () => {
    render(<TalkToAiCard topic={topic} />);
    const copies = screen.getAllByRole('button', { name: /Copy /i });
    expect(copies.length).toBeGreaterThan(0);
    copies.forEach((btn) => {
      expect(btn.className).toMatch(/min-h-\[44px\]/);
      const paint = btn.querySelector('span');
      expect(paint.className).not.toMatch(/min-h-\[44px\]/);
    });
  });

  it('Spec Generator Copy uses a 44px hit box and no title=', () => {
    render(
      <PromptBuilder
        data={{
          prompt: {
            base: 'Add a dialog',
            options: [],
            requirements: [],
            scaffolds: { shadcn: '<Dialog />' },
          },
        }}
        activeOptions={new Set()}
        onOptionToggle={() => {}}
      />
    );
    const btn = screen.getByRole('button', { name: 'Copy to clipboard (markdown)' });
    expect(btn).not.toHaveAttribute('title');
    expect(btn.className).toMatch(/min-h-\[44px\]/);
    expect(btn.className).toMatch(/min-w-\[44px\]/);
    expect(btn.className).not.toMatch(/opacity-0/);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Copy to clipboard');
  });
});

describe('#22 no em dashes in VibeScore or auth errors', () => {
  it('auth error strings use periods, not em dashes', () => {
    const values = [...Object.values(AUTH_ERROR_COPY), AUTH_ERROR_FALLBACK];
    values.filter(Boolean).forEach((copy) => {
      expect(copy, copy).not.toMatch(/\u2014/);
      expect(copy, copy).not.toMatch(/\u2013/);
    });
  });

  it('top-rung VibeScore copy has no em dash', () => {
    const score = {
      total: 2000,
      glossary: { total: 1000, visited: 10, used: 0, passed: 0, mastered: 0, retained: 0, pathBonus: 0 },
      build: { total: 1000, visited: 10, used: 0, passed: 0, mastered: 0, retained: 0, pathBonus: 0 },
    };
    render(
      <ScoreBreakdownModal
        isOpen
        onClose={() => {}}
        score={score}
        level={levelFor(2000)}
      />
    );
    expect(screen.getByText(/Top rung/)).toBeInTheDocument();
    expect(screen.getByText(/Top rung/).textContent).not.toMatch(/\u2014/);
    expect(screen.getByText(/Top rung/).textContent).toMatch(/Keep retaining what you know/);
  });
});

describe('#23 Visited badge uses HoverTip, not title=', () => {
  it('exposes the next-rung hint via aria-label and in-app tip', () => {
    render(<TopicTierBadge tier={{ visited: true }} />);
    const badge = screen.getByLabelText(/Visited/);
    expect(badge).not.toHaveAttribute('title');
    expect(badge.getAttribute('aria-label')).toMatch(/Copy a prompt to reach Used/);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Copy a prompt to reach Used.');
  });
});

describe('#32 VibeScore modal hit boxes and no title= on level chips', () => {
  const score = {
    total: 12,
    glossary: { total: 12, visited: 12, used: 0, passed: 0, mastered: 0, retained: 0, pathBonus: 0 },
    build: { total: 0, visited: 0, used: 0, passed: 0, mastered: 0, retained: 0, pathBonus: 0 },
  };

  it('Class proof, Share score, and Close are 44px', () => {
    render(
      <ScoreBreakdownModal
        isOpen
        onClose={() => {}}
        onOpenProof={() => {}}
        score={score}
        level={levelFor(12)}
      />
    );
    expect(screen.getByRole('button', { name: /Class proof/i }).className).toMatch(/min-h-\[44px\]/);
    expect(screen.getByRole('button', { name: /Share score/i }).className).toMatch(/min-h-\[44px\]/);
    expect(screen.getByRole('button', { name: /Close score breakdown/i }).className).toMatch(/min-h-\[44px\]/);
  });

  it('level chips use HoverTip and aria-label, not title=', () => {
    const { container } = render(
      <ScoreBreakdownModal
        isOpen
        onClose={() => {}}
        score={score}
        level={levelFor(12)}
      />
    );
    expect(container.querySelector('[title]')).toBeNull();
    const lurker = screen.getByLabelText(/Lurker/);
    expect(lurker).not.toHaveAttribute('title');
    expect(lurker.getAttribute('aria-label')).toMatch(/Just looking around/);
    expect(lurker.className).toMatch(/min-h-\[44px\]/);
  });
});

describe('#32 footer Changelog and GitHub are 44px', () => {
  it('Changelog and GitHub links use a 44px hit box', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /Changelog/i }).className).toMatch(/min-h-\[44px\]/);
    expect(screen.getByRole('link', { name: /GitHub/i }).className).toMatch(/min-h-\[44px\]/);
  });
});
