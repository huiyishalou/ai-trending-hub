import { describe, it, expect } from 'vitest';
import { aiFilter } from './ai-filter';
import { TrendingItem } from '../models/trending-item';

describe('AIFilter', () => {
  const createItem = (title: string, description: string): TrendingItem => ({
    id: 'test-1',
    title,
    description,
    url: 'https://example.com',
    source: 'github',
    score: 100,
    tags: [],
    fetchedAt: new Date(),
  });

  describe('isRelevant', () => {
    it('should identify LLM-related content', () => {
      const item = createItem('GPT-4 Fine-tuning Guide', 'Learn how to fine-tune GPT-4 for your use case');
      expect(aiFilter.isRelevant(item)).toBe(true);
    });

    it('should identify Vision-related content', () => {
      const item = createItem('Stable Diffusion XL', 'Advanced image generation with SDXL');
      expect(aiFilter.isRelevant(item)).toBe(true);
    });

    it('should identify NLP-related content', () => {
      const item = createItem('Sentiment Analysis Tool', 'NLP-based sentiment analysis library');
      expect(aiFilter.isRelevant(item)).toBe(true);
    });

    it('should reject non-AI content', () => {
      const item = createItem('React Web Framework', 'Frontend development with React');
      expect(aiFilter.isRelevant(item)).toBe(false);
    });

    it('should reject content with exclude keywords', () => {
      const item = createItem('AI Gaming Engine', 'Game development with AI');
      expect(aiFilter.isRelevant(item)).toBe(false);
    });

    it('should handle low confidence matches', () => {
      const item = createItem('Model T Car', 'Historical information about the Model T');
      expect(aiFilter.isRelevant(item)).toBe(false);
    });
  });

  describe('extractTags', () => {
    it('should extract multiple tags', () => {
      const item = createItem('LLM with Vision', 'Multimodal model combining LLM and vision capabilities');
      const tags = aiFilter.extractTags(item);
      expect(tags).toContain('LLM');
      expect(tags).toContain('Vision');
    });

    it('should extract framework tags', () => {
      const item = createItem('PyTorch Tutorial', 'Deep learning with PyTorch framework');
      const tags = aiFilter.extractTags(item);
      expect(tags).toContain('Framework');
    });
  });

  describe('calculateScore', () => {
    it('should give higher score to title matches', () => {
      const item1 = createItem('LLM Framework', 'A tool for building applications');
      const item2 = createItem('Building Tools', 'A framework for LLM applications');
      const score1 = aiFilter.calculateScore(item1);
      const score2 = aiFilter.calculateScore(item2);
      expect(score1).toBeGreaterThan(score2);
    });

    it('should consider base score from source', () => {
      const item1 = createItem('AI Tool', 'Description');
      const item2 = createItem('AI Tool', 'Description');
      item1.score = 1000;
      item2.score = 100;
      const score1 = aiFilter.calculateScore(item1);
      const score2 = aiFilter.calculateScore(item2);
      expect(score1).toBeGreaterThan(score2);
    });
  });

  describe('getConfidence', () => {
    it('should return high confidence for strong matches', () => {
      const item = createItem('GPT-4 LLM Fine-tuning', 'Advanced LLM training techniques');
      const confidence = aiFilter.getConfidence(item);
      expect(confidence).toBeGreaterThan(0.7);
    });

    it('should return low confidence for weak matches', () => {
      const item = createItem('Model Training', 'General training information');
      const confidence = aiFilter.getConfidence(item);
      expect(confidence).toBeLessThan(0.5);
    });
  });
});
