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

### 2026-10-02

1. **[DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)** `RL`, `Core` (⭐ 2620)
   - Makes your AI agent think like the laziest senior dev in the room. The best code is the code you never wrote.
   - Source: github

2. **[mattpocock/skills](https://github.com/mattpocock/skills)** `RL`, `Core` (⭐ 1740)
   - Skills for Real Engineers. Straight from my .agents directory.
   - Source: github

3. **[mvschwarz/openrig](https://github.com/mvschwarz/openrig)** `LLM`, `NLP`, `RL` (⭐ 1289)
   - Build your own network of agents from Claude Code, Codex and Pi: persistent teams with roles, shared context and owned work.
   - Source: github

4. **[Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach)** `RL`, `Core` (⭐ 1286)
   - Give your AI agent eyes to see the entire internet. Read & search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu — one CLI, zero API fees.
   - Source: github

5. **[Clef: Open-weight decision models, and new RL fine-tuning platform](https://blog.cloudflare.com/clef-decision-models/)** `RL`, `Core` (⭐ 1094)
   - By jasondavies | 561 points
   - Source: hackernews

6. **[NVIDIA/OpenShell](https://github.com/NVIDIA/OpenShell)** `RL`, `Robotics`, `Core` (⭐ 1084)
   - OpenShell is the safe, private runtime for autonomous AI agents.
   - Source: github

7. **[obra/superpowers](https://github.com/obra/superpowers)** `Framework`, `RL` (⭐ 1034)
   - An agentic skills framework & software development methodology that works.
   - Source: github

8. **[mksglu/context-mode](https://github.com/mksglu/context-mode)** `NLP`, `RL`, `Core` (⭐ 587)
   - Context window optimization for AI coding agents. Sandboxes tool output (98% reduction), persists session memory, and enforces routing across 17 platforms via MCP + hooks.
   - Source: github

9. **[colbymchenry/codegraph](https://github.com/colbymchenry/codegraph)** `LLM`, `RL` (⭐ 500)
   - Pre-indexed code knowledge graph, auto syncs on code changes, for Claude Code, Codex, Gemini, Cursor, OpenCode, AntiGravity, Kiro, CoPilot, and Hermes Agent — fewer tokens, fewer tool calls, 100% local
   - Source: github

10. **[Context Language Models](https://arxiv.org/abs/2609.37725)** `NLP`, `Core` (⭐ 444)
   - By emersonmacro | 160 points
   - Source: hackernews

11. **[ArXiv's Updated Rate Limit Policy](https://blog.arxiv.org/2026/10/01/updated-rate-limit-policy/)** `RL`, `Research` (⭐ 329)
   - By 50kIters | 136 points
   - Source: hackernews

12. **[coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)** `LLM`, `RL`, `Core` (⭐ 316)
   - Marketing skills for Claude Code and AI agents. CRO, copywriting, SEO, analytics, and growth engineering.
   - Source: github


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
