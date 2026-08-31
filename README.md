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

### 2026-08-31

1. **[tt-a1i/archify](https://github.com/tt-a1i/archify)** `RL`, `Core` (⭐ 7208)
   - Agent skill for beautiful, verifiable architecture, workflow, sequence, data-flow, and lifecycle diagrams—self-contained HTML with motion and crisp export.
   - Source: github

2. **[THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC)** `RL`, `Core` (⭐ 5122)
   - Open Multi-Agent Interactive Classroom — Get an immersive, multi-agent learning experience in just one click
   - Source: github

3. **[zhaoxuya520/reverse-skill](https://github.com/zhaoxuya520/reverse-skill)** `LLM`, `RL`, `Research`, `Core` (⭐ 2638)
   - Reverse Engineering / Authorized Penetration Testing / Security Research Skill Router Pack AI-powered routing + On-demand toolchain bootstrapping + Self-evolving knowledge base Supports Claude Code, Kiro, Cursor, Cline, and other AI coding clients 逆向/渗透/安全技能路由包 - AI 自动路由 + 按需自举工具链 + 自动进化经验库 | 支持 Claude Code / Kiro / Cursor / Cline 等代码 AI 客户端
   - Source: github

4. **[affaan-m/ECC](https://github.com/affaan-m/ECC)** `LLM`, `RL`, `Research`, `Core` (⭐ 1034)
   - The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond.
   - Source: github

5. **[p-e-w/heretic](https://github.com/p-e-w/heretic)** `NLP`, `Core` (⭐ 989)
   - Fully automatic censorship removal for language models
   - Source: github

6. **[kaifcodec/user-scanner](https://github.com/kaifcodec/user-scanner)** `Research`, `Core`, `Tools` (⭐ 883)
   - 🕵️‍♂️ (2-in-1) Email & Username OSINT suite for deep data extraction just from a single Email/Username. Analyzes 465+ actively maintained scan vectors (175+ email / 290+ username) for security research, investigations, and digital footprinting.
   - Source: github

7. **[jingyaogong/minimind](https://github.com/jingyaogong/minimind)** `LLM`, `Core` (⭐ 877)
   - 🧠 Train a 64M-parameter LLM from scratch in just 2h!
   - Source: github

8. **[pollen-robotics/microduck_rl](https://github.com/pollen-robotics/microduck_rl)** `RL`, `Robotics`, `Core` (⭐ 853)
   - RL training environments for Microduck (mjlab)
   - Source: github

9. **[Osmantic/ODS](https://github.com/Osmantic/ODS)** `LLM`, `Vision`, `RL`, `Core`, `Tools` (⭐ 680)
   - Turn your PC, Mac, or Linux box into an AI server. LLM inference, chat UI, voice, agents, workflows, RAG, and image generation.
   - Source: github

10. **[How to build a diffusion language model](https://kuleshov-group.github.io/blog/blog/2026/how-to-build-a-diffusion-language-model/)** `Vision`, `NLP`, `Core` (⭐ 440)
   - By volodia | 158 points
   - Source: hackernews

11. **[firecrawl/pdf-inspector](https://github.com/firecrawl/pdf-inspector)** `NLP`, `Framework` (⭐ 385)
   - Fast Rust library for PDF inspection, classification, and text extraction. Intelligently detects scanned vs text-based PDFs to enable smart routing decisions.
   - Source: github

12. **[ChatGPT Work Tool and Skill Reference](https://codex-tool-reference.simonw.chatgpt.site/)** `LLM` (⭐ 265)
   - By ijidak | 67 points
   - Source: hackernews

13. **[Navigation App for People with Blindness and Low Vision](https://seas.harvard.edu/news/smartphone-navigation-app-people-blindness-and-low-vision)** `Vision`, `Robotics` (⭐ 121)
   - By geox | 7 points
   - Source: hackernews

14. **[Agentic Trust Controls](https://trustcontrols.ai/)** `RL`, `Robotics` (⭐ 116)
   - By mooreds | 11 points
   - Source: hackernews

15. **[Launch HN: Hebbian Robotics (YC S26) – Build scalable robotics data pipelines](https://github.com/Hebbian-Robotics/hflow)** `Robotics` (⭐ 112)
   - By kstonekuan | 9 points
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
