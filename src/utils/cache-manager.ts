import logger from './logger';
import { cache } from './cache';

interface CacheStats {
  hits: number;
  misses: number;
  hitRate: number;
  itemsCount: number;
}

export class CacheManager {
  private stats = {
    hits: 0,
    misses: 0,
  };

  private readonly CACHE_KEYS = {
    GITHUB_TRENDING: 'github_trending',
    HN_TRENDING: 'hn_trending',
    SEEN_URLS: 'seen_urls',
    FILTER_RESULTS: 'filter_results',
  };

  /**
   * 获取缓存的 GitHub 趋势数据
   */
  getGithubTrending() {
    return this.getWithStats(this.CACHE_KEYS.GITHUB_TRENDING);
  }

  /**
   * 缓存 GitHub 趋势数据
   */
  setGithubTrending(data: any, ttlMinutes: number = 60) {
    this.setWithStats(this.CACHE_KEYS.GITHUB_TRENDING, data, ttlMinutes);
  }

  /**
   * 获取缓存的 HN 趋势数据
   */
  getHNTrending() {
    return this.getWithStats(this.CACHE_KEYS.HN_TRENDING);
  }

  /**
   * 缓存 HN 趋势数据
   */
  setHNTrending(data: any, ttlMinutes: number = 60) {
    this.setWithStats(this.CACHE_KEYS.HN_TRENDING, data, ttlMinutes);
  }

  /**
   * 获取缓存的已见 URL
   */
  getSeenUrls() {
    return this.getWithStats(this.CACHE_KEYS.SEEN_URLS);
  }

  /**
   * 缓存已见 URL
   */
  setSeenUrls(data: any, ttlMinutes: number = 1440) {
    // 24 hours default
    this.setWithStats(this.CACHE_KEYS.SEEN_URLS, data, ttlMinutes);
  }

  /**
   * 获取缓存的过滤结果
   */
  getFilterResults(key: string) {
    return this.getWithStats(`${this.CACHE_KEYS.FILTER_RESULTS}_${key}`);
  }

  /**
   * 缓存过滤结果
   */
  setFilterResults(key: string, data: any, ttlMinutes: number = 120) {
    this.setWithStats(`${this.CACHE_KEYS.FILTER_RESULTS}_${key}`, data, ttlMinutes);
  }

  /**
   * 清除所有缓存
   */
  clearAll() {
    cache.clear();
    this.stats = { hits: 0, misses: 0 };
    logger.info('All caches cleared');
  }

  /**
   * 获取缓存统计信息
   */
  getStats(): CacheStats {
    const total = this.stats.hits + this.stats.misses;
    const hitRate = total > 0 ? (this.stats.hits / total) * 100 : 0;

    return {
      hits: this.stats.hits,
      misses: this.stats.misses,
      hitRate: Math.round(hitRate * 100) / 100,
      itemsCount: 0, // 无法直接获取，需要扩展 Cache 类
    };
  }

  /**
   * 重置统计信息
   */
  resetStats() {
    this.stats = { hits: 0, misses: 0 };
  }

  /**
   * 打印缓存统计信息
   */
  printStats() {
    const stats = this.getStats();
    logger.info('Cache Statistics:', {
      hits: stats.hits,
      misses: stats.misses,
      hitRate: `${stats.hitRate}%`,
    });
  }

  private getWithStats(key: string) {
    const value = cache.get(key);
    if (value !== null) {
      this.stats.hits++;
      logger.debug(`Cache hit: ${key}`);
    } else {
      this.stats.misses++;
      logger.debug(`Cache miss: ${key}`);
    }
    return value;
  }

  private setWithStats(key: string, value: any, ttlMinutes: number) {
    cache.set(key, value, ttlMinutes);
    logger.debug(`Cache set: ${key} (TTL: ${ttlMinutes}m)`);
  }
}

export const cacheManager = new CacheManager();
