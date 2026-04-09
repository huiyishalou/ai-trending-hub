import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import { githubTrendingFetcher } from './github-trending';

vi.mock('axios');

describe('GitHubTrendingFetcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('fetch', () => {
    it('should fetch and parse GitHub trending repositories', async () => {
      const mockHtml = `
        <article class="Box-row">
          <h2><a href="/owner/repo1">owner/repo1</a></h2>
          <p class="col-9">A great repository</p>
          <span class="d-inline-block float-sm-right">1,234 stars</span>
          <span itemprop="programmingLanguage">TypeScript</span>
        </article>
      `;

      vi.mocked(axios.get).mockResolvedValueOnce({ data: mockHtml });

      const items = await githubTrendingFetcher.fetch();

      expect(items).toHaveLength(1);
      expect(items[0].title).toBe('owner/repo1');
      expect(items[0].description).toBe('A great repository');
      expect(items[0].score).toBe(1234);
      expect(items[0].language).toBe('TypeScript');
      expect(items[0].source).toBe('github');
    });

    it('should handle multiple repositories', async () => {
      const mockHtml = `
        <article class="Box-row">
          <h2><a href="/owner/repo1">owner/repo1</a></h2>
          <p class="col-9">Repo 1</p>
          <span class="d-inline-block float-sm-right">100 stars</span>
        </article>
        <article class="Box-row">
          <h2><a href="/owner/repo2">owner/repo2</a></h2>
          <p class="col-9">Repo 2</p>
          <span class="d-inline-block float-sm-right">200 stars</span>
        </article>
      `;

      vi.mocked(axios.get).mockResolvedValueOnce({ data: mockHtml });

      const items = await githubTrendingFetcher.fetch();

      expect(items).toHaveLength(2);
      expect(items[0].title).toBe('owner/repo1');
      expect(items[1].title).toBe('owner/repo2');
    });

    it('should handle missing description', async () => {
      const mockHtml = `
        <article class="Box-row">
          <h2><a href="/owner/repo">owner/repo</a></h2>
          <span class="d-inline-block float-sm-right">100 stars</span>
        </article>
      `;

      vi.mocked(axios.get).mockResolvedValueOnce({ data: mockHtml });

      const items = await githubTrendingFetcher.fetch();

      expect(items[0].description).toBe('No description');
    });

    it('should respect MAX_ITEMS_PER_SOURCE limit', async () => {
      const mockHtml = Array(50)
        .fill(0)
        .map(
          (_, i) => `
        <article class="Box-row">
          <h2><a href="/owner/repo${i}">owner/repo${i}</a></h2>
          <p class="col-9">Repo ${i}</p>
          <span class="d-inline-block float-sm-right">${100 + i} stars</span>
        </article>
      `
        )
        .join('');

      vi.mocked(axios.get).mockResolvedValueOnce({ data: mockHtml });

      const items = await githubTrendingFetcher.fetch();

      expect(items.length).toBeLessThanOrEqual(30);
    });

    it('should include source information', async () => {
      const mockHtml = `
        <article class="Box-row">
          <h2><a href="/owner/repo">owner/repo</a></h2>
          <p class="col-9">Test repo</p>
          <span class="d-inline-block float-sm-right">100 stars</span>
        </article>
      `;

      vi.mocked(axios.get).mockResolvedValueOnce({ data: mockHtml });

      const items = await githubTrendingFetcher.fetch();

      expect(items[0].source).toBe('github');
      expect(items[0].url).toContain('https://github.com');
    });
  });
});
