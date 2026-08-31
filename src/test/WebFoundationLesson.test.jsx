import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import WebFoundationLesson from '../components/learn/WebFoundationLesson';
import { WEB_FOUNDATIONS_CLUSTER } from '../data/webFoundations';
import {
  WEB_FOUNDATION_LAB_IDS,
  WEB_FOUNDATION_LESSONS,
} from '../data/webFoundationLessons';

afterEach(() => cleanup());

function topic(id) {
  return WEB_FOUNDATIONS_CLUSTER.topics.find((candidate) => candidate.id === id);
}

function renderLesson(id, onSelectTopic = vi.fn()) {
  return render(
    <WebFoundationLesson
      topic={topic(id)}
      cluster={WEB_FOUNDATIONS_CLUSTER}
      onSelectTopic={onSelectTopic}
    />,
  );
}

describe('WebFoundationLesson', () => {
  it('gives every Web Foundations topic a purpose-built interactive lab', () => {
    const topicIds = WEB_FOUNDATIONS_CLUSTER.topics.map((candidate) => candidate.id);

    expect(WEB_FOUNDATION_LAB_IDS).toEqual(topicIds);
    expect(Object.keys(WEB_FOUNDATION_LESSONS)).toHaveLength(topicIds.length);

    for (const id of topicIds) {
      expect(WEB_FOUNDATION_LESSONS[id]).toMatchObject({
        lab: expect.any(String),
        kicker: expect.any(String),
        hook: expect.any(String),
        objective: expect.any(String),
        minutes: expect.any(Number),
      });
    }
  });

  it('teaches tag anatomy through linked code, behavior, and a challenge', async () => {
    const user = userEvent.setup();
    renderLesson('html-tag-element-attribute');

    expect(screen.getByRole('heading', { name: 'Tag, element, attribute' })).toBeInTheDocument();
    expect(screen.getByText('Browser Lab')).toBeInTheDocument();
    expect(screen.queryByText(/starter prompt/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/paste into your ai/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Select type attribute' }));
    expect(screen.getByText('Attribute')).toBeInTheDocument();
    expect(screen.getByText(/configures the element/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Change the attribute to type="button"' }));
    expect(screen.getByText('You proved it')).toBeInTheDocument();
    expect(screen.getByText(topic('html-tag-element-attribute').mnemonic)).toBeInTheDocument();
  });

  it('renders every lesson route without falling back to a prompt card', () => {
    for (const candidate of WEB_FOUNDATIONS_CLUSTER.topics) {
      const { container, unmount } = renderLesson(candidate.id);

      expect(container.querySelector('[data-web-foundation-lesson]')).toHaveAttribute(
        'data-web-foundation-lesson',
        candidate.id,
      );
      expect(container.querySelector('.wf-challenge')).toBeInTheDocument();
      expect(container.textContent).not.toMatch(/Paste into your AI|Starter prompt/i);
      unmount();
    }
  });

  it('calculates contrast live and confirms a passing repair', async () => {
    const user = userEvent.setup();
    renderLesson('color-contrast');

    expect(screen.getByText(/2\.56:1/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'black: #111827' }));

    expect(screen.getByText(/clears the 4\.5:1 target/i)).toBeInTheDocument();
    expect(screen.getByText('You proved it')).toBeInTheDocument();
  });

  it('supports the keyboard-navigation lesson with the actual arrow-key model', () => {
    renderLesson('keyboard-nav');
    const overviewTab = screen.getByRole('tab', { name: 'Overview' });

    overviewTab.focus();
    fireEvent.keyDown(overviewTab, { key: 'ArrowRight' });

    expect(screen.getByRole('tab', { name: 'Examples' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('ArrowRight')).toBeInTheDocument();
  });
});
