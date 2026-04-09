import { TrendingItem } from '../models/trending-item';
import logger from '../utils/logger';

interface KeywordCategory {
  name: string;
  keywords: string[];
  weight: number;
}

interface FilterResult {
  isRelevant: boolean;
  confidence: number;
  matchedCategories: string[];
}

export class AIFilter {
  private keywordCategories: KeywordCategory[] = [
    {
      name: 'LLM',
      keywords: ['llm', 'gpt', 'claude', 'chatgpt', 'gemini', 'llama', 'mistral', 'qwen', 'deepseek', 'palm', 'bard', 'copilot'],
      weight: 3,
    },
    {
      name: 'Vision',
      keywords: ['vision', 'image generation', 'dall-e', 'midjourney', 'stable diffusion', 'diffusion', 'image', 'visual', 'ocr', 'detection', 'segmentation'],
      weight: 2.5,
    },
    {
      name: 'NLP',
      keywords: ['nlp', 'natural language', 'language model', 'text', 'sentiment', 'translation', 'summarization', 'embedding', 'tokenization'],
      weight: 2.5,
    },
    {
      name: 'Framework',
      keywords: ['pytorch', 'tensorflow', 'keras', 'jax', 'transformers', 'hugging face', 'langchain', 'llamaindex', 'framework', 'library'],
      weight: 2,
    },
    {
      name: 'RL',
      keywords: ['reinforcement learning', 'rl', 'agent', 'policy', 'reward', 'q-learning', 'dqn', 'ppo'],
      weight: 2,
    },
    {
      name: 'Robotics',
      keywords: ['robotics', 'robot', 'autonomous', 'manipulation', 'navigation', 'control'],
      weight: 2,
    },
    {
      name: 'Research',
      keywords: ['paper', 'research', 'arxiv', 'study', 'benchmark', 'dataset', 'evaluation'],
      weight: 1.5,
    },
    {
      name: 'Core',
      keywords: ['ai', 'machine learning', 'deep learning', 'neural network', 'model', 'training', 'inference', 'optimization'],
      weight: 1.5,
    },
    {
      name: 'Tools',
      keywords: ['rag', 'vector', 'semantic', 'embedding', 'quantization', 'pruning', 'distillation', 'fine-tune', 'prompt'],
      weight: 1,
    },
  ];

  private excludeKeywords = [
    'javascript',
    'typescript',
    'web development',
    'frontend',
    'backend',
    'database',
    'devops',
    'kubernetes',
    'docker',
    'cloud',
    'aws',
    'azure',
    'gcp',
    'game',
    'gaming',
    'entertainment',
    'social media',
    'crypto',
    'blockchain',
    'web3',
    'nft',
  ];

  isRelevant(item: TrendingItem): boolean {
    const result = this.getFilterResult(item);
    return result.isRelevant;
  }

  private getFilterResult(item: TrendingItem): FilterResult {
    const text = `${item.title} ${item.description}`.toLowerCase();

    // 检查排除词
    if (this.excludeKeywords.some((keyword) => text.includes(keyword))) {
      return { isRelevant: false, confidence: 0, matchedCategories: [] };
    }

    let totalScore = 0;
    const matchedCategories: string[] = [];

    // 计算每个分类的匹配分数
    for (const category of this.keywordCategories) {
      const matches = category.keywords.filter((keyword) => text.includes(keyword)).length;
      if (matches > 0) {
        matchedCategories.push(category.name);
        totalScore += matches * category.weight;
      }
    }

    // 计算置信度（0-1）
    const confidence = Math.min(totalScore / 10, 1);

    // 至少需要一个匹配的分类，且置信度 > 0.3
    const isRelevant = matchedCategories.length > 0 && confidence > 0.3;

    return { isRelevant, confidence, matchedCategories };
  }

  extractTags(item: TrendingItem): string[] {
    const result = this.getFilterResult(item);
    return result.matchedCategories;
  }

  calculateScore(item: TrendingItem): number {
    const text = `${item.title} ${item.description}`.toLowerCase();
    const titleText = item.title.toLowerCase();

    let score = item.score || 0;

    // 基础分数：来自源的热度（GitHub 星数、HN 分数等）
    score *= 1.5;

    // 分类匹配分数
    for (const category of this.keywordCategories) {
      const descMatches = category.keywords.filter((keyword) => text.includes(keyword)).length;
      const titleMatches = category.keywords.filter((keyword) => titleText.includes(keyword)).length;

      // 标题中的匹配权重更高
      score += descMatches * category.weight * 5;
      score += titleMatches * category.weight * 15;
    }

    // 新鲜度加分（最近发布的内容）
    const daysSinceFetch = (Date.now() - item.fetchedAt.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceFetch < 1) {
      score *= 1.2;
    }

    return Math.round(score);
  }

  getConfidence(item: TrendingItem): number {
    return this.getFilterResult(item).confidence;
  }
}

export const aiFilter = new AIFilter();
