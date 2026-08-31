import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  FlaskConical,
  RotateCcw,
} from 'lucide-react';
import { getWebFoundationLesson } from '../../data/webFoundationLessons';
import MarkupFoundationLab from './labs/MarkupFoundationLab';
import CssFoundationLab from './labs/CssFoundationLab';
import AccessibilityFoundationLab from './labs/AccessibilityFoundationLab';
import '../../styles/web-foundation-lab.css';

const MARKUP_LABS = new Set([
  'tag-anatomy',
  'semantic-html',
  'formats',
  'form-identity',
  'dom-tree',
]);

const ACCESSIBILITY_LABS = new Set([
  'accessibility-audit',
  'aria-inspector',
  'accessibility-tree',
  'focus-management',
  'contrast',
  'touch-targets',
  'keyboard-navigation',
]);

function LabForLesson({ lesson, topicId, onComplete, resetNonce }) {
  if (MARKUP_LABS.has(lesson.lab)) {
    return (
      <MarkupFoundationLab
        key={`${topicId}-${resetNonce}`}
        lab={lesson.lab}
        onComplete={onComplete}
      />
    );
  }

  if (ACCESSIBILITY_LABS.has(lesson.lab)) {
    return (
      <AccessibilityFoundationLab
        key={`${topicId}-${resetNonce}`}
        lab={lesson.lab}
        onComplete={onComplete}
      />
    );
  }

  return (
    <CssFoundationLab
      key={`${topicId}-${resetNonce}`}
      lab={lesson.lab}
      onComplete={onComplete}
    />
  );
}

export default function WebFoundationLesson({
  topic,
  cluster,
  onSelectTopic,
}) {
  const lesson = getWebFoundationLesson(topic?.id);
  const [complete, setComplete] = useState(false);
  const [resetNonce, setResetNonce] = useState(0);

  const topicIndex = useMemo(
    () => cluster?.topics?.findIndex((candidate) => candidate.id === topic?.id) ?? -1,
    [cluster, topic?.id],
  );
  const previous = topicIndex > 0 ? cluster.topics[topicIndex - 1] : null;
  const next = topicIndex >= 0 && topicIndex < (cluster?.topics?.length || 0) - 1
    ? cluster.topics[topicIndex + 1]
    : null;

  useEffect(() => {
    setComplete(false);
    setResetNonce(0);
  }, [topic?.id]);

  if (!topic || !lesson) return null;

  const restart = () => {
    setComplete(false);
    setResetNonce((value) => value + 1);
  };

  return (
    <main className="wf-root" data-web-foundation-lesson={topic.id}>
      <header className="wf-lesson-header">
        <div className="wf-lesson-meta">
          <span className="wf-cluster-mark" aria-hidden="true" />
          <span>Web Foundations</span>
          <span aria-hidden="true">/</span>
          <span>{String(topicIndex + 1).padStart(2, '0')} of {cluster.topics.length}</span>
          <span className="wf-time"><Clock3 size={14} aria-hidden="true" /> {lesson.minutes} min</span>
        </div>

        <nav className="wf-topic-nav" aria-label="Web Foundations lesson navigation">
          <button
            type="button"
            onClick={() => previous && onSelectTopic(previous.id)}
            disabled={!previous}
            aria-label={previous ? `Previous lesson: ${previous.title}` : 'No previous lesson'}
          >
            <ArrowLeft size={18} aria-hidden="true" />
            <span className="wf-nav-label">Previous</span>
          </button>
          <button
            type="button"
            onClick={() => next && onSelectTopic(next.id)}
            disabled={!next}
            aria-label={next ? `Next lesson: ${next.title}` : 'No next lesson'}
          >
            <span className="wf-nav-label">Next</span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </nav>
      </header>

      <div className="wf-progress" aria-label={`Lesson ${topicIndex + 1} of ${cluster.topics.length}`}>
        {cluster.topics.map((candidate, index) => (
          <button
            key={candidate.id}
            type="button"
            onClick={() => onSelectTopic(candidate.id)}
            className={index === topicIndex ? 'is-current' : index < topicIndex ? 'is-past' : ''}
            aria-label={`${index + 1}: ${candidate.title}`}
            aria-current={index === topicIndex ? 'step' : undefined}
          />
        ))}
      </div>

      <section className="wf-intro">
        <div className="wf-kicker"><FlaskConical size={17} aria-hidden="true" /> {lesson.kicker}</div>
        <h1 className={topic.title.length > 24 ? 'is-long' : undefined}>{topic.title}</h1>
        <p className="wf-hook">{lesson.hook}</p>
        <div className="wf-objective">
          <span>Today you’ll prove</span>
          <p>{lesson.objective}</p>
        </div>
      </section>

      <section className="wf-lab-shell" aria-label={`${topic.title} interactive lab`}>
        <div className="wf-lab-titlebar">
          <div>
            <span className="wf-lab-dot wf-lab-dot-coral" />
            <span className="wf-lab-dot wf-lab-dot-amber" />
            <span className="wf-lab-dot wf-lab-dot-green" />
          </div>
          <span>Browser Lab</span>
          <button type="button" onClick={restart} aria-label="Restart lesson">
            <RotateCcw size={15} aria-hidden="true" /> Restart
          </button>
        </div>

        <LabForLesson
          lesson={lesson}
          topicId={topic.id}
          resetNonce={resetNonce}
          onComplete={() => setComplete(true)}
        />
      </section>

      <footer className={`wf-recall ${complete ? 'is-complete' : ''}`}>
        <div className="wf-recall-status" aria-live="polite">
          <span className="wf-recall-check"><Check size={18} aria-hidden="true" /></span>
          <div>
            <span>{complete ? 'You proved it' : 'Finish the challenge'}</span>
            <p>{complete ? topic.mnemonic : 'Change the live example until the challenge confirms the browser understands your fix.'}</p>
          </div>
        </div>

        {complete && next ? (
          <button type="button" className="wf-next-lesson" onClick={() => onSelectTopic(next.id)}>
            Next: {next.title} <ArrowRight size={18} aria-hidden="true" />
          </button>
        ) : null}
      </footer>
    </main>
  );
}
