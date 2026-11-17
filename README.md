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

### 2026-11-17

1. **[dream-num/univer](https://github.com/dream-num/univer)** `RL`, `Core` (⭐ 3218)
   - Build your own AI office with Univer Office SDK. Bring editing, calculation, collaboration, and file processing into your product for people and AI agents. Built on an extensible open-source core.
   - Source: github

2. **[google-research/paper-orchestra](https://github.com/google-research/paper-orchestra)** `Framework`, `RL`, `Research`, `Core` (⭐ 2220)
   - PaperOrchestra is a multi-agent framework for automated AI research paper writing.
   - Source: github

3. **[affaan-m/ECC](https://github.com/affaan-m/ECC)** `LLM`, `RL`, `Research`, `Core` (⭐ 1672)
   - The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond.
   - Source: github

4. **[mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)** `RL`, `Research`, `Core` (⭐ 1420)
   - AI agent skill that researches any topic across Reddit, X, YouTube, HN, Polymarket, and the web - then synthesizes a grounded summary
   - Source: github

5. **[alibaba/open-code-review](https://github.com/alibaba/open-code-review)** `LLM`, `RL`, `Core` (⭐ 1414)
   - Secure, fast, efficient, battle-tested at Alibaba's scale. Hybrid architecture code review tool: deterministic pipelines + LLM Agent, precise line-level comments, built-in multi-language ruleset (NPE, thread-safety, XSS, SQL injection), OpenAI & Anthropic compatible.
   - Source: github

6. **[obra/superpowers](https://github.com/obra/superpowers)** `Framework`, `RL` (⭐ 1100)
   - An agentic skills framework & software development methodology that works.
   - Source: github

7. **[Tencent/LoopForge](https://github.com/Tencent/LoopForge)** `LLM`, `RL` (⭐ 1092)
   - Self-hosted workflows for coding-agent delivery. Orchestrate CodeBuddy, Codex and Claude Code with scripts and human approval gates. Includes Local workflows for coding assistants.
   - Source: github

8. **[Frame – 31.5" color ePaper display](https://trmnl.com/blog/introducing-frame)** `RL`, `Research` (⭐ 962)
   - By geerlingguy | 508 points
   - Source: hackernews

9. **[google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills)** `LLM`, `Framework`, `RL` (⭐ 690)
   - A library of Agent Skills designed to work with the Stitch MCP server. Each skill follows the Agent Skills open standard, for compatibility with coding agents such as Antigravity, Gemini CLI, Claude Code, Cursor.
   - Source: github

10. **[VisualBasic.World: A gallery of Planet Source Code programs from 1997 to 2012](https://visualbasic.world/)** `Vision`, `RL` (⭐ 412)
   - By broast | 169 points
   - Source: hackernews

11. **[jingyaogong/minimind](https://github.com/jingyaogong/minimind)** `LLM`, `Core` (⭐ 365)
   - 🧠 Train a 64M-parameter LLM from scratch in just 2h!
   - Source: github

12. **[How the Claude Code team thinks about verification](https://claude.dev/blog/how-the-claude-code-team-thinks-about-verification/)** `LLM`, `Core` (⭐ 365)
   - By craigmart | 158 points
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
