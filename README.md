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

### 2026-08-06

1. **[firecrawl/pdf-inspector](https://github.com/firecrawl/pdf-inspector)** `NLP`, `Framework` (⭐ 2875)
   - Fast Rust library for PDF inspection, classification, and text extraction. Intelligently detects scanned vs text-based PDFs to enable smart routing decisions.
   - Source: github

2. **[obra/superpowers](https://github.com/obra/superpowers)** `Framework`, `RL` (⭐ 1700)
   - An agentic skills framework & software development methodology that works.
   - Source: github

3. **[lyogavin/airllm](https://github.com/lyogavin/airllm)** `LLM`, `RL`, `Core` (⭐ 1664)
   - AirLLM 70B inference with single 4GB GPU
   - Source: github

4. **[esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)** `LLM`, `RL`, `Core` (⭐ 1438)
   - DeepSeek-native AI coding agent for your terminal. Engineered around prefix-cache stability — leave it running.
   - Source: github

5. **[tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)** `Framework`, `Core` (⭐ 782)
   - A utility-first CSS framework for rapid UI development.
   - Source: github

6. **[Beating GPT-5.6 Sol on retrieval with 100x cheaper open models](https://neon.com/blog/how-castform-neon-beats-frontier-models-on-price-and-efficiency)** `LLM`, `Core` (⭐ 688)
   - By moonikakiss | 322 points
   - Source: hackernews

7. **[uber/ADR](https://github.com/uber/ADR)** `Vision`, `RL`, `Research`, `Core` (⭐ 682)
   - ADR secures enterprise AI agents through observability, security benchmarking, and threat detection. Deployed at Uber.
   - Source: github

8. **[huangruiteng/loopx](https://github.com/huangruiteng/loopx)** `LLM`, `RL`, `Core` (⭐ 626)
   - Lightweight loop engineering state kernel for long-running AI agent teams. Agent-loop agnostic across Codex, Claude Code, and other coding agents, with durable goals, quota-aware auto-wake, executable todos, evidence logs, and verifiable handoffs.
   - Source: github

9. **[Born Against, or why hobby programming communities are against LLM usage](https://blog.fogus.me/llm/born-against.html)** `LLM`, `Core` (⭐ 610)
   - By lladnar | 279 points
   - Source: hackernews

10. **[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)** `RL`, `Core` (⭐ 464)
   - Production-grade engineering skills for AI coding agents.
   - Source: github

11. **[Prime Agent: A self-improving RLM agent](https://www.primeintellect.ai/blog/prime-agent)** `RL` (⭐ 429)
   - By Xeophon | 185 points
   - Source: hackernews

12. **[Launch HN: HyperProbe (YC S26) – Agents that do read-only debugging in prod](https://www.hyperprobe.co)** `RL`, `Core` (⭐ 161)
   - By shailendraht | 58 points
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
