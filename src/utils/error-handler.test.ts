import { describe, it, expect } from 'vitest';
import {
  AppError,
  ValidationError,
  FetchError,
  PublishError,
  ConfigError,
  ErrorHandler,
  OperationLogger,
} from './error-handler';

describe('Error Classes', () => {
  describe('AppError', () => {
    it('should create an AppError with all properties', () => {
      const error = new AppError('TEST_ERROR', 'Test message', 500, { detail: 'test' });
      expect(error.code).toBe('TEST_ERROR');
      expect(error.message).toBe('Test message');
      expect(error.statusCode).toBe(500);
      expect(error.context).toEqual({ detail: 'test' });
    });

    it('should convert to JSON', () => {
      const error = new AppError('TEST_ERROR', 'Test message', 500, { detail: 'test' });
      const json = error.toJSON();
      expect(json.code).toBe('TEST_ERROR');
      expect(json.message).toBe('Test message');
      expect(json.statusCode).toBe(500);
    });
  });

  describe('ValidationError', () => {
    it('should create a ValidationError with 400 status', () => {
      const error = new ValidationError('Invalid input', { field: 'email' });
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.statusCode).toBe(400);
      expect(error.context).toEqual({ field: 'email' });
    });
  });

  describe('FetchError', () => {
    it('should create a FetchError with 503 status', () => {
      const error = new FetchError('Network timeout', { url: 'https://example.com' });
      expect(error.code).toBe('FETCH_ERROR');
      expect(error.statusCode).toBe(503);
      expect(error.context).toEqual({ url: 'https://example.com' });
    });
  });

  describe('PublishError', () => {
    it('should create a PublishError with 500 status', () => {
      const error = new PublishError('Failed to publish', { channel: 'github' });
      expect(error.code).toBe('PUBLISH_ERROR');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('ConfigError', () => {
    it('should create a ConfigError with 400 status', () => {
      const error = new ConfigError('Missing config', { variable: 'GITHUB_TOKEN' });
      expect(error.code).toBe('CONFIG_ERROR');
      expect(error.statusCode).toBe(400);
    });
  });
});

describe('ErrorHandler', () => {
  it('should handle AppError', () => {
    const error = new AppError('TEST_ERROR', 'Test message', 500);
    expect(() => {
      ErrorHandler.handle(error, { operation: 'test' });
    }).not.toThrow();
  });

  it('should handle standard Error', () => {
    const error = new Error('Standard error');
    expect(() => {
      ErrorHandler.handle(error, { operation: 'test' });
    }).not.toThrow();
  });

  it('should handle unknown error', () => {
    expect(() => {
      ErrorHandler.handle('unknown error', { operation: 'test' });
    }).not.toThrow();
  });
});

describe('OperationLogger', () => {
  it('should create an OperationLogger', () => {
    const logger = new OperationLogger('Test Operation');
    expect(logger).toBeDefined();
  });

  it('should log success', () => {
    const logger = new OperationLogger('Test Operation');
    expect(() => {
      logger.success('Operation completed');
    }).not.toThrow();
  });

  it('should log warning', () => {
    const logger = new OperationLogger('Test Operation');
    expect(() => {
      logger.warn('Operation warning');
    }).not.toThrow();
  });

  it('should log error', () => {
    const logger = new OperationLogger('Test Operation');
    const error = new Error('Test error');
    expect(() => {
      logger.error(error);
    }).not.toThrow();
  });

  it('should include context in logs', () => {
    const logger = new OperationLogger('Test Operation', { userId: '123' });
    expect(() => {
      logger.success('Operation completed', { itemsProcessed: 10 });
    }).not.toThrow();
  });
});
