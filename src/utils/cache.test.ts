import { describe, it, expect, beforeEach, vi } from 'vitest';
import { cache } from './cache';

describe('Cache', () => {
  beforeEach(() => {
    cache.clear();
  });

  describe('set and get', () => {
    it('should store and retrieve values', () => {
      cache.set('key1', 'value1');
      expect(cache.get('key1')).toBe('value1');
    });

    it('should store different types', () => {
      cache.set('string', 'value');
      cache.set('number', 42);
      cache.set('object', { a: 1, b: 2 });
      cache.set('array', [1, 2, 3]);

      expect(cache.get('string')).toBe('value');
      expect(cache.get('number')).toBe(42);
      expect(cache.get('object')).toEqual({ a: 1, b: 2 });
      expect(cache.get('array')).toEqual([1, 2, 3]);
    });

    it('should return null for non-existent keys', () => {
      expect(cache.get('nonexistent')).toBeNull();
    });

    it('should overwrite existing values', () => {
      cache.set('key', 'value1');
      cache.set('key', 'value2');
      expect(cache.get('key')).toBe('value2');
    });
  });

  describe('TTL expiry', () => {
    it('should expire values after TTL', () => {
      vi.useFakeTimers();
      cache.set('key', 'value', 1); // 1 minute TTL

      expect(cache.get('key')).toBe('value');

      // Advance time by 61 seconds
      vi.advanceTimersByTime(61 * 1000);

      expect(cache.get('key')).toBeNull();

      vi.useRealTimers();
    });

    it('should use default TTL of 60 minutes', () => {
      vi.useFakeTimers();
      cache.set('key', 'value'); // default 60 minutes

      vi.advanceTimersByTime(59 * 60 * 1000);
      expect(cache.get('key')).toBe('value');

      vi.advanceTimersByTime(2 * 60 * 1000);
      expect(cache.get('key')).toBeNull();

      vi.useRealTimers();
    });

    it('should support custom TTL', () => {
      vi.useFakeTimers();
      cache.set('key', 'value', 5); // 5 minutes

      vi.advanceTimersByTime(4 * 60 * 1000);
      expect(cache.get('key')).toBe('value');

      vi.advanceTimersByTime(2 * 60 * 1000);
      expect(cache.get('key')).toBeNull();

      vi.useRealTimers();
    });
  });

  describe('has', () => {
    it('should return true for existing non-expired keys', () => {
      cache.set('key', 'value');
      expect(cache.has('key')).toBe(true);
    });

    it('should return false for non-existent keys', () => {
      expect(cache.has('nonexistent')).toBe(false);
    });

    it('should return false for expired keys', () => {
      vi.useFakeTimers();
      cache.set('key', 'value', 1);

      vi.advanceTimersByTime(61 * 1000);
      expect(cache.has('key')).toBe(false);

      vi.useRealTimers();
    });
  });

  describe('clear', () => {
    it('should clear all cached values', () => {
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      cache.set('key3', 'value3');

      cache.clear();

      expect(cache.get('key1')).toBeNull();
      expect(cache.get('key2')).toBeNull();
      expect(cache.get('key3')).toBeNull();
    });

    it('should allow setting new values after clear', () => {
      cache.set('key', 'value1');
      cache.clear();
      cache.set('key', 'value2');

      expect(cache.get('key')).toBe('value2');
    });
  });

  describe('multiple keys', () => {
    it('should handle multiple independent keys', () => {
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      cache.set('key3', 'value3');

      expect(cache.get('key1')).toBe('value1');
      expect(cache.get('key2')).toBe('value2');
      expect(cache.get('key3')).toBe('value3');
    });

    it('should expire keys independently', () => {
      vi.useFakeTimers();
      cache.set('key1', 'value1', 1);
      cache.set('key2', 'value2', 2);

      vi.advanceTimersByTime(61 * 1000);
      expect(cache.get('key1')).toBeNull();
      expect(cache.get('key2')).toBe('value2');

      vi.advanceTimersByTime(61 * 1000);
      expect(cache.get('key2')).toBeNull();

      vi.useRealTimers();
    });
  });
});
