import logger from './logger';
import { FetchError } from './error-handler';

export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000,
  label: string = 'Operation'
): Promise<T> {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (i === maxRetries - 1) {
        logger.error(`${label} failed after ${maxRetries} retries`, lastError);
        throw new FetchError(`${label} failed after ${maxRetries} retries`, {
          label,
          maxRetries,
          lastError: lastError.message,
        });
      }

      const delay = delayMs * Math.pow(2, i);
      logger.warn(`${label} failed (attempt ${i + 1}/${maxRetries}), retrying in ${delay}ms`, {
        error: lastError.message,
        attempt: i + 1,
        maxRetries,
        nextDelay: delay,
      });

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new FetchError(`${label} failed after ${maxRetries} retries`, {
    label,
    maxRetries,
  });
}
