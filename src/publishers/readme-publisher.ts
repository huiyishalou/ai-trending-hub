import * as fs from 'fs';
import * as path from 'path';
import { DailyDigest, TrendingItem } from '../models/trending-item';
import logger from '../utils/logger';
import { withRetry } from '../utils/retry';

export class ReadmePublisher {
  private readmePath = path.join(process.cwd(), 'README.md');
  private maxHistoryDays = 30;

  async publish(digest: DailyDigest): Promise<void> {
    return withRetry(
      async () => {
        logger.info('Publishing to README');

        let content = this.readOrCreateReadme();
        content = this.updateContent(content, digest);

        fs.writeFileSync(this.readmePath, content, 'utf-8');
        logger.info('README updated successfully');
      },
      3,
      1000,
      'README publish'
    );
  }

  private readOrCreateReadme(): string {
    if (fs.existsSync(this.readmePath)) {
      return fs.readFileSync(this.readmePath, 'utf-8');
    }

    return this.createDefaultReadme();
  }

  private createDefaultReadme(): string {
    return `# AI Trending Hub

Daily aggregation of trending AI/LLM content from GitHub, Hacker News, and more.

## Latest Trending

<!-- TRENDING_START -->
<!-- TRENDING_END -->

## About

This repository automatically collects and publishes trending AI and machine learning content daily.

### Sources
- GitHub Trending
- Hacker News
- Product Hunt

### Categories
- LLM (Large Language Models)
- Computer Vision
- NLP (Natural Language Processing)
- Reinforcement Learning
- Robotics
- Frameworks & Tools
- Research Papers
`;
  }

  private updateContent(content: string, digest: DailyDigest): string {
    const startMarker = '<!-- TRENDING_START -->';
    const endMarker = '<!-- TRENDING_END -->';

    const startIndex = content.indexOf(startMarker);
    const endIndex = content.indexOf(endMarker);

    if (startIndex === -1 || endIndex === -1) {
      logger.warn('Trending markers not found in README, appending content');
      return content + '\n\n' + this.generateTrendingSection(digest);
    }

    const beforeContent = content.substring(0, startIndex + startMarker.length);
    const afterContent = content.substring(endIndex);

    const trendingContent = this.generateTrendingSection(digest);

    return beforeContent + '\n' + trendingContent + '\n' + afterContent;
  }

  private generateTrendingSection(digest: DailyDigest): string {
    let section = `\n### ${digest.date}\n\n`;

    if (digest.items.length === 0) {
      section += 'No trending items found.\n';
      return section;
    }

    digest.items.forEach((item, index) => {
      const tags = item.tags.length > 0 ? ` \`${item.tags.join('`, `')}\`` : '';
      const score = item.score > 0 ? ` (⭐ ${item.score})` : '';

      section += `${index + 1}. **[${item.title}](${item.url})**${tags}${score}\n`;
      section += `   - ${item.description}\n`;
      section += `   - Source: ${item.source}\n\n`;
    });

    return section;
  }
}

export const readmePublisher = new ReadmePublisher();
