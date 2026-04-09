import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CachedFetcher } from './cached-fetcher';
import { TrendingItem } from '../models/trending-item';
import { cacheManager } from '../utils/cache-manager';

describe('CachedFetcher', () => {
  const createItem = (id: string): TrendingItem => ({
    id,
    title: `Item ${id}`,
    description: 'Test',
    url: `https://example.com/${id}`,
    source: 'github',
    score: 100,
    tags: [],
    fetchedAt: new Date(),
  });

  beforeEach(() => {
    vi.clearAllMocks();
    cacheManager.clearAll();
  });

  afterEach(() => {
    cacheManager.clearAll();
  });

  describe('withCache', () => {
    it('should fetch and cache data', async () => {
      const fetcher = vi.fn(async () => [createItem('1')]);

      const result1 = await CachedFetcher.withCache('test', fetcher);
      const result2 = await CachedFetcher.withCache('test', fetcher);

      expect(result1).toHaveLength(1);
      expect(result1[0].id).toBe('1');
      expect(result2).toHaveLength(1);
      expect(result2[0].id).toBe('1');
      expect(fetcher).toHaveBeenCalledTimes(1); // Only called once due to cache
    });

    it('should skip cache when useCache is false', async () => {
      const fetcher = vi.fn(async () => [createItem('1')]);

      await CachedFetcher.withCache('test', fetcher, { useCache: false });
      await CachedFetcher.withCache('test', fetcher, { useCache: false });

      expect(fetcher).toHaveBeenCalledTimes(2); // Called twice, no cache
    });

    it('should handle fetcher errors', async () => {
      const fetcher = vi.fn(async () => {
        throw new Error('Fetch failed');
      });

      await expect(CachedFetcher.withCache('test', fetcher)).rejects.toThrow('Fetch failed');
    });

    it('should respect custom TTL', async () => {
      const fetcher = vi.fn(async () => [createItem('1')]);

      await CachedFetcher.withCache('test', fetcher, { cacheTTL: 120 });

      expect(fetcher).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetchMultiple', () => {
    it('should fetch from multiple sources in parallel', async () => {
      const fetcher1 = vi.fn(async () => [createItem('1')]);
      const fetcher2 = vi.fn(async () => [createItem('2')]);

      const result = await CachedFetcher.fetchMultiple([
        { name: 'Source1', fetcher: fetcher1 },
        { name: 'Source2', fetcher: fetcher2 },
      ]);

      expect(result).toHaveLength(2);
      expect(fetcher1).toHaveBeenCalledTimes(1);
      expect(fetcher2).toHaveBeenCalledTimes(1);
    });

    it('should handle partial failures', async () => {
      const fetcher1 = vi.fn(async () => [createItem('1')]);
      const fetcher2 = vi.fn(async () => {
        throw new Error('Failed');
      });

      const result = await CachedFetcher.fetchMultiple([
        { name: 'Source1', fetcher: fetcher1 },
        { name: 'Source2', fetcher: fetcher2 },
      ]);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('should combine results from multiple sources', async () => {
      const fetcher1 = vi.fn(async () => [createItem('1'), createItem('2')]);
      const fetcher2 = vi.fn(async () => [createItem('3')]);

      const result = await CachedFetcher.fetchMultiple([
        { name: 'Source1', fetcher: fetcher1, options: { useCache: false } },
        { name: 'Source2', fetcher: fetcher2, options: { useCache: false } },
      ]);

      expect(result).toHaveLength(3);
    });

    it('should cache results from multiple sources', async () => {
      const fetcher1 = vi.fn(async () => [createItem('1')]);
      const fetcher2 = vi.fn(async () => [createItem('2')]);

      await CachedFetcher.fetchMultiple([
        { name: 'Source1', fetcher: fetcher1, options: { useCache: true } },
        { name: 'Source2', fetcher: fetcher2, options: { useCache: true } },
      ]);

      await CachedFetcher.fetchMultiple([
        { name: 'Source1', fetcher: fetcher1, options: { useCache: true } },
        { name: 'Source2', fetcher: fetcher2, options: { useCache: true } },
      ]);

      expect(fetcher1).toHaveBeenCalledTimes(1); // Cached
      expect(fetcher2).toHaveBeenCalledTimes(1); // Cached
    });
  });
});
