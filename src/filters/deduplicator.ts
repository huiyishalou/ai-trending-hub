import { TrendingItem } from '../models/trending-item';
import { cache } from '../utils/cache';
import logger from '../utils/logger';

export class Deduplicator {
  private seenUrls: Set<string> = new Set();
  private cacheKey = 'seen_urls';

  constructor() {
    this.loadFromCache();
  }

  private loadFromCache(): void {
    const cached = cache.get(this.cacheKey);
    if (cached) {
      this.seenUrls = new Set(cached);
      logger.debug(`Loaded ${this.seenUrls.size} URLs from cache`);
    }
  }

  private saveToCache(): void {
    cache.set(this.cacheKey, Array.from(this.seenUrls), 24 * 60); // 24 hours
  }

  async deduplicate(items: TrendingItem[]): Promise<TrendingItem[]> {
    const unique: TrendingItem[] = [];
    const duplicates: string[] = [];

    for (const item of items) {
      const urlHash = this.hashUrl(item.url);
      if (this.seenUrls.has(urlHash)) {
        duplicates.push(item.url);
      } else {
        unique.push(item);
        this.seenUrls.add(urlHash);
      }
    }

    this.saveToCache();

    if (duplicates.length > 0) {
      logger.info(`Removed ${duplicates.length} duplicate items`);
    }

    return unique;
  }

  private hashUrl(url: string): string {
    // 简单的 URL 规范化和哈希
    const normalized = url.toLowerCase().replace(/\/$/, '').replace(/\?.*$/, '');
    return normalized;
  }

  clear(): void {
    this.seenUrls.clear();
    cache.clear();
  }
}

export const deduplicator = new Deduplicator();
