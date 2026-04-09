# GitHub Actions 工作流指南

## 概述

项目已配置了 3 个 GitHub Actions 工作流：

1. **Tests** - 运行单元测试
2. **Lint** - 代码质量检查
3. **CI** - 完整的持续集成流程
4. **Daily Fetch** - 每天自动聚合趋势内容

## 工作流详解

### 1. Tests 工作流 (`.github/workflows/tests.yml`)

**触发条件：**
- Push 到 `main` 或 `develop` 分支
- 创建 Pull Request 到 `main` 或 `develop`
- 手动触发（workflow_dispatch）

**执行步骤：**
1. 检出代码
2. 设置 Node.js（18.x 和 20.x 两个版本）
3. 安装依赖
4. 编译 TypeScript
5. 运行测试
6. 生成覆盖率报告
7. 上传到 Codecov
8. 在 PR 上评论结果

**配置说明：**
```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x]  # 在两个 Node 版本上运行
```

### 2. Lint 工作流 (`.github/workflows/lint.yml`)

**触发条件：**
- Push 到 `main` 或 `develop` 分支
- 创建 Pull Request 到 `main` 或 `develop`
- 手动触发

**执行步骤：**
1. 检出代码
2. 设置 Node.js
3. 安装依赖
4. 运行 linter
5. 检查 TypeScript 编译
6. 在 PR 上评论结果

### 3. CI 工作流 (`.github/workflows/ci.yml`)

**触发条件：**
- Push 到 `main` 或 `develop` 分支
- 创建 Pull Request 到 `main` 或 `develop`
- 手动触发

**执行步骤：**
1. 检出代码
2. 设置 Node.js
3. 安装依赖
4. 构建项目
5. 运行测试
6. 代码质量检查
7. 创建测试报告
8. 失败时通知

### 4. Daily Fetch 工作流 (`.github/workflows/daily-fetch.yml`)

**触发条件：**
- 每天 UTC 8:00 自动运行
- 手动触发

**执行步骤：**
1. 检出代码
2. 设置 Node.js
3. 安装依赖
4. 编译 TypeScript
5. 运行趋势聚合
6. 提交更新
7. 失败时上传日志

## 工作流文件位置

```
.github/workflows/
├── tests.yml          # 测试工作流
├── lint.yml           # Lint 工作流
├── ci.yml             # CI 工作流
└── daily-fetch.yml    # 每日聚合工作流
```

## 如何查看工作流运行

### 在 GitHub 上查看

1. 进入你的仓库
2. 点击 **Actions** 标签
3. 选择要查看的工作流
4. 点击具体的运行记录
5. 展开各个步骤查看详细日志

### 工作流状态

- ✅ **Success** - 所有步骤成功
- ❌ **Failure** - 某个步骤失败
- ⏳ **In Progress** - 正在运行
- ⏭️ **Skipped** - 被跳过

## 手动触发工作流

### 方法 1：GitHub 网页界面

1. 进入 **Actions** 标签
2. 选择要运行的工作流
3. 点击 "Run workflow"
4. 选择分支
5. 点击 "Run workflow"

### 方法 2：GitHub CLI

```bash
# 运行 Tests 工作流
gh workflow run tests.yml

# 运行 Lint 工作流
gh workflow run lint.yml

# 运行 CI 工作流
gh workflow run ci.yml
```

### 方法 3：本地 Git 命令

```bash
# 创建一个空提交来触发工作流
git commit --allow-empty -m "Trigger CI"
git push
```

## 工作流配置修改

### 修改触发分支

编辑工作流文件中的 `on` 部分：

```yaml
on:
  push:
    branches: [ main, develop, staging ]  # 添加 staging 分支
  pull_request:
    branches: [ main, develop, staging ]
```

### 修改 Node.js 版本

编辑 `strategy.matrix.node-version`：

```yaml
strategy:
  matrix:
    node-version: [16.x, 18.x, 20.x]  # 添加 16.x
```

### 修改运行时间（Daily Fetch）

编辑 `cron` 表达式：

```yaml
schedule:
  - cron: '0 9 * * *'  # 改为 UTC 9:00
```

Cron 表达式格式：`分 小时 日 月 周`

常见示例：
- `0 8 * * *` - 每天 8:00
- `0 */6 * * *` - 每 6 小时
- `0 9 * * 1-5` - 工作日 9:00
- `0 0 * * 0` - 每周日 0:00

## 环境变量和 Secrets

### 在工作流中使用 Secrets

```yaml
- name: Run with secrets
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    API_KEY: ${{ secrets.API_KEY }}
  run: npm run fetch
```

### 设置 Secrets

1. 进入 **Settings** → **Secrets and variables** → **Actions**
2. 点击 **New repository secret**
3. 输入名称和值
4. 点击 **Add secret**

## 工作流输出和报告

### 在 PR 上显示结果

工作流会自动在 PR 上评论测试结果：

```
✅ Tests passed! All checks completed successfully.
```

### 查看工作流摘要

1. 进入工作流运行页面
2. 向下滚动查看 "Summary" 部分
3. 查看详细的执行信息

### 下载工作流日志

1. 进入工作流运行页面
2. 点击右上角的 "Download logs"
3. 获取 ZIP 文件

## 常见问题

### Q: 工作流没有运行

**可能原因：**
- 工作流文件有语法错误
- 分支名称不匹配
- 工作流被禁用

**解决方案：**
1. 检查工作流文件语法
2. 确认分支名称正确
3. 在 Actions 标签检查工作流状态

### Q: 测试失败了怎么办

**排查步骤：**
1. 查看工作流日志
2. 找到失败的步骤
3. 查看错误信息
4. 在本地重现问题
5. 修复后推送

### Q: 如何跳过工作流运行

在提交信息中添加 `[skip ci]`：

```bash
git commit -m "Update docs [skip ci]"
git push
```

### Q: 工作流超时了

**解决方案：**
- 增加 `timeout-minutes`
- 优化测试性能
- 分离长时间运行的任务

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 30  # 30 分钟超时
```

## 最佳实践

### 1. 保持工作流简洁

- 只运行必要的检查
- 避免重复的步骤
- 使用缓存加速

### 2. 使用矩阵策略

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x]
    os: [ubuntu-latest, windows-latest]
```

### 3. 添加条件执行

```yaml
- name: Upload coverage
  if: success()  # 只在成功时运行
  run: npm run coverage
```

### 4. 使用缓存

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'npm'  # 缓存 npm 依赖
```

### 5. 添加超时保护

```yaml
jobs:
  test:
    timeout-minutes: 30
```

## 工作流状态徽章

在 README.md 中添加工作流状态徽章：

```markdown
![Tests](https://github.com/YOUR_USERNAME/ai-trending-hub/actions/workflows/tests.yml/badge.svg)
![Lint](https://github.com/YOUR_USERNAME/ai-trending-hub/actions/workflows/lint.yml/badge.svg)
![CI](https://github.com/YOUR_USERNAME/ai-trending-hub/actions/workflows/ci.yml/badge.svg)
```

## 工作流监控

### 查看工作流统计

1. 进入 **Actions** 标签
2. 查看各工作流的运行次数
3. 查看成功/失败率

### 设置通知

1. 进入 **Settings** → **Notifications**
2. 配置工作流失败时的通知
3. 选择通知方式（邮件、Web 等）

## 下一步

1. 推送代码到 GitHub
2. 创建 Pull Request
3. 查看工作流自动运行
4. 根据需要调整工作流配置

---

**需要帮助？** 查看 [GitHub Actions 官方文档](https://docs.github.com/en/actions)
