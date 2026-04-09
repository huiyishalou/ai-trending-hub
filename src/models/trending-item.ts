export interface TrendingItem {
  id: string;
  title: string;
  description: string;
  url: string;
  source: 'github' | 'hackernews' | 'producthunt';
  score: number;
  tags: string[];
  fetchedAt: Date;
  language?: string;
  author?: string;
}

export interface DailyDigest {
  date: string;
  items: TrendingItem[];
  summary: string;
  generatedAt: Date;
}

export interface FetcherConfig {
  maxItems?: number;
  timeout?: number;
}

export interface PublisherConfig {
  enabled: boolean;
  maxHistoryDays?: number;
}
