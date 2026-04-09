import 'dotenv/config';
import { format } from 'date-fns';
import { DailyDigest, TrendingItem } from './models/trending-item';
import { githubTrendingFetcher } from './fetchers/github-trending';
import { hackerNewsFetcher } from './fetchers/hacker-news';
import { CachedFetcher } from './fetchers/cached-fetcher';
import { cacheManager } from './utils/cache-manager';
import { aiFilter } from './filters/ai-filter';
import { deduplicator } from './filters/deduplicator';
import { readmePublisher } from './publishers/readme-publisher';
import { issuePublisher } from './publishers/issue-publisher';
import { discussionPublisher } from './publishers/discussion-publisher';
import logger from './utils/logger';
import { configValidator } from './utils/config-validator';
import { ErrorHandler, OperationLogger, ConfigError } from './utils/error-handler';

class TrendingAggregator {
  async run(): Promise<void> {
    const mainLogger = new OperationLogger('Daily Trending Aggregation');

    try {
      // 0. 验证配置
      const configLogger = new OperationLogger('Configuration Validation');
      try {
        const validationResult = configValidator.validate();
        configValidator.printReport(validationResult);

        if (!validationResult.valid) {
          throw new ConfigError('Configuration validation failed', {
            errors: validationResult.errors,
          });
        }
        configLogger.success('Configuration validated successfully');
      } catch (error) {
        configLogger.error(error);
        throw error;
      }

      // 1. 并行获取多个数据源
      const fetchLogger = new OperationLogger('Fetching from Multiple Sources');
      let githubItems = [];
      let hnItems = [];

      try {
        // 使用缓存的 fetcher
        const allItems = await CachedFetcher.fetchMultiple([
          {
            name: 'GitHub Trending',
            fetcher: () => githubTrendingFetcher.fetch(),
            options: { useCache: true, cacheTTL: 60 },
          },
          {
            name: 'Hacker News',
            fetcher: () => hackerNewsFetcher.fetch(),
            options: { useCache: true, cacheTTL: 60 },
          },
        ]);

        githubItems = allItems.filter((item) => item.source === 'github');
        hnItems = allItems.filter((item) => item.source === 'hackernews');

        fetchLogger.success('Data fetched from sources', {
          githubItems: githubItems.length,
          hnItems: hnItems.length,
        });
      } catch (error) {
        fetchLogger.error(error);
        throw error;
      }

      // 2. 合并所有项目
      let allItems = [...githubItems, ...hnItems];
      logger.info(`Total items fetched: ${allItems.length}`);

      if (allItems.length === 0) {
        logger.warn('No items fetched from any source');
      }

      // 3. 过滤 AI 相关内容
      const filterLogger = new OperationLogger('AI Content Filtering');
      try {
        const beforeFilter = allItems.length;
        allItems = allItems.filter((item) => aiFilter.isRelevant(item));
        filterLogger.success('AI filtering completed', {
          before: beforeFilter,
          after: allItems.length,
          filtered: beforeFilter - allItems.length,
        });
      } catch (error) {
        filterLogger.error(error);
        throw error;
      }

      // 4. 提取标签并计算分数
      const scoringLogger = new OperationLogger('Scoring and Tagging');
      try {
        allItems = allItems.map((item) => ({
          ...item,
          tags: aiFilter.extractTags(item),
          score: aiFilter.calculateScore(item),
        }));

        // 记录置信度信息
        allItems.forEach((item) => {
          const confidence = aiFilter.getConfidence(item);
          logger.debug(`Item: ${item.title} | Confidence: ${(confidence * 100).toFixed(1)}% | Tags: ${item.tags.join(', ')}`);
        });

        scoringLogger.success('Scoring and tagging completed', {
          itemsProcessed: allItems.length,
        });
      } catch (error) {
        scoringLogger.error(error);
        throw error;
      }

      // 5. 去重
      const dedupeLogger = new OperationLogger('Deduplication');
      try {
        const beforeDedupe = allItems.length;
        allItems = await deduplicator.deduplicate(allItems);
        dedupeLogger.success('Deduplication completed', {
          before: beforeDedupe,
          after: allItems.length,
          duplicates: beforeDedupe - allItems.length,
        });
      } catch (error) {
        dedupeLogger.error(error);
        throw error;
      }

      // 6. 排序（按热度）
      allItems.sort((a, b) => b.score - a.score);

      // 7. 生成摘要
      const digest = this.generateDigest(allItems);

      // 8. 发布到多个渠道
      const publishLogger = new OperationLogger('Publishing to Multiple Channels');
      try {
        const results = await Promise.allSettled([
          this.publishReadme(digest),
          this.publishIssue(digest),
          this.publishDiscussion(digest),
        ]);

        const succeeded = results.filter((r) => r.status === 'fulfilled').length;
        const failed = results.filter((r) => r.status === 'rejected').length;

        publishLogger.success('Publishing completed', {
          succeeded,
          failed,
        });

        if (failed > 0) {
          logger.warn(`${failed} publishing channel(s) failed, but continuing`);
        }
      } catch (error) {
        publishLogger.error(error);
        throw error;
      }

      mainLogger.success('Daily trending aggregation completed successfully', {
        totalItems: allItems.length,
      });

      // 打印缓存统计信息
      cacheManager.printStats();
    } catch (error) {
      mainLogger.error(error);
      ErrorHandler.handleAsync(error, {
        operation: 'Daily Trending Aggregation',
      });
    }
  }

  private generateDigest(items: TrendingItem[]): DailyDigest {
    const today = format(new Date(), 'yyyy-MM-dd');

    return {
      date: today,
      items,
      summary: `Found ${items.length} trending AI/LLM items`,
      generatedAt: new Date(),
    };
  }

  private async publishReadme(digest: DailyDigest): Promise<void> {
    const logger = new OperationLogger('README Publishing', { channel: 'readme' });
    try {
      await readmePublisher.publish(digest);
      logger.success(`Published ${digest.items.length} items to README`);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  private async publishIssue(digest: DailyDigest): Promise<void> {
    const logger = new OperationLogger('Issue Publishing', { channel: 'issue' });
    try {
      if (!process.env.GITHUB_REPOSITORY) {
        logger.warn('GITHUB_REPOSITORY not set, skipping Issue publish');
        return;
      }
      await issuePublisher.publish(digest);
      logger.success(`Published ${digest.items.length} items as GitHub Issue`);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  private async publishDiscussion(digest: DailyDigest): Promise<void> {
    const logger = new OperationLogger('Discussion Publishing', { channel: 'discussion' });
    try {
      if (!process.env.GITHUB_REPOSITORY) {
        logger.warn('GITHUB_REPOSITORY not set, skipping Discussion publish');
        return;
      }
      await discussionPublisher.publish(digest);
      logger.success(`Published ${digest.items.length} items as GitHub Discussion`);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}

// 运行
const aggregator = new TrendingAggregator();
aggregator.run();
