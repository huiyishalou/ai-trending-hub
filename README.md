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

### 2026-08-22

1. **[mattpocock/skills](https://github.com/mattpocock/skills)** `RL`, `Core` (⭐ 6073)
   - Skills for Real Engineers. Straight from my .agents directory.
   - Source: github

2. **[santifer/career-ops](https://github.com/santifer/career-ops)** `LLM`, `Core` (⭐ 1685)
   - Open-source AI job search: scan job portals, evaluate listings with a structured A-F rubric into a 1.0-5.0 score, tailor your CV, track applications — runs locally in your AI coding CLI (Claude Code, Codex, OpenCode, Antigravity…)
   - Source: github

3. **[obra/superpowers](https://github.com/obra/superpowers)** `Framework`, `RL` (⭐ 1446)
   - An agentic skills framework & software development methodology that works.
   - Source: github

4. **[affaan-m/ECC](https://github.com/affaan-m/ECC)** `LLM`, `RL`, `Research`, `Core` (⭐ 691)
   - The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond.
   - Source: github

5. **[PostHog/posthog](https://github.com/PostHog/posthog)** `NLP`, `RL`, `Core` (⭐ 651)
   - 🦔 PostHog is the leading platform for building self-driving products. Our developer tools – AI observability, analytics, session replay, flags, experiments, error tracking, logs, and more – capture all the context agents need to diagnose problems, uncover opportunities, and ship fixes. Steer it all from Slack, web, desktop, or the MCP.
   - Source: github

6. **[How we made a text-to-speech model respond in sub-50 ms](https://nari-labs.com/blog/qwen3-tts-speed-cost-frontier/)** `NLP`, `Core` (⭐ 352)
   - By toebee | 142 points
   - Source: hackernews

7. **[ruvnet/ruflo](https://github.com/ruvnet/ruflo)** `LLM`, `RL`, `Robotics`, `Core`, `Tools` (⭐ 309)
   - 🌊 The original agent meta-harness. Deploy intelligent multi-player swarms, coordinate autonomous workflows, and build conversational AI systems. Features adaptive memory, self-learning intelligence, RAG integration, and native Claude Code / Codex / Hermes and many more Integrated
   - Source: github

8. **[apache/maka](https://github.com/apache/maka)** `RL`, `Core` (⭐ 296)
   - Apache Maka (Incubating) is a local-first AI agent workspace. Model messages, tool calls, tool results, permission decisions, and termination events are recorded as an append-only log.
   - Source: github

9. **[Early-life stress leaves a 'scar' inside brain cells in mice](https://medicine.washu.edu/news/how-early-life-stress-leaves-a-scar-inside-brain-cells/)** `RL`, `Core` (⭐ 237)
   - By gmays | 85 points
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
