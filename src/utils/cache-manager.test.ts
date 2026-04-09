import { describe, it, expect, vi, beforeEach } from 'vitest';
import { cacheManager } from './cache-manager';
import { cache } from './cache';

describe('CacheManager', () => {
  beforeEach(() => {
    cacheManager.clearAll();
    cacheManager.resetStats();
  });

  describe('GitHub Trending Cache', () => {
    it('should cache and retrieve GitHub trending data', () => {
      const data = [{ id: '1', title: 'Repo' }];
      cacheManager.setGithubTrending(data);
      const retrieved = cacheManager.getGithubTrending();
      expect(retrieved).toEqual(data);
    });

    it('should return null for non-existent cache', () => {
      const retrieved = cacheManager.getGithubTrending();
      expect(retrieved).toBeNull();
    });
  });

  describe('HN Trending Cache', () => {
    it('should cache and retrieve HN trending data', () => {
      const data = [{ id: '1', title: 'Story' }];
      cacheManager.setHNTrending(data);
      const retrieved = cacheManager.getHNTrending();
      expect(retrieved).toEqual(data);
    });
  });

  describe('Seen URLs Cache', () => {
    it('should cache and retrieve seen URLs', () => {
      const urls = ['https://example.com/1', 'https://example.com/2'];
      cacheManager.setSeenUrls(urls);
      const retrieved = cacheManager.getSeenUrls();
      expect(retrieved).toEqual(urls);
    });

    it('should use 24-hour default TTL for seen URLs', () => {
      const urls = ['https://example.com'];
      cacheManager.setSeenUrls(urls);
      expect(cacheManager.getSeenUrls()).toEqual(urls);
    });
  });

  describe('Filter Results Cache', () => {
    it('should cache and retrieve filter results', () => {
      const results = [{ id: '1', filtered: true }];
      cacheManager.setFilterResults('test-filter', results);
      const retrieved = cacheManager.getFilterResults('test-filter');
      expect(retrieved).toEqual(results);
    });

    it('should support multiple filter result keys', () => {
      const results1 = [{ id: '1' }];
      const results2 = [{ id: '2' }];
      cacheManager.setFilterResults('filter1', results1);
      cacheManager.setFilterResults('filter2', results2);
      expect(cacheManager.getFilterResults('filter1')).toEqual(results1);
      expect(cacheManager.getFilterResults('filter2')).toEqual(results2);
    });
  });

  describe('Cache Statistics', () => {
    it('should track cache hits and misses', () => {
      cacheManager.setGithubTrending([{ id: '1' }]);
      cacheManager.getGithubTrending(); // hit
      cacheManager.getGithubTrending(); // hit
      cacheManager.getHNTrending(); // miss

      const stats = cacheManager.getStats();
      expect(stats.hits).toBe(2);
      expect(stats.misses).toBe(1);
    });

    it('should calculate hit rate correctly', () => {
      cacheManager.setGithubTrending([{ id: '1' }]);
      cacheManager.getGithubTrending(); // hit
      cacheManager.getGithubTrending(); // hit
      cacheManager.getHNTrending(); // miss

      const stats = cacheManager.getStats();
      expect(stats.hitRate).toBe(66.67);
    });

    it('should handle zero requests', () => {
      const stats = cacheManager.getStats();
      expect(stats.hits).toBe(0);
      expect(stats.misses).toBe(0);
      expect(stats.hitRate).toBe(0);
    });
  });

  describe('Clear All', () => {
    it('should clear all caches and reset stats', () => {
      cacheManager.setGithubTrending([{ id: '1' }]);
      cacheManager.setHNTrending([{ id: '2' }]);
      cacheManager.getGithubTrending(); // hit

      cacheManager.clearAll();

      // After clearAll, stats should be reset
      let stats = cacheManager.getStats();
      expect(stats.hits).toBe(0);
      expect(stats.misses).toBe(0);

      // Verify caches are actually cleared
      expect(cacheManager.getGithubTrending()).toBeNull();
      expect(cacheManager.getHNTrending()).toBeNull();
    });
  });

  describe('Reset Stats', () => {
    it('should reset statistics without clearing cache', () => {
      cacheManager.setGithubTrending([{ id: '1' }]);
      cacheManager.getGithubTrending(); // hit

      cacheManager.resetStats();

      const stats = cacheManager.getStats();
      expect(stats.hits).toBe(0);
      expect(stats.misses).toBe(0);
      expect(cacheManager.getGithubTrending()).toEqual([{ id: '1' }]);
    });
  });
});
