import axios from 'axios';
import * as cheerio from 'cheerio';
import { TrendingItem } from '../models/trending-item';
import logger from '../utils/logger';
import { withRetry } from '../utils/retry';

export class GitHubTrendingFetcher {
  private baseUrl = 'https://github.com/trending';
  private maxItems = parseInt(process.env.MAX_ITEMS_PER_SOURCE || '30', 10);

  async fetch(language?: string): Promise<TrendingItem[]> {
    return withRetry(
      async () => {
        const url = language ? `${this.baseUrl}/${language}` : this.baseUrl;
        logger.info(`Fetching GitHub trending from ${url}`);

        const response = await axios.get(url, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          },
          timeout: 10000,
        });

        const items = this.parseHtml(response.data);
        logger.info(`Found ${items.length} trending repositories`);
        return items.slice(0, this.maxItems);
      },
      3,
      2000,
      'GitHub Trending fetch'
    );
  }

  private parseHtml(html: string): TrendingItem[] {
    const $ = cheerio.load(html);
    const items: TrendingItem[] = [];

    $('article.Box-row').each((index, element) => {
      try {
        const $el = $(element);

        // 提取仓库链接和名称
        const repoLink = $el.find('h2 a').attr('href')?.trim();
        if (!repoLink) return;

        const repoName = repoLink.replace(/^\//, '');
        const url = `https://github.com${repoLink}`;

        // 提取描述
        const description = $el
          .find('p.col-9')
          .text()
          .trim()
          .replace(/\s+/g, ' ');

        // 提取星数
        const starsText = $el
          .find('span.d-inline-block.float-sm-right')
          .first()
          .text()
          .trim();
        const stars = this.parseStars(starsText);

        // 提取编程语言
        const language = $el
          .find('span[itemprop="programmingLanguage"]')
          .text()
          .trim();

        const item: TrendingItem = {
          id: `github-${repoName}`,
          title: repoName,
          description: description || 'No description',
          url,
          source: 'github',
          score: stars,
          tags: language ? [language] : [],
          fetchedAt: new Date(),
          language,
          author: repoName.split('/')[0],
        };

        items.push(item);
      } catch (error) {
        logger.debug(`Error parsing repository element: ${error}`);
      }
    });

    return items;
  }

  private parseStars(starsText: string): number {
    const match = starsText.match(/[\d,]+/);
    if (!match) return 0;
    return parseInt(match[0].replace(/,/g, ''), 10);
  }
}

export const githubTrendingFetcher = new GitHubTrendingFetcher();
