# AI Trending Hub

🤖 Daily aggregation of trending AI/LLM content from GitHub, Hacker News, and more.

## Features

- 🔄 **Automated Daily Updates** - Runs every day at UTC 8:00
- 🔍 **Multi-Source Aggregation** - Collects from GitHub Trending, Hacker News, and Product Hunt
- 🎯 **AI-Focused Filtering** - Intelligently filters for AI/LLM-related content
- 📝 **Multiple Publishing Channels** - Updates README, creates Issues, and publishes Discussions
- 🚀 **GitHub Actions Native** - Fully automated with GitHub Actions

## Latest Trending

<!-- TRENDING_START -->

### 2026-07-26

1. **[mattpocock/skills](https://github.com/mattpocock/skills)** `RL`, `Core` (⭐ 3153)
   - Skills for Real Engineers. Straight from my .agents directory.
   - Source: github

2. **[citrolabs/ego-lite](https://github.com/citrolabs/ego-lite)** `LLM`, `RL`, `Core` (⭐ 1814)
   - The fastest browser for AI agents to run web automation, built for sharing your logged-in browser state with your AI agents, like Codex or Claude Code, without disturbing you. Zero cost, zero config.
   - Source: github

3. **[ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)** `LLM`, `Core` (⭐ 1120)
   - A curated list of awesome Claude Skills, resources, and tools for customizing Claude AI workflows
   - Source: github

4. **[obra/superpowers](https://github.com/obra/superpowers)** `Framework`, `RL` (⭐ 886)
   - An agentic skills framework & software development methodology that works.
   - Source: github

5. **[palmier-io/palmier-pro](https://github.com/palmier-io/palmier-pro)** `LLM`, `Core` (⭐ 823)
   - macOS video editor built for AI
   - Source: github

6. **[alibaba/open-code-review](https://github.com/alibaba/open-code-review)** `LLM`, `RL`, `Core`, `Tools` (⭐ 821)
   - Open-source & free — Battle-tested at Alibaba's scale. Hybrid architecture code review tool: deterministic pipelines + LLM Agent, precise line-level comments, built-in fine-tuned ruleset (NPE, thread-safety, XSS, SQL injection), OpenAI & Anthropic compatible.
   - Source: github

7. **[The new rules of context engineering for Claude 5 generation models](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)** `LLM`, `NLP`, `Core` (⭐ 764)
   - By mellosouls | 331 points
   - Source: hackernews

8. **[affaan-m/ECC](https://github.com/affaan-m/ECC)** `LLM`, `RL`, `Research`, `Core` (⭐ 727)
   - The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond.
   - Source: github

9. **[Running a 28.9M parameter LLM on an $8 microcontroller](https://github.com/slvDev/esp32-ai)** `LLM`, `Robotics` (⭐ 457)
   - By boveyking | 187 points
   - Source: hackernews

10. **[Show HN: Brolly, a plain-text weather forecast site](https://brolly.sh/forecast/RWFP2qW8)** `NLP`, `Core` (⭐ 442)
   - By jsax | 192 points
   - Source: hackernews

11. **[DeepSeek pause fundraise after comments on compute gap to US leaked (transcript) [pdf]](https://github.com/demo-zexuan/liang-wenfeng-investor-meeting-2026-7-22/blob/master/%E6%A2%81%E6%96%87%E9%94%8B%E6%8A%95%E8%B5%84%E8%80%85%E4%BA%A4%E6%B5%81%E4%BC%9A-%E6%96%87%E5%AD%97%E7%A8%BF_1_18_translate_20260723201651.pdf)** `LLM`, `Core` (⭐ 378)
   - By oliculipolicula | 150 points
   - Source: hackernews


<!-- TRENDING_END -->

## Data Sources

### GitHub Trending
Monitors trending repositories on GitHub, focusing on AI/ML projects.

### Hacker News
Aggregates top stories from Hacker News related to AI and technology.

### Product Hunt
Tracks trending AI products and tools (optional).

## Content Categories

- **LLM** - Large Language Models (GPT, Claude, Llama, etc.)
- **Vision** - Computer Vision and Image Generation
- **NLP** - Natural Language Processing
- **RL** - Reinforcement Learning
- **Robotics** - Robotics and Autonomous Systems
- **Framework** - AI Frameworks and Libraries
- **Research** - Research Papers and Studies

## Setup

### Prerequisites
- Node.js 18.17+ (or Node.js 20+)
- GitHub repository with Actions enabled
- GitHub token with appropriate permissions

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/ai-trending-hub.git
cd ai-trending-hub
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables:
```env
GITHUB_TOKEN=your_github_token
LOG_LEVEL=info
MAX_ITEMS_PER_SOURCE=30
```

### Local Testing

Run the fetch script locally:
```bash
npm run build
npm run fetch
```

### GitHub Actions Setup

1. Add the workflow file to your repository:
   - Copy `.github/workflows/daily-fetch.yml` to your repository

2. Set up GitHub secrets:
   - Go to Settings → Secrets and variables → Actions
   - Add `GITHUB_TOKEN` (usually auto-available)

3. Enable Discussions (optional):
   - Go to Settings → Features
   - Enable "Discussions"

4. The workflow will run automatically every day at UTC 8:00

## Configuration

Edit `.env` or set environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `GITHUB_TOKEN` | - | GitHub API token (required) |
| `LOG_LEVEL` | `info` | Logging level (debug, info, warn, error) |
| `MAX_ITEMS_PER_SOURCE` | `30` | Maximum items to fetch per source |
| `AI_RELEVANCE_THRESHOLD` | `0.7` | Relevance score threshold (0-1) |
| `CACHE_TTL_MINUTES` | `60` | Cache time-to-live in minutes |

## Project Structure

```
├── .github/
│   └── workflows/
│       └── daily-fetch.yml          # GitHub Actions workflow
├── src/
│   ├── fetchers/                    # Data source fetchers
│   │   ├── github-trending.ts
│   │   └── hacker-news.ts
│   ├── filters/                     # Content filtering
│   │   ├── ai-filter.ts
│   │   └── deduplicator.ts
│   ├── publishers/                  # Publishing channels
│   │   ├── readme-publisher.ts
│   │   ├── issue-publisher.ts
│   │   └── discussion-publisher.ts
│   ├── models/
│   │   └── trending-item.ts         # Data models
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── cache.ts
│   │   └── retry.ts
│   └── index.ts                     # Main entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Development

### Build
```bash
npm run build
```

### Run locally
```bash
npm run dev
```

### Run tests
```bash
npm test
```

## How It Works

1. **Fetch** - Collects trending content from multiple sources
2. **Filter** - Filters for AI/LLM-related content using keyword matching
3. **Deduplicate** - Removes duplicate items across sources
4. **Score** - Calculates relevance scores based on keywords and engagement
5. **Publish** - Publishes to README, Issues, and Discussions

## Extending

### Adding a New Data Source

1. Create a new fetcher in `src/fetchers/`:
```typescript
export class MySourceFetcher {
  async fetch(): Promise<TrendingItem[]> {
    // Implementation
  }
}
```

2. Add to the main aggregator in `src/index.ts`

### Adding a New Publisher

1. Create a new publisher in `src/publishers/`:
```typescript
export class MyPublisher {
  async publish(digest: DailyDigest): Promise<void> {
    // Implementation
  }
}
```

2. Add to the main aggregator in `src/index.ts`

## Troubleshooting

### Issues not being created
- Ensure `GITHUB_TOKEN` has `issues:write` permission
- Check that `GITHUB_REPOSITORY` is set correctly

### Discussions not being created
- Enable Discussions in repository settings
- Ensure the repository has at least one discussion category

### No items being fetched
- Check network connectivity
- Verify API endpoints are accessible
- Check logs for detailed error messages

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open a GitHub Issue.
