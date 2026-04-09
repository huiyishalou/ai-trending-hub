import { Octokit } from 'octokit';
import { DailyDigest } from '../models/trending-item';
import logger from '../utils/logger';
import { withRetry } from '../utils/retry';

export class DiscussionPublisher {
  private octokit: Octokit;
  private owner: string;
  private repo: string;

  constructor() {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error('GITHUB_TOKEN environment variable is required');
    }

    this.octokit = new Octokit({ auth: token });

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
        logger.info(`Publishing Discussion to ${this.owner}/${this.repo}`);

        // 首先获取 repository ID
        const repoQuery = `
          query {
            repository(owner: "${this.owner}", name: "${this.repo}") {
              id
              discussionCategories(first: 10) {
                nodes {
                  id
                  name
                }
              }
            }
          }
        `;

        const repoResponse = await this.octokit.graphql(repoQuery);
        const repo = (repoResponse as any).repository;
        const categoryId = repo.discussionCategories.nodes[0]?.id;

        if (!categoryId) {
          logger.warn('No discussion categories found, skipping discussion publish');
          return;
        }

        const title = `[Daily Digest] AI Trending - ${digest.date}`;
        const body = this.generateDiscussionBody(digest);

        const mutation = `
          mutation {
            createDiscussion(input: {
              repositoryId: "${repo.id}"
              categoryId: "${categoryId}"
              title: "${this.escapeGraphQL(title)}"
              body: "${this.escapeGraphQL(body)}"
            }) {
              discussion {
                url
              }
            }
          }
        `;

        const response = await this.octokit.graphql(mutation);
        const discussionUrl = (response as any).createDiscussion.discussion.url;

        logger.info(`Discussion created: ${discussionUrl}`);
      },
      3,
      2000,
      'Discussion publish'
    );
  }

  private generateDiscussionBody(digest: DailyDigest): string {
    let body = `# AI Trending - ${digest.date}\n\n`;

    if (digest.items.length === 0) {
      body += 'No trending items found today.\n';
      return body;
    }

    body += `Found **${digest.items.length}** trending AI/LLM items today!\n\n`;

    digest.items.slice(0, 10).forEach((item, index) => {
      const tags = item.tags.length > 0 ? ` \`${item.tags.join('`, `')}\`` : '';
      body += `${index + 1}. **[${item.title}](${item.url})**${tags}\n`;
      body += `   ${item.description}\n\n`;
    });

    if (digest.items.length > 10) {
      body += `... and ${digest.items.length - 10} more items!\n`;
    }

    return body;
  }

  private escapeGraphQL(str: string): string {
    return str.replace(/"/g, '\\"').replace(/\n/g, '\\n');
  }
}

export const discussionPublisher = new DiscussionPublisher();
