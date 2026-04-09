import axios from 'axios';
import { TrendingItem } from '../models/trending-item';
import logger from '../utils/logger';
import { withRetry } from '../utils/retry';

interface HNStory {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  time: number;
  type: string;
}

export class HackerNewsFetcher {
  private baseUrl = 'https://hacker-news.firebaseio.com/v0';
  private maxItems = parseInt(process.env.MAX_ITEMS_PER_SOURCE || '30', 10);

  async fetch(): Promise<TrendingItem[]> {
    return withRetry(
      async () => {
        logger.info('Fetching Hacker News top stories');

        // 获取热门故事 ID
        const topStoriesResponse = await axios.get(`${this.baseUrl}/topstories.json`, {
          timeout: 10000,
        });

        const storyIds = topStoriesResponse.data.slice(0, this.maxItems * 2); // 获取更多以过滤

        // 并行获取故事详情
        const stories = await Promise.all(
          storyIds.slice(0, this.maxItems).map((id: number) =>
            axios
              .get(`${this.baseUrl}/item/${id}.json`, { timeout: 5000 })
              .then((res) => res.data as HNStory)
              .catch(() => null)
          )
        );

        const items = stories
          .filter((story): story is HNStory => story !== null && story.type === 'story' && !!story.url)
          .map((story) => this.storyToItem(story));

        logger.info(`Found ${items.length} Hacker News stories`);
        return items;
      },
      3,
      2000,
      'Hacker News fetch'
    );
  }

  private storyToItem(story: HNStory): TrendingItem {
    return {
      id: `hn-${story.id}`,
      title: story.title,
      description: `By ${story.by} | ${story.score} points`,
      url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
      source: 'hackernews',
      score: story.score,
      tags: [],
      fetchedAt: new Date(),
      author: story.by,
    };
  }
}

export const hackerNewsFetcher = new HackerNewsFetcher();
