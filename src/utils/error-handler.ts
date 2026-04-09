import logger from './logger';

export class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number = 500,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      context: this.context,
    };
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super('VALIDATION_ERROR', message, 400, context);
    this.name = 'ValidationError';
  }
}

export class FetchError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super('FETCH_ERROR', message, 503, context);
    this.name = 'FetchError';
  }
}

export class PublishError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super('PUBLISH_ERROR', message, 500, context);
    this.name = 'PublishError';
  }
}

export class ConfigError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super('CONFIG_ERROR', message, 400, context);
    this.name = 'ConfigError';
  }
}

interface ErrorContext {
  operation: string;
  duration?: number;
  itemsProcessed?: number;
  source?: string;
  [key: string]: any;
}

export class ErrorHandler {
  static handle(error: unknown, context: ErrorContext): void {
    const timestamp = new Date().toISOString();

    if (error instanceof AppError) {
      logger.error(
        {
          code: error.code,
          message: error.message,
          statusCode: error.statusCode,
          context: { ...error.context, ...context },
          timestamp,
        },
        `[${error.code}] ${error.message}`
      );
    } else if (error instanceof Error) {
      logger.error(
        {
          name: error.name,
          message: error.message,
          stack: error.stack,
          context,
          timestamp,
        },
        `[${error.name}] ${error.message}`
      );
    } else {
      logger.error(
        {
          error: String(error),
          context,
          timestamp,
        },
        'Unknown error occurred'
      );
    }
  }

  static handleAsync(error: unknown, context: ErrorContext): never {
    this.handle(error, context);
    process.exit(1);
  }
}

export class OperationLogger {
  private startTime: number;
  private operation: string;
  private context: Record<string, any>;

  constructor(operation: string, context?: Record<string, any>) {
    this.operation = operation;
    this.context = context || {};
    this.startTime = Date.now();
    logger.info(`Starting: ${operation}`);
  }

  success(message?: string, additionalContext?: Record<string, any>): void {
    const duration = Date.now() - this.startTime;
    logger.info(
      {
        operation: this.operation,
        status: 'success',
        duration,
        ...this.context,
        ...additionalContext,
      },
      message || `Completed: ${this.operation}`
    );
  }

  warn(message: string, additionalContext?: Record<string, any>): void {
    const duration = Date.now() - this.startTime;
    logger.warn(
      {
        operation: this.operation,
        status: 'warning',
        duration,
        ...this.context,
        ...additionalContext,
      },
      message
    );
  }

  error(error: unknown, additionalContext?: Record<string, any>): void {
    const duration = Date.now() - this.startTime;
    ErrorHandler.handle(error, {
      operation: this.operation,
      duration,
      ...this.context,
      ...additionalContext,
    });
  }
}
