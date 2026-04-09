import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import { readmePublisher } from './readme-publisher';
import { DailyDigest, TrendingItem } from '../models/trending-item';

vi.mock('fs');

describe('ReadmePublisher', () => {
  const createDigest = (items: TrendingItem[]): DailyDigest => ({
    date: '2024-01-01',
    items,
    summary: 'Test summary',
    generatedAt: new Date(),
  });

  const createItem = (title: string, url: string): TrendingItem => ({
    id: `test-${Math.random()}`,
    title,
    description: 'Test description',
    url,
    source: 'github',
    score: 100,
    tags: ['LLM'],
    fetchedAt: new Date(),
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('publish', () => {
    it('should create README if it does not exist', async () => {
      vi.mocked(fs.existsSync).mockReturnValueOnce(false);
      vi.mocked(fs.writeFileSync).mockImplementation(() => {});

      const digest = createDigest([createItem('Test Repo', 'https://example.com/repo')]);

      await readmePublisher.publish(digest);

      expect(vi.mocked(fs.writeFileSync)).toHaveBeenCalled();
      const content = vi.mocked(fs.writeFileSync).mock.calls[0][1];
      expect(content).toContain('AI Trending Hub');
      expect(content).toContain('Test Repo');
    });

    it('should update existing README with trending markers', async () => {
      const existingContent = `# AI Trending Hub

## Latest Trending

<!-- TRENDING_START -->
<!-- TRENDING_END -->

## About
This is a test.`;

      vi.mocked(fs.existsSync).mockReturnValueOnce(true);
      vi.mocked(fs.readFileSync).mockReturnValueOnce(existingContent);
      vi.mocked(fs.writeFileSync).mockImplementation(() => {});

      const digest = createDigest([createItem('New Repo', 'https://example.com/new')]);

      await readmePublisher.publish(digest);

      const updatedContent = vi.mocked(fs.writeFileSync).mock.calls[0][1];
      expect(updatedContent).toContain('<!-- TRENDING_START -->');
      expect(updatedContent).toContain('New Repo');
      expect(updatedContent).toContain('<!-- TRENDING_END -->');
      expect(updatedContent).toContain('## About');
    });

    it('should format items with tags and scores', async () => {
      vi.mocked(fs.existsSync).mockReturnValueOnce(false);
      vi.mocked(fs.writeFileSync).mockImplementation(() => {});

      const item = createItem('Test Repo', 'https://example.com/repo');
      item.tags = ['LLM', 'Vision'];
      item.score = 500;

      const digest = createDigest([item]);

      await readmePublisher.publish(digest);

      const content = vi.mocked(fs.writeFileSync).mock.calls[0][1];
      expect(content).toContain('`LLM`, `Vision`');
      expect(content).toContain('⭐ 500');
    });

    it('should handle empty digest', async () => {
      vi.mocked(fs.existsSync).mockReturnValueOnce(false);
      vi.mocked(fs.writeFileSync).mockImplementation(() => {});

      const digest = createDigest([]);

      await readmePublisher.publish(digest);

      const content = vi.mocked(fs.writeFileSync).mock.calls[0][1];
      expect(content).toContain('No trending items found');
    });

    it('should retry on failure', async () => {
      vi.mocked(fs.existsSync).mockReturnValueOnce(false);
      vi.mocked(fs.writeFileSync)
        .mockImplementationOnce(() => {
          throw new Error('Write failed');
        })
        .mockImplementationOnce(() => {
          throw new Error('Write failed');
        })
        .mockImplementationOnce(() => {});

      const digest = createDigest([createItem('Test', 'https://example.com')]);

      await readmePublisher.publish(digest);

      expect(vi.mocked(fs.writeFileSync)).toHaveBeenCalledTimes(3);
    });

    it('should include source information', async () => {
      vi.mocked(fs.existsSync).mockReturnValueOnce(false);
      vi.mocked(fs.writeFileSync).mockImplementation(() => {});

      const item = createItem('Test Repo', 'https://example.com/repo');
      item.source = 'hackernews';

      const digest = createDigest([item]);

      await readmePublisher.publish(digest);

      const content = vi.mocked(fs.writeFileSync).mock.calls[0][1];
      expect(content).toContain('Source: hackernews');
    });
  });
});
