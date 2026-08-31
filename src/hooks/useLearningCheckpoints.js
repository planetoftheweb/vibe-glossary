import { useCallback, useEffect, useRef, useState } from 'react';

export const ITEMS_PER_CHECKPOINT = 5;

const emptySection = () => ({ seen: [], checkpoint: null, completed: 0 });

export default function useLearningCheckpoints({
  enabled,
  section,
  activeGlossaryId,
  activeBuildId,
}) {
  const [sections, setSections] = useState(() => ({
    glossary: emptySection(),
    build: emptySection(),
  }));
  const lastTracked = useRef({ glossary: null, build: null });

  useEffect(() => {
    if (!enabled || (section !== 'glossary' && section !== 'build')) return;

    const activeId = section === 'build' ? activeBuildId : activeGlossaryId;
    if (!activeId || lastTracked.current[section] === activeId) return;
    lastTracked.current[section] = activeId;

    setSections((previous) => {
      const current = previous[section];
      if (current.checkpoint || current.seen.includes(activeId)) return previous;

      const seen = [...current.seen, activeId];
      const nextSection = seen.length >= ITEMS_PER_CHECKPOINT
        ? { ...current, seen: [], checkpoint: seen.slice(0, ITEMS_PER_CHECKPOINT) }
        : { ...current, seen };

      return { ...previous, [section]: nextSection };
    });
  }, [enabled, section, activeGlossaryId, activeBuildId]);

  const completeCheckpoint = useCallback((sectionId) => {
    if (sectionId !== 'glossary' && sectionId !== 'build') return;
    setSections((previous) => ({
      ...previous,
      [sectionId]: {
        seen: [],
        checkpoint: null,
        completed: previous[sectionId].completed + 1,
      },
    }));
  }, []);

  const skipCheckpoint = useCallback((sectionId) => {
    if (sectionId !== 'glossary' && sectionId !== 'build') return;
    setSections((previous) => ({
      ...previous,
      [sectionId]: {
        ...previous[sectionId],
        seen: [],
        checkpoint: null,
      },
    }));
  }, []);

  const current = sections[section] || sections.glossary;

  return {
    sections,
    current,
    completeCheckpoint,
    skipCheckpoint,
    size: ITEMS_PER_CHECKPOINT,
  };
}
