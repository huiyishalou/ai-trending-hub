# GitHub Actions 快速参考

## 工作流概览

| 工作流 | 触发条件 | 功能 |
|--------|--------|------|
| **Tests** | Push/PR | 运行单元测试（Node 18 & 20） |
| **Lint** | Push/PR | 代码质量检查 |
| **CI** | Push/PR | 完整 CI 流程 |
| **Daily Fetch** | 每天 8:00 | 自动聚合趋势 |

## 快速命令

### 查看工作流状态
```bash
gh workflow list
```

### 手动运行工作流
```bash
gh workflow run tests.yml
gh workflow run lint.yml
gh workflow run ci.yml
```

### 查看最近的运行
```bash
gh run list
```

### 查看工作流日志
```bash
gh run view <run-id> --log
```

## 工作流文件位置

```
.github/workflows/
├── tests.yml          # 测试工作流
├── lint.yml           # Lint 工作流
├── ci.yml             # CI 工作流
└── daily-fetch.yml    # 每日聚合工作流
```

## 在 GitHub 上查看

1. 进入仓库 → **Actions** 标签
2. 选择工作流
3. 点击运行记录
4. 查看详细日志

## 常用配置

### 修改触发分支
编辑工作流文件的 `on.push.branches` 和 `on.pull_request.branches`

### 修改 Node 版本
编辑 `strategy.matrix.node-version`

### 修改运行时间（Daily Fetch）
编辑 `cron` 表达式（格式：`分 小时 日 月 周`）

## 工作流状态

- ✅ Success - 所有步骤成功
- ❌ Failure - 某个步骤失败
- ⏳ In Progress - 正在运行
- ⏭️ Skipped - 被跳过

## 跳过工作流

在提交信息中添加 `[skip ci]`：
```bash
git commit -m "Update docs [skip ci]"
```

## 添加状态徽章

在 README.md 中添加：
```markdown
![Tests](https://github.com/YOUR_USERNAME/ai-trending-hub/actions/workflows/tests.yml/badge.svg)
```

## 常见问题

**Q: 工作流没有运行？**
- 检查工作流文件语法
- 确认分支名称正确
- 检查工作流是否启用

**Q: 测试失败？**
- 查看工作流日志
- 在本地重现问题
- 修复后推送

**Q: 如何加速工作流？**
- 使用缓存（npm 依赖）
- 减少不必要的步骤
- 使用矩阵策略并行运行

---

详细信息见 `GITHUB_ACTIONS_GUIDE.md`
