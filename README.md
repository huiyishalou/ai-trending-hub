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

### 2026-07-22

1. **[bojieli/ai-agent-book](https://github.com/bojieli/ai-agent-book)** `RL`, `Core` (⭐ 8407)
   - 《深入理解 AI Agent：设计原理与工程实践》（李博杰 著）开源主仓库：全书正文、编译版 PDF 与按章配套代码
   - Source: github

2. **[diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)** `LLM`, `Core` (⭐ 3769)
   - Never stop coding. Free MIT AI gateway: one endpoint, 268+ providers (50+ free), 500+ models — Kimi, Claude, GPT, OpenAI, Gemini, GLM, DeepSeek, MiniMax. Works with Claude Code, Codex, Cursor, OpenCode, Cline & Copilot. Quota-aware auto-fallback, RTK+Caveman compression saves 15-95% tokens, MCP/A2A, Desktop/PWA. Built by 500+ contributors
   - Source: github

3. **[tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph)** `NLP`, `Research`, `Core` (⭐ 3498)
   - Local-first code intelligence graph for MCP and CLI. Builds a persistent map of your codebase so AI coding tools read only what matters, with benchmarked context reductions on reviews and large-repo workflows.
   - Source: github

4. **[koala73/worldmonitor](https://github.com/koala73/worldmonitor)** `RL`, `Core` (⭐ 2388)
   - Real-time global intelligence dashboard. AI-powered news aggregation, geopolitical monitoring, and infrastructure tracking in a unified situational awareness interface
   - Source: github

5. **[OpenAI and Hugging Face address security incident during model evaluation](https://openai.com/index/hugging-face-model-evaluation-security-incident/)** `Framework`, `Research`, `Core` (⭐ 2285)
   - By mfiguiere | 1183 points
   - Source: hackernews

6. **[Advertise in ChatGPT](https://ads.openai.com/)** `LLM`, `RL` (⭐ 1567)
   - By montecarl | 784 points
   - Source: hackernews

7. **[AstrBotDevs/AstrBot](https://github.com/AstrBotDevs/AstrBot)** `LLM`, `Framework`, `RL`, `Core` (⭐ 800)
   - AI Agent Assistant & development framework that integrates lots of IM platforms, LLMs, plugins and AI feature, and can be your openclaw alternative. ✨
   - Source: github

8. **[Judge approves $1.5B Anthropic settlement for pirated books used to train Claude](https://apnews.com/article/ai-anthropic-copyright-settlement-claude-books-bartz-74b140444023898aeba8579b6e9f0d63)** `LLM`, `Core` (⭐ 790)
   - By BeetleB | 379 points
   - Source: hackernews

9. **[Jack Dorsey launches Buzz to combine team chat, AI agents and Git hosting](https://runtimewire.com/article/jack-dorsey-block-buzz-team-chat-ai-agents-git)** `RL`, `Core` (⭐ 662)
   - By ryanmerket | 321 points
   - Source: hackernews

10. **[earthtojake/text-to-cad](https://github.com/earthtojake/text-to-cad)** `NLP`, `RL`, `Robotics` (⭐ 620)
   - A collection of agent skills for CAD, robotics and hardware design
   - Source: github

11. **["Drawing" the Mona Lisa with GPT-5.6, Claude, Gemini, and Grok](https://www.tryai.dev/blog/ai-drawing-arena-colored-pencils-claude-gpt-grok)** `LLM` (⭐ 578)
   - By hershyb_ | 201 points
   - Source: hackernews

12. **[AlexsJones/llmfit](https://github.com/AlexsJones/llmfit)** `LLM`, `Core` (⭐ 313)
   - Hundreds of models & providers. One command to find what runs on your hardware.
   - Source: github

13. **[Gemini last models: temperature, top_p, and top_k are deprecated and ignored](https://ai.google.dev/gemini-api/docs/latest-model)** `LLM`, `Core` (⭐ 270)
   - By greatgib | 90 points
   - Source: hackernews

14. **[tradesdontlie/tradingview-mcp](https://github.com/tradesdontlie/tradingview-mcp)** `LLM`, `Core` (⭐ 232)
   - AI-assisted TradingView chart analysis — connect Claude Code to your TradingView Desktop for personal workflow automation
   - Source: github

15. **[langchain-ai/open_deep_research](https://github.com/langchain-ai/open_deep_research)** `Framework`, `Research`, `Core` (⭐ 161)
   - No description
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
