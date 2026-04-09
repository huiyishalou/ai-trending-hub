import { TrendingItem } from '../models/trending-item';
import { cacheManager } from '../utils/cache-manager';
import logger from '../utils/logger';

interface FetcherOptions {
  useCache: boolean;
  cacheTTL: number; // minutes
  maxRetries: number;
}

const DEFAULT_OPTIONS: FetcherOptions = {
  useCache: true,
  cacheTTL: 60,
  maxRetries: 3,
};

export class CachedFetcher {
  /**
   * 包装一个 fetcher 函数，添加缓存和性能监控
   */
  static async withCache<T extends TrendingItem[]>(
    name: string,
    fetcher: () => Promise<T>,
    options: Partial<FetcherOptions> = {}
  ): Promise<T> {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const startTime = Date.now();

    // 尝试从缓存获取
    if (opts.useCache) {
      const cached = cacheManager.getFilterResults(name);
      if (cached) {
        const duration = Date.now() - startTime;
        logger.info(`${name} fetched from cache in ${duration}ms`);
        return cached;
      }
    }

    // 执行 fetcher
    try {
      const result = await fetcher();
      const duration = Date.now() - startTime;

      // 缓存结果
      if (opts.useCache) {
        cacheManager.setFilterResults(name, result, opts.cacheTTL);
      }

      logger.info(`${name} fetched in ${duration}ms (${result.length} items)`);
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      logger.error(`${name} fetch failed after ${duration}ms`, error);
      throw error;
    }
  }

  /**
   * 批量获取多个数据源，支持并行和缓存
   */
  static async fetchMultiple(
    sources: Array<{
      name: string;
      fetcher: () => Promise<TrendingItem[]>;
      options?: Partial<FetcherOptions>;
    }>
  ): Promise<TrendingItem[]> {
    const startTime = Date.now();
    const results = await Promise.allSettled(
      sources.map((source) => this.withCache(source.name, source.fetcher, source.options))
    );

    const items: TrendingItem[] = [];
    const stats = {
      succeeded: 0,
      failed: 0,
      totalItems: 0,
    };

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        items.push(...result.value);
        stats.succeeded++;
        stats.totalItems += result.value.length;
      } else {
        logger.warn(`${sources[index].name} failed: ${result.reason}`);
        stats.failed++;
      }
    });

    const duration = Date.now() - startTime;
    logger.info(`Fetched from ${stats.succeeded} sources in ${duration}ms (${stats.totalItems} items)`, stats);

    return items;
  }
}
