import { CATEGORIES, CATEGORY_COLORS } from '../data/categories';

const REQUIRED_COLOR_KEYS = ['text', 'bg', 'border', 'active', 'hover', 'dot', 'accent', 'gradient'];
const KNOWN_CATEGORY_IDS = ['overlays', 'inputs', 'data', 'forms', 'layout', 'navigation', 'interactions', 'feedback', 'marketing'];

describe('CATEGORIES', () => {
  it('is an array with 9 items', () => {
    expect(Array.isArray(CATEGORIES)).toBe(true);
    expect(CATEGORIES).toHaveLength(9);
  });

  it('each category has required properties: id, name, type, icon, items', () => {
    CATEGORIES.forEach((category) => {
      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('name');
      expect(category).toHaveProperty('type');
      expect(category).toHaveProperty('icon');
      expect(category).toHaveProperty('items');
    });
  });

  it('each category id is a non-empty string', () => {
    CATEGORIES.forEach((category) => {
      expect(typeof category.id).toBe('string');
      expect(category.id.length).toBeGreaterThan(0);
    });
  });

  it('each category name is a non-empty string', () => {
    CATEGORIES.forEach((category) => {
      expect(typeof category.name).toBe('string');
      expect(category.name.length).toBeGreaterThan(0);
    });
  });

  it('each category type is a non-empty string', () => {
    CATEGORIES.forEach((category) => {
      expect(typeof category.type).toBe('string');
      expect(category.type.length).toBeGreaterThan(0);
    });
  });

  it("each category's items is a non-empty array", () => {
    CATEGORIES.forEach((category) => {
      expect(Array.isArray(category.items)).toBe(true);
      expect(category.items.length).toBeGreaterThan(0);
    });
  });

  it('each item has id (string) and name (string)', () => {
    CATEGORIES.forEach((category) => {
      category.items.forEach((item) => {
        expect(typeof item.id).toBe('string');
        expect(item.id.length).toBeGreaterThan(0);
        expect(typeof item.name).toBe('string');
        expect(item.name.length).toBeGreaterThan(0);
      });
    });
  });

  it('all item IDs are unique across all categories (no duplicates)', () => {
    const allIds = CATEGORIES.flatMap((category) => category.items.map((item) => item.id));
    const uniqueIds = new Set(allIds);
    expect(uniqueIds.size).toBe(allIds.length);
  });

  it('total item count across all categories equals 101', () => {
    const total = CATEGORIES.reduce((sum, category) => sum + category.items.length, 0);
    expect(total).toBe(101);
  });

  it('category IDs match the known set', () => {
    const actualIds = CATEGORIES.map((category) => category.id);
    expect(actualIds).toEqual(expect.arrayContaining(KNOWN_CATEGORY_IDS));
    expect(KNOWN_CATEGORY_IDS).toEqual(expect.arrayContaining(actualIds));
    expect(actualIds).toHaveLength(KNOWN_CATEGORY_IDS.length);
  });
});

describe('CATEGORY_COLORS', () => {
  it('is an object', () => {
    expect(typeof CATEGORY_COLORS).toBe('object');
    expect(CATEGORY_COLORS).not.toBeNull();
    expect(Array.isArray(CATEGORY_COLORS)).toBe(false);
  });

  it('has an entry for every category id in CATEGORIES', () => {
    CATEGORIES.forEach((category) => {
      expect(CATEGORY_COLORS).toHaveProperty(category.id);
    });
  });

  it('each color entry has all 8 required keys', () => {
    Object.entries(CATEGORY_COLORS).forEach(([id, colors]) => {
      REQUIRED_COLOR_KEYS.forEach((key) => {
        expect(colors).toHaveProperty(key);
      });
    });
  });

  it('all color values are non-empty strings', () => {
    Object.entries(CATEGORY_COLORS).forEach(([id, colors]) => {
      REQUIRED_COLOR_KEYS.forEach((key) => {
        expect(typeof colors[key]).toBe('string');
        expect(colors[key].length).toBeGreaterThan(0);
      });
    });
  });

  it('has no extra entries beyond the known category IDs', () => {
    const colorKeys = Object.keys(CATEGORY_COLORS);
    expect(colorKeys).toEqual(expect.arrayContaining(KNOWN_CATEGORY_IDS));
    expect(KNOWN_CATEGORY_IDS).toEqual(expect.arrayContaining(colorKeys));
    expect(colorKeys).toHaveLength(KNOWN_CATEGORY_IDS.length);
  });
});
