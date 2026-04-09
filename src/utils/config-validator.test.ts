import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { configValidator } from './config-validator';

describe('ConfigValidator', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('validate', () => {
    it('should fail when GITHUB_TOKEN is missing', () => {
      delete process.env.GITHUB_TOKEN;
      const result = configValidator.validate();
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('GITHUB_TOKEN'))).toBe(true);
    });

    it('should fail when GITHUB_TOKEN has invalid format', () => {
      process.env.GITHUB_TOKEN = 'invalid_token';
      const result = configValidator.validate();
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('GITHUB_TOKEN'))).toBe(true);
    });

    it('should pass with valid GITHUB_TOKEN', () => {
      process.env.GITHUB_TOKEN = 'ghp_validtoken123456789';
      const result = configValidator.validate();
      expect(result.errors.filter((e) => e.includes('GITHUB_TOKEN'))).toHaveLength(0);
    });

    it('should use default values for optional fields', () => {
      process.env.GITHUB_TOKEN = 'ghp_validtoken123456789';
      delete process.env.LOG_LEVEL;
      delete process.env.CACHE_TTL_MINUTES;
      configValidator.validate();
      expect(process.env.LOG_LEVEL).toBe('info');
      expect(process.env.CACHE_TTL_MINUTES).toBe('60');
    });

    it('should validate LOG_LEVEL enum', () => {
      process.env.GITHUB_TOKEN = 'ghp_validtoken123456789';
      process.env.LOG_LEVEL = 'invalid';
      const result = configValidator.validate();
      expect(result.errors.some((e) => e.includes('LOG_LEVEL'))).toBe(true);
    });

    it('should validate numeric fields', () => {
      process.env.GITHUB_TOKEN = 'ghp_validtoken123456789';
      process.env.CACHE_TTL_MINUTES = 'not_a_number';
      const result = configValidator.validate();
      expect(result.errors.some((e) => e.includes('CACHE_TTL_MINUTES'))).toBe(true);
    });

    it('should validate AI_RELEVANCE_THRESHOLD range', () => {
      process.env.GITHUB_TOKEN = 'ghp_validtoken123456789';
      process.env.AI_RELEVANCE_THRESHOLD = '1.5';
      const result = configValidator.validate();
      expect(result.errors.some((e) => e.includes('AI_RELEVANCE_THRESHOLD'))).toBe(true);
    });

    it('should accept valid AI_RELEVANCE_THRESHOLD', () => {
      process.env.GITHUB_TOKEN = 'ghp_validtoken123456789';
      process.env.AI_RELEVANCE_THRESHOLD = '0.5';
      const result = configValidator.validate();
      expect(result.errors.filter((e) => e.includes('AI_RELEVANCE_THRESHOLD'))).toHaveLength(0);
    });

    it('should pass with all valid configs', () => {
      process.env.GITHUB_TOKEN = 'ghp_validtoken123456789';
      process.env.LOG_LEVEL = 'info';
      process.env.CACHE_TTL_MINUTES = '60';
      process.env.MAX_ITEMS_PER_SOURCE = '30';
      process.env.AI_RELEVANCE_THRESHOLD = '0.3';
      const result = configValidator.validate();
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});
