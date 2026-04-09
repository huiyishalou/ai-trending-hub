# ✅ 部署检查清单

## 本地准备（已完成 ✓）

- [x] Git 仓库已初始化
- [x] 所有代码已提交
- [x] 初始提交已创建
- [x] 工作流文件已配置
- [x] 所有测试通过（88/88）
- [x] 代码已编译成功

## GitHub 仓库设置（待完成）

### 1. 创建 GitHub 仓库
- [ ] 访问 https://github.com/new
- [ ] 仓库名：`ai-trending-hub`
- [ ] 描述：`Daily aggregation of trending AI/LLM content from GitHub, Hacker News, and more`
- [ ] 选择 Public
- [ ] 不初始化任何文件
- [ ] 点击 "Create repository"

### 2. 推送代码
- [ ] 运行 `git remote add origin https://github.com/YOUR_USERNAME/ai-trending-hub.git`
- [ ] 运行 `git branch -M main`
- [ ] 运行 `git push -u origin main`
- [ ] 验证代码已推送到 GitHub

### 3. 配置 Secrets
- [ ] 进入 Settings → Secrets and variables → Actions
- [ ] 添加 `GITHUB_TOKEN` secret
  - [ ] 访问 https://github.com/settings/tokens
  - [ ] 生成 Personal Access Token (classic)
  - [ ] 选择 scopes：`repo`, `workflow`
  - [ ] 复制 token 到 secret
- [ ] 添加 `PRODUCT_HUNT_API_KEY` secret（可选）

### 4. 验证工作流
- [ ] 进入 Actions 标签
- [ ] 查看 "Daily Trending Fetch" 工作流
- [ ] 点击 "Run workflow" 手动触发
- [ ] 等待工作流完成
- [ ] 检查运行日志

### 5. 验证输出
- [ ] README.md 已更新
- [ ] 创建了新的 Issue
- [ ] 创建了新的 Discussion
- [ ] 提交了更新

## 工作流配置

### 运行时间
- 默认：每天 UTC 8:00
- 修改方式：编辑 `.github/workflows/daily-fetch.yml` 中的 `cron` 表达式

### 支持的操作
- [x] 自动运行（按计划）
- [x] 手动运行（workflow_dispatch）
- [x] 错误恢复
- [x] 日志记录

## 环境变量

工作流会自动设置以下环境变量：

```
GITHUB_TOKEN: 从 secrets 获取
GITHUB_REPOSITORY: 自动设置
LOG_LEVEL: info
MAX_ITEMS_PER_SOURCE: 30
AI_RELEVANCE_THRESHOLD: 0.7
```

## 常见问题排查

### 工作流失败

**检查清单：**
- [ ] GITHUB_TOKEN secret 已正确设置
- [ ] Token 有 `repo` 和 `workflow` scopes
- [ ] 仓库有写入权限
- [ ] 查看工作流日志了解具体错误

**查看日志：**
1. 进入 Actions 标签
2. 选择失败的运行
3. 点击 "Daily Trending Fetch" job
4. 展开各个步骤查看详细日志

### README 未更新

**可能原因：**
- [ ] 工作流未成功运行
- [ ] 没有新的趋势内容
- [ ] 权限不足

**解决方案：**
- [ ] 检查工作流日志
- [ ] 确认 GITHUB_TOKEN 权限
- [ ] 手动运行工作流测试

### Issue/Discussion 未创建

**可能原因：**
- [ ] 工作流未成功运行
- [ ] 权限不足
- [ ] 配置错误

**解决方案：**
- [ ] 检查工作流日志
- [ ] 确认 GITHUB_TOKEN 有 `issues` 和 `discussions` 权限
- [ ] 查看 `src/publishers/` 中的发布器配置

## 后续优化

### 立即可做
- [ ] 添加 README 徽章
- [ ] 配置分支保护规则
- [ ] 添加 Issue 模板
- [ ] 启用 GitHub Pages

### 长期优化
- [ ] 集成 Sentry 错误追踪
- [ ] 添加性能监控
- [ ] 实现分布式缓存（Redis）
- [ ] 添加用户反馈机制

## 验证成功标志

✅ 部署成功的标志：

1. **代码已推送**
   - GitHub 仓库显示所有文件
   - 提交历史可见

2. **工作流已运行**
   - Actions 标签显示运行记录
   - 运行状态为 ✓ 成功

3. **内容已发布**
   - README 显示最新趋势
   - 创建了新的 Issue
   - 创建了新的 Discussion

4. **自动化已启用**
   - 工作流计划已设置
   - 可以手动触发工作流

---

**完成所有检查后，你的 AI Trending Hub 就已经完全部署到 GitHub 了！** 🎉

每天 UTC 8:00 会自动运行，收集最新的 AI 趋势内容。
