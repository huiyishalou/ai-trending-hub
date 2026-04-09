# GitHub 部署指南

## 第一步：初始化 Git 仓库

```bash
cd E:\projects\1
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## 第二步：添加所有文件到 Git

```bash
git add .
git commit -m "Initial commit: AI Trending Hub - Complete project with all features"
```

## 第三步：在 GitHub 上创建仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `ai-trending-hub`
   - **Description**: `Daily aggregation of trending AI/LLM content from GitHub, Hacker News, and more`
   - **Public/Private**: 选择 Public（如果想让其他人看到）
   - **Initialize repository**: 不勾选（因为我们已经有本地仓库）
3. 点击 "Create repository"

## 第四步：连接本地仓库到 GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/ai-trending-hub.git
git branch -M main
git push -u origin main
```

替换 `YOUR_USERNAME` 为你的 GitHub 用户名。

## 第五步：配置 GitHub Actions

GitHub Actions 会自动运行工作流。工作流文件已经存在于 `.github/workflows/daily-fetch.yml`

查看工作流文件：
```bash
cat .github/workflows/daily-fetch.yml
```

## 第六步：设置 GitHub Secrets

1. 进入你的仓库页面
2. 点击 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**，添加以下 secrets：

### 必需的 Secrets

**GITHUB_TOKEN**
- 值：你的 GitHub Personal Access Token
- 获取方式：
  1. 访问 https://github.com/settings/tokens
  2. 点击 "Generate new token" → "Generate new token (classic)"
  3. 选择 scopes：`repo`, `workflow`
  4. 生成并复制 token

**PRODUCT_HUNT_API_KEY**（可选）
- 值：你的 Product Hunt API Key
- 获取方式：访问 https://www.producthunt.com/api/docs

## 第七步：验证部署

### 检查 GitHub Actions 运行

1. 进入仓库页面
2. 点击 **Actions** 标签
3. 查看工作流运行状态

### 手动触发工作流（测试）

```bash
# 在本地推送一个提交来触发工作流
git commit --allow-empty -m "Trigger workflow"
git push
```

或者在 GitHub 上手动触发：
1. 进入 **Actions** 标签
2. 选择 "Daily Trending Fetch" 工作流
3. 点击 "Run workflow" → "Run workflow"

## 第八步：配置工作流（可选）

编辑 `.github/workflows/daily-fetch.yml` 来自定义运行时间：

```yaml
schedule:
  - cron: '0 8 * * *'  # 每天 UTC 8:00 运行
```

时间格式说明：
- `0 8 * * *` = 每天 UTC 8:00
- `0 */6 * * *` = 每 6 小时运行一次
- `0 9 * * 1-5` = 工作日 9:00 运行

## 第九步：查看运行结果

工作流运行后，你可以：

1. **查看 README 更新**
   - 仓库主页会显示最新的趋势内容

2. **查看 Issues**
   - 每次运行会创建一个新的 Issue

3. **查看 Discussions**
   - 每次运行会创建一个新的 Discussion

4. **查看工作流日志**
   - 进入 **Actions** → 选择运行 → 查看详细日志

## 完整的部署命令（一键部署）

```bash
# 1. 初始化 Git
cd E:\projects\1
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 2. 添加并提交
git add .
git commit -m "Initial commit: AI Trending Hub"

# 3. 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/ai-trending-hub.git
git branch -M main
git push -u origin main

# 4. 验证
git log --oneline
```

## 常见问题

### Q: 工作流失败了怎么办？

A: 检查以下几点：
1. 确认 `GITHUB_TOKEN` secret 已正确设置
2. 查看工作流日志了解具体错误
3. 确认 `.env.example` 中的所有必需变量都已配置

### Q: 如何修改运行时间？

A: 编辑 `.github/workflows/daily-fetch.yml` 中的 `cron` 表达式

### Q: 如何禁用自动运行？

A: 在工作流文件中注释掉 `schedule` 部分，或删除工作流文件

### Q: 如何手动运行工作流？

A: 在 GitHub Actions 页面点击 "Run workflow"

### Q: 如何查看详细日志？

A: 
1. 进入 **Actions** 标签
2. 选择最近的运行
3. 点击 "Daily Trending Fetch" job
4. 展开各个步骤查看日志

## 后续配置建议

### 1. 保护主分支
- 进入 **Settings** → **Branches**
- 添加分支保护规则
- 要求 PR review

### 2. 启用 GitHub Pages（可选）
- 进入 **Settings** → **Pages**
- 选择 `main` 分支作为源
- 自动生成项目网站

### 3. 添加 README 徽章
在 README.md 顶部添加：
```markdown
![Tests](https://github.com/YOUR_USERNAME/ai-trending-hub/actions/workflows/daily-fetch.yml/badge.svg)
```

### 4. 设置 Issue 模板
创建 `.github/ISSUE_TEMPLATE/bug_report.md` 等文件

## 验证清单

- [ ] Git 仓库已初始化
- [ ] 代码已推送到 GitHub
- [ ] `GITHUB_TOKEN` secret 已设置
- [ ] `PRODUCT_HUNT_API_KEY` secret 已设置（可选）
- [ ] 工作流文件存在于 `.github/workflows/`
- [ ] 首次工作流运行成功
- [ ] README 已更新
- [ ] Issue 已创建
- [ ] Discussion 已创建

---

**需要帮助？** 如果部署过程中遇到问题，请查看工作流日志或提出具体错误信息。
