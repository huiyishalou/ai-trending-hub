import logger from './logger';

interface ConfigSchema {
  name: string;
  required: boolean;
  type: 'string' | 'number' | 'boolean';
  default?: string | number | boolean;
  validate?: (value: string) => boolean;
  description: string;
}

class ConfigValidator {
  private schema: ConfigSchema[] = [
    {
      name: 'GITHUB_TOKEN',
      required: true,
      type: 'string',
      description: 'GitHub API token for repository access',
      validate: (value) => value.length > 0 && value.startsWith('ghp_'),
    },
    {
      name: 'LOG_LEVEL',
      required: false,
      type: 'string',
      default: 'info',
      description: 'Logging level (debug, info, warn, error)',
      validate: (value) => ['debug', 'info', 'warn', 'error'].includes(value),
    },
    {
      name: 'CACHE_TTL_MINUTES',
      required: false,
      type: 'number',
      default: 60,
      description: 'Cache time-to-live in minutes',
      validate: (value) => !isNaN(Number(value)) && Number(value) > 0,
    },
    {
      name: 'MAX_ITEMS_PER_SOURCE',
      required: false,
      type: 'number',
      default: 30,
      description: 'Maximum items to fetch from each source',
      validate: (value) => !isNaN(Number(value)) && Number(value) > 0,
    },
    {
      name: 'AI_RELEVANCE_THRESHOLD',
      required: false,
      type: 'number',
      default: 0.3,
      description: 'AI relevance confidence threshold (0-1)',
      validate: (value) => {
        const num = Number(value);
        return !isNaN(num) && num >= 0 && num <= 1;
      },
    },
    {
      name: 'PRODUCT_HUNT_API_KEY',
      required: false,
      type: 'string',
      description: 'Product Hunt API key (optional)',
    },
    {
      name: 'GITHUB_REPOSITORY',
      required: false,
      type: 'string',
      description: 'GitHub repository in format owner/repo (auto-set by GitHub Actions)',
    },
  ];

  validate(): { valid: boolean; errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const config of this.schema) {
      const value = process.env[config.name];

      // Check required fields
      if (config.required && !value) {
        errors.push(`Missing required environment variable: ${config.name}`);
        continue;
      }

      // Use default if not provided
      if (!value && config.default !== undefined) {
        process.env[config.name] = String(config.default);
        logger.debug(`Using default value for ${config.name}: ${config.default}`);
        continue;
      }

      // Validate if value exists
      if (value) {
        // Type validation
        if (config.type === 'number') {
          if (isNaN(Number(value))) {
            errors.push(`${config.name} must be a number, got: ${value}`);
            continue;
          }
        }

        // Custom validation
        if (config.validate && !config.validate(value)) {
          errors.push(`${config.name} validation failed: ${value} (${config.description})`);
        }
      }
    }

    // Check for Node.js version
    const nodeVersion = process.versions.node;
    const majorVersion = parseInt(nodeVersion.split('.')[0], 10);
    if (majorVersion < 18) {
      warnings.push(`Node.js version ${nodeVersion} detected. Recommended: 18+`);
    }

    // Check for required files
    const fs = require('fs');
    const requiredFiles = ['package.json', 'tsconfig.json'];
    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) {
        warnings.push(`Missing file: ${file}`);
      }
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  printReport(result: { valid: boolean; errors: string[]; warnings: string[] }): void {
    if (result.errors.length > 0) {
      logger.error('Configuration validation failed:');
      result.errors.forEach((error) => logger.error(`  ✗ ${error}`));
    }

    if (result.warnings.length > 0) {
      logger.warn('Configuration warnings:');
      result.warnings.forEach((warning) => logger.warn(`  ⚠ ${warning}`));
    }

    if (result.valid && result.warnings.length === 0) {
      logger.info('✓ Configuration validation passed');
    }
  }

  printSchema(): void {
    logger.info('Configuration Schema:');
    logger.info('');
    this.schema.forEach((config) => {
      const required = config.required ? '[REQUIRED]' : '[OPTIONAL]';
      const defaultVal = config.default !== undefined ? ` (default: ${config.default})` : '';
      logger.info(`${config.name} ${required}${defaultVal}`);
      logger.info(`  ${config.description}`);
    });
  }
}

export const configValidator = new ConfigValidator();
