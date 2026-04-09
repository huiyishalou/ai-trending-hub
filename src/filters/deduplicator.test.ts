import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { deduplicator } from './deduplicator';
import { TrendingItem } from '../models/trending-item';

describe('Deduplicator', () => {
  const createItem = (url: string, title: string = 'Test'): TrendingItem => ({
    id: `test-${Math.random()}`,
    title,
    description: 'Test description',
    url,
    source: 'github',
    score: 100,
    tags: [],
    fetchedAt: new Date(),
  });

  beforeEach(() => {
    deduplicator.clear();
  });

  afterEach(() => {
    deduplicator.clear();
  });

  describe('deduplicate', () => {
    it('should return all items when no duplicates', async () => {
      const items = [
        createItem('https://example.com/1', 'Item 1'),
        createItem('https://example.com/2', 'Item 2'),
        createItem('https://example.com/3', 'Item 3'),
      ];

      const result = await deduplicator.deduplicate(items);
      expect(result).toHaveLength(3);
      expect(result).toEqual(items);
    });

    it('should remove duplicate URLs', async () => {
      const items = [
        createItem('https://example.com/repo', 'Item 1'),
        createItem('https://example.com/repo', 'Item 2'),
        createItem('https://example.com/other', 'Item 3'),
      ];

      const result = await deduplicator.deduplicate(items);
      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Item 1');
      expect(result[1].title).toBe('Item 3');
    });

    it('should normalize URLs before deduplication', async () => {
      const items = [
        createItem('https://example.com/repo', 'Item 1'),
        createItem('https://example.com/repo/', 'Item 2'), // trailing slash
        createItem('https://example.com/repo?ref=main', 'Item 3'), // query params
      ];

      const result = await deduplicator.deduplicate(items);
      expect(result).toHaveLength(1);
    });

    it('should be case-insensitive', async () => {
      const items = [
        createItem('https://example.com/Repo', 'Item 1'),
        createItem('https://example.com/repo', 'Item 2'),
      ];

      const result = await deduplicator.deduplicate(items);
      expect(result).toHaveLength(1);
    });

    it('should persist seen URLs across calls', async () => {
      const items1 = [createItem('https://example.com/1', 'Item 1')];
      const items2 = [createItem('https://example.com/1', 'Item 1 Duplicate')];

      await deduplicator.deduplicate(items1);
      const result = await deduplicator.deduplicate(items2);

      expect(result).toHaveLength(0);
    });

    it('should handle empty array', async () => {
      const result = await deduplicator.deduplicate([]);
      expect(result).toHaveLength(0);
    });

    it('should handle mixed duplicates and unique items', async () => {
      const items = [
        createItem('https://example.com/1', 'Item 1'),
        createItem('https://example.com/2', 'Item 2'),
        createItem('https://example.com/1', 'Item 1 Dup'),
        createItem('https://example.com/3', 'Item 3'),
        createItem('https://example.com/2', 'Item 2 Dup'),
      ];

      const result = await deduplicator.deduplicate(items);
      expect(result).toHaveLength(3);
      expect(result.map((i) => i.url)).toEqual([
        'https://example.com/1',
        'https://example.com/2',
        'https://example.com/3',
      ]);
    });
  });

  describe('clear', () => {
    it('should clear all seen URLs', async () => {
      const items = [createItem('https://example.com/1', 'Item 1')];
      await deduplicator.deduplicate(items);

      deduplicator.clear();

      const result = await deduplicator.deduplicate(items);
      expect(result).toHaveLength(1);
    });
  });
});
