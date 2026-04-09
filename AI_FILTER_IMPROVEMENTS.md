# AI 过滤算法改进说明

## 改进概述

重新设计了 AI 内容过滤算法，从简单的关键词匹配升级到分类加权的智能过滤系统。

## 主要改进

### 1. 分类关键词系统
- 将关键词按 9 个 AI 领域分类：LLM、Vision、NLP、Framework、RL、Robotics、Research、Core、Tools
- 每个分类有不同的权重（1.0 - 3.0），反映其重要性
- LLM 和 Vision 权重最高（3.0 和 2.5），因为这些是最热门的 AI 领域

### 2. 排除词机制
- 添加了排除词列表，避免误判非 AI 内容
- 排除词包括：JavaScript、Web 开发、游戏、加密货币等
- 如果内容包含排除词，直接返回不相关

### 3. 置信度评分
- 引入 0-1 的置信度评分系统
- 计算公式：`confidence = min(totalScore / 10, 1)`
- 只有置信度 > 0.3 且至少匹配一个分类的内容才被认为相关
- 提供 `getConfidence()` 方法获取匹配置信度

### 4. 改进的评分机制
- 基础分数：来自源的热度（GitHub 星数、HN 分数等）× 1.5
- 分类匹配分数：
  - 描述中的匹配：`matches × weight × 5`
  - 标题中的匹配：`matches × weight × 15`（权重更高）
- 新鲜度加分：最近 24 小时内的内容 × 1.2

### 5. 增强的标签提取
- 标签现在直接来自匹配的分类
- 一个内容可以有多个标签（例如：LLM + Vision）
- 标签更准确地反映内容的真实领域

## 使用示例

```typescript
// 检查内容是否相关
const isRelevant = aiFilter.isRelevant(item);

// 获取匹配的标签
const tags = aiFilter.extractTags(item);

// 计算排序分数
const score = aiFilter.calculateScore(item);

// 获取匹配置信度
const confidence = aiFilter.getConfidence(item);
```

## 测试覆盖

添加了 12 个单元测试，覆盖：
- LLM、Vision、NLP 等各领域的识别
- 非 AI 内容的排除
- 排除词的处理
- 多标签提取
- 标题权重优先级
- 置信度计算

所有测试均通过 ✓

## 性能影响

- 时间复杂度：O(n × m)，其中 n 是分类数（9），m 是关键词数（~60）
- 相比原算法，性能基本相同，但准确性显著提高
- 建议在生产环境中监控过滤效果

## 后续优化方向

1. 使用 TF-IDF 或其他 NLP 技术进行更精确的匹配
2. 添加机器学习模型进行动态分类
3. 支持用户反馈来调整权重
4. 缓存分类结果以提高性能
