# 🚀 快速部署步骤

## 第一步：在 GitHub 创建仓库

1. 访问 https://github.com/new
2. 填写信息：
   - **Repository name**: `ai-trending-hub`
   - **Description**: `Daily aggregation of trending AI/LLM content`
   - **Public**: 选择 Public
   - **不要** 初始化任何文件
3. 点击 "Create repository"

## 第二步：推送代码到 GitHub

复制下面的命令，替换 `YOUR_USERNAME` 为你的 GitHub 用户名，然后在终端运行：

```bash
cd E:\projects\1
git remote add origin https://github.com/YOUR_USERNAME/ai-trending-hub.git
git branch -M main
git push -u origin main
```

## 第三步：设置 GitHub Secrets

1. 进入你的仓库：https://github.com/YOUR_USERNAME/ai-trending-hub
2. 点击 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**

### 添加 GITHUB_TOKEN

**名称**: `GITHUB_TOKEN`

**值**: 你的 GitHub Personal Access Token
- 访问 https://github.com/settings/tokens
- 点击 "Generate new token" → "Generate new token (classic)"
- 选择 scopes：`repo`, `workflow`
- 生成并复制 token

### 添加 PRODUCT_HUNT_API_KEY（可选）

**名称**: `PRODUCT_HUNT_API_KEY`

**值**: 你的 Product Hunt API Key（可选，如果不需要可跳过）

## 第四步：验证部署

1. 进入仓库的 **Actions** 标签
2. 选择 "Daily Trending Fetch" 工作流
3. 点击 "Run workflow" → "Run workflow" 手动触发

工作流运行后，你会看到：
- ✅ README 更新
- ✅ 创建 Issue
- ✅ 创建 Discussion

## 完成！

你的项目现在已经部署到 GitHub，并配置了自动化工作流。

### 后续配置

- 工作流每天 UTC 8:00 自动运行
- 可以在 `.github/workflows/daily-fetch.yml` 修改运行时间
- 查看 `DEPLOYMENT_GUIDE.md` 了解更多详情

---

**需要帮助？** 查看 `DEPLOYMENT_GUIDE.md` 获取完整的部署指南。
