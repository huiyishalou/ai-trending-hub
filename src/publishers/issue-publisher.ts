import { Octokit } from 'octokit';
import { DailyDigest } from '../models/trending-item';
import logger from '../utils/logger';
import { withRetry } from '../utils/retry';

export class IssuePublisher {
  private octokit: Octokit;
  private owner: string;
  private repo: string;

  constructor() {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error('GITHUB_TOKEN environment variable is required');
    }

    this.octokit = new Octokit({ auth: token });

    // 从 GITHUB_REPOSITORY 环境变量获取 owner/repo
    const repository = process.env.GITHUB_REPOSITORY || '';
    const [owner, repo] = repository.split('/');

    if (!owner || !repo) {
      throw new Error('GITHUB_REPOSITORY environment variable must be set to owner/repo');
    }

    this.owner = owner;
    this.repo = repo;
  }

  async publish(digest: DailyDigest): Promise<void> {
    return withRetry(
      async () => {
        logger.info(`Publishing Issue to ${this.owner}/${this.repo}`);

        const title = `[Daily Digest] AI Trending - ${digest.date}`;
        const body = this.generateIssueBody(digest);

        const response = await this.octokit.rest.issues.create({
          owner: this.owner,
          repo: this.repo,
          title,
          body,
          labels: ['trending', 'ai', 'daily'],
        });

        logger.info(`Issue created: ${response.data.html_url}`);
      },
      3,
      2000,
      'Issue publish'
    );
  }

  private generateIssueBody(digest: DailyDigest): string {
    let body = `# AI Trending - ${digest.date}\n\n`;
    body += `Generated at: ${digest.generatedAt.toISOString()}\n\n`;

    if (digest.items.length === 0) {
      body += 'No trending items found today.\n';
      return body;
    }

    body += `## Summary\n\n`;
    body += `Found ${digest.items.length} trending AI/LLM items today.\n\n`;

    // 按来源分组
    const bySource = this.groupBySource(digest.items);

    for (const [source, items] of Object.entries(bySource)) {
      body += `### ${this.formatSourceName(source)}\n\n`;

      items.forEach((item, index) => {
        const tags = item.tags.length > 0 ? ` \`${item.tags.join('`, `')}\`` : '';
        const score = item.score > 0 ? ` (⭐ ${item.score})` : '';

        body += `${index + 1}. **[${item.title}](${item.url})**${tags}${score}\n`;
        body += `   - ${item.description}\n`;
        if (item.author) {
          body += `   - Author: ${item.author}\n`;
        }
        body += '\n';
      });
    }

    return body;
  }

  private groupBySource(items: any[]): Record<string, any[]> {
    return items.reduce(
      (acc, item) => {
        if (!acc[item.source]) {
          acc[item.source] = [];
        }
        acc[item.source].push(item);
        return acc;
      },
      {} as Record<string, any[]>
    );
  }

  private formatSourceName(source: string): string {
    const names: Record<string, string> = {
      github: 'GitHub Trending',
      hackernews: 'Hacker News',
      producthunt: 'Product Hunt',
    };
    return names[source] || source;
  }
}

export const issuePublisher = new IssuePublisher();
