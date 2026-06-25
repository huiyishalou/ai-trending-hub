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

### 2026-06-25

1. **[calesthio/OpenMontage](https://github.com/calesthio/OpenMontage)** `RL`, `Core` (⭐ 6727)
   - World's first open-source, agentic video production system. 12 pipelines, 52 tools, 500+ agent skills. Turn your AI coding assistant into a full video production studio.
   - Source: github

2. **[mukul975/Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills)** `LLM`, `Framework`, `RL`, `Core` (⭐ 1943)
   - 817 structured cybersecurity skills for AI agents · Mapped to 6 frameworks: MITRE ATT&CK, NIST CSF 2.0, MITRE ATLAS, D3FEND, NIST AI RMF & MITRE F3 (Fight Fraud) · agentskills.io standard · Works with Claude Code, GitHub Copilot, Codex CLI, Cursor, Gemini CLI & 20+ platforms · 29 security domains · Apache 2.0
   - Source: github

3. **[shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice)** `LLM`, `RL`, `Core` (⭐ 1326)
   - from vibe coding to agentic engineering - practice makes claude perfect
   - Source: github

4. **[JCodesMore/ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template)** `RL`, `Core` (⭐ 1294)
   - Clone any website with one command using AI coding agents
   - Source: github

5. **[google-labs-code/design.md](https://github.com/google-labs-code/design.md)** `Vision`, `RL` (⭐ 1141)
   - A format specification for describing a visual identity to coding agents. DESIGN.md gives agents a persistent, structured understanding of a design system.
   - Source: github

6. **[opendatalab/MinerU](https://github.com/opendatalab/MinerU)** `LLM`, `RL` (⭐ 973)
   - Transforms complex documents like PDFs and Office docs into LLM-ready markdown/JSON for your Agentic workflows.
   - Source: github

7. **[Anthropic says Alibaba illicitly extracted Claude AI model capabilities](https://www.reuters.com/world/china/anthropic-says-alibaba-illicitly-extracted-claude-ai-model-capabilities-2026-06-24/)** `LLM`, `Core` (⭐ 934)
   - By htrp | 439 points
   - Source: hackernews

8. **[RubyLLM: A Ruby framework for all major AI providers](https://rubyllm.com/)** `LLM`, `Framework`, `Core` (⭐ 862)
   - By doener | 392 points
   - Source: hackernews

9. **[Krea 2: SOTA open-weights 12B image model](https://www.krea.ai/blog/krea-2-technical-report)** `Vision`, `Core` (⭐ 791)
   - By mattnewton | 386 points
   - Source: hackernews

10. **[PR spam today looks like email spam in the early 2000s](https://www.greptile.com/blog/prs-on-openclaw)** `RL`, `Core` (⭐ 493)
   - By dakshgupta | 227 points
   - Source: hackernews

11. **[xbtlin/ai-berkshire](https://github.com/xbtlin/ai-berkshire)** `LLM`, `Framework`, `RL`, `Research`, `Core` (⭐ 449)
   - AI 时代的伯克希尔：基于 Claude Code 的价值投资研究框架。巴菲特·芒格·段永平·李录四大师方法论 + 多Agent并行研究。| AI-era Berkshire: a value investing research framework built on Claude Code. 4 masters' methodologies + multi-agent adversarial analysis.
   - Source: github

12. **[Mixing Visual and Textual Code](https://arxiv.org/abs/2603.15855)** `Vision`, `NLP` (⭐ 210)
   - By doppioandante | 50 points
   - Source: hackernews

13. **[Aisle Discovers 6 New CVEs in Curl, Including the Oldest Issue Ever Reported](https://aisle.com/blog/aisle-discovers-6-new-cves-in-curl-including-the-oldest-issue-ever-reported)** `RL`, `Core`, `Tools` (⭐ 117)
   - By ragebol | 15 points
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
