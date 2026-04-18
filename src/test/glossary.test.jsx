import { GLOSSARY_DATA } from '../data/glossary';
import { DEMO_REGISTRY } from '../data/demoRegistry';
import { CATEGORIES } from '../data/categories';

// Collect all item IDs declared in CATEGORIES
const allCategoryItemIds = CATEGORIES.flatMap((cat) => cat.items.map((item) => item.id));

const entries = Object.entries(GLOSSARY_DATA);
const keys = Object.keys(GLOSSARY_DATA);

describe('GLOSSARY_DATA', () => {
  // 1. Correct number of entries
  it('has exactly 49 keys', () => {
    expect(keys).toHaveLength(49);
  });

  // 2–7. Per-entry shape tests
  describe.each(entries)('entry: %s', (key, entry) => {
    // 2. Required top-level fields exist (no demo — that lives in DEMO_REGISTRY)
    it('has title, definition, vibeTip, comparison, and prompt', () => {
      expect(entry).toHaveProperty('title');
      expect(entry).toHaveProperty('definition');
      expect(entry).toHaveProperty('vibeTip');
      expect(entry).toHaveProperty('comparison');
      expect(entry).toHaveProperty('prompt');
      expect(entry).not.toHaveProperty('demo');
    });

    // 3. String fields are non-empty strings
    it('title is a non-empty string', () => {
      expect(typeof entry.title).toBe('string');
      expect(entry.title.trim().length).toBeGreaterThan(0);
    });

    it('definition is a non-empty string', () => {
      expect(typeof entry.definition).toBe('string');
      expect(entry.definition.trim().length).toBeGreaterThan(0);
    });

    it('vibeTip is a non-empty string', () => {
      expect(typeof entry.vibeTip).toBe('string');
      expect(entry.vibeTip.trim().length).toBeGreaterThan(0);
    });

    it('comparison is a non-empty string', () => {
      expect(typeof entry.comparison).toBe('string');
      expect(entry.comparison.trim().length).toBeGreaterThan(0);
    });

    // 4. prompt.base is a non-empty string
    it('prompt.base is a non-empty string', () => {
      expect(typeof entry.prompt.base).toBe('string');
      expect(entry.prompt.base.trim().length).toBeGreaterThan(0);
    });

    // 5. prompt.options is an array; each option has id, label, text as strings
    it('prompt.options is an array of { id, label, text } strings', () => {
      expect(Array.isArray(entry.prompt.options)).toBe(true);
      for (const option of entry.prompt.options) {
        expect(typeof option.id).toBe('string');
        expect(typeof option.label).toBe('string');
        expect(typeof option.text).toBe('string');
      }
    });

    // 6. prompt.requirements is a non-empty array of strings
    it('prompt.requirements is a non-empty array of strings', () => {
      expect(Array.isArray(entry.prompt.requirements)).toBe(true);
      expect(entry.prompt.requirements.length).toBeGreaterThan(0);
      for (const req of entry.prompt.requirements) {
        expect(typeof req).toBe('string');
      }
    });

    // 7. prompt.scaffolds is an object with at least one key; each value is a non-empty string
    it('prompt.scaffolds is an object with at least one non-empty string value', () => {
      const { scaffolds } = entry.prompt;
      expect(scaffolds !== null && typeof scaffolds === 'object' && !Array.isArray(scaffolds)).toBe(true);
      const scaffoldKeys = Object.keys(scaffolds);
      expect(scaffoldKeys.length).toBeGreaterThan(0);
      for (const scaffoldKey of scaffoldKeys) {
        expect(typeof scaffolds[scaffoldKey]).toBe('string');
        expect(scaffolds[scaffoldKey].trim().length).toBeGreaterThan(0);
      }
    });
  });

  // 8. All GLOSSARY_DATA keys exist as item IDs in CATEGORIES
  describe('CATEGORIES coverage', () => {
    it('every GLOSSARY_DATA key appears as an item ID in CATEGORIES', () => {
      for (const key of keys) {
        expect(allCategoryItemIds).toContain(key);
      }
    });
  });
});

describe('DEMO_REGISTRY', () => {
  it('has an entry for every GLOSSARY_DATA key', () => {
    for (const key of keys) {
      expect(DEMO_REGISTRY).toHaveProperty(key);
    }
  });

  it('every entry is an object (lazy React component)', () => {
    for (const key of keys) {
      // React.lazy returns an object with $$typeof set to REACT_LAZY_TYPE
      expect(typeof DEMO_REGISTRY[key]).toBe('object');
      expect(DEMO_REGISTRY[key]).not.toBeNull();
    }
  });
});
