# GitHub Actions 最佳实践和常见问题

## 常见问题解决

### 问题 1：actions/upload-artifact 版本过期

**错误信息：**
```
This request has been automatically failed because it uses a deprecated version of `actions/upload-artifact: v3`
```

**解决方案：**
更新工作流文件中的版本：

```yaml
# ❌ 旧版本（已弃用）
uses: actions/upload-artifact@v3

# ✅ 新版本
uses: actions/upload-artifact@v4
```

**更新的工作流文件：**
```yaml
- name: Upload logs on failure
  if: failure()
  uses: actions/upload-artifact@v4
  with:
    name: fetch-logs-${{ github.run_id }}
    path: logs/
    retention-days: 7
```

---

## GitHub Actions 版本管理

### 常用 Actions 的最新版本

| Action | 最新版本 | 用途 |
|--------|---------|------|
| `actions/checkout` | v4 | 检出代码 |
| `actions/setup-node` | v4 | 设置 Node.js |
| `actions/upload-artifact` | v4 | 上传工件 |
| `actions/download-artifact` | v4 | 下载工件 |
| `actions/github-script` | v7 | 执行 GitHub API 脚本 |
| `codecov/codecov-action` | v3 | 上传覆盖率报告 |

### 如何检查最新版本

1. 访问 [GitHub Marketplace](https://github.com/marketplace?type=actions)
2. 搜索 action 名称
3. 查看最新版本号
4. 查看更新日志

### 自动更新 Actions

使用 Dependabot 自动更新 Actions：

1. 进入仓库 **Settings** → **Code security and analysis**
2. 启用 **Dependabot version updates**
3. 配置 `dependabot.yml`

**dependabot.yml 示例：**
```yaml
version: 2
updates:
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

---

## 工作流最佳实践

### 1. 使用最新的 Action 版本

```yaml
# ✅ 好的做法
uses: actions/checkout@v4
uses: actions/setup-node@v4

# ❌ 避免
uses: actions/checkout@v1
uses: actions/setup-node@v1
```

### 2. 使用缓存加速

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'npm'  # 缓存 npm 依赖
```

### 3. 添加条件执行

```yaml
- name: Upload coverage
  if: success()  # 只在成功时运行
  run: npm run coverage

- name: Notify on failure
  if: failure()  # 只在失败时运行
  run: echo "Build failed"
```

### 4. 使用矩阵策略

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x]
    os: [ubuntu-latest, windows-latest]
```

### 5. 添加超时保护

```yaml
jobs:
  test:
    timeout-minutes: 30
```

### 6. 使用 continue-on-error

```yaml
- name: Run optional step
  run: npm run optional-check
  continue-on-error: true  # 失败不中断工作流
```

---

## 常见错误和解决方案

### 错误 1：工作流文件语法错误

**症状：**
- 工作流不运行
- Actions 标签显示错误

**解决方案：**
1. 检查 YAML 语法
2. 使用 YAML 验证工具
3. 查看 GitHub 的错误提示

**验证工具：**
- [YAML Lint](http://www.yamllint.com/)
- [GitHub Actions Validator](https://github.com/rhysd/actionlint)

### 错误 2：权限不足

**症状：**
```
Error: Resource not accessible by integration
```

**解决方案：**
检查工作流的 `permissions` 部分：

```yaml
permissions:
  contents: write      # 写入代码
  issues: write        # 创建 Issue
  discussions: write   # 创建 Discussion
  pull-requests: write # 写入 PR
```

### 错误 3：Secrets 未设置

**症状：**
```
Error: Secrets not found
```

**解决方案：**
1. 进入 **Settings** → **Secrets and variables** → **Actions**
2. 添加缺失的 secret
3. 在工作流中正确引用：`${{ secrets.SECRET_NAME }}`

### 错误 4：工作流超时

**症状：**
```
The operation timed out
```

**解决方案：**
1. 增加 `timeout-minutes`
2. 优化步骤性能
3. 分离长时间运行的任务

```yaml
jobs:
  test:
    timeout-minutes: 60  # 增加到 60 分钟
```

### 错误 5：依赖安装失败

**症状：**
```
npm ERR! code ERESOLVE
```

**解决方案：**
1. 更新 `package-lock.json`
2. 使用 `npm ci` 而不是 `npm install`
3. 检查 Node 版本兼容性

```yaml
- name: Install dependencies
  run: npm ci  # 使用 ci 而不是 install
```

---

## 性能优化

### 1. 使用缓存

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'npm'
```

### 2. 并行运行

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x]
```

### 3. 条件跳过

```yaml
- name: Run tests
  if: github.event_name == 'pull_request'
  run: npm test
```

### 4. 使用 continue-on-error

```yaml
- name: Optional check
  run: npm run check
  continue-on-error: true
```

---

## 安全最佳实践

### 1. 使用 Secrets 存储敏感信息

```yaml
# ✅ 正确
env:
  API_KEY: ${{ secrets.API_KEY }}

# ❌ 错误
env:
  API_KEY: "my-secret-key"
```

### 2. 限制权限

```yaml
permissions:
  contents: read  # 最小权限
  # 只添加需要的权限
```

### 3. 使用 GITHUB_TOKEN

```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 4. 审计工作流

- 定期检查工作流文件
- 监控 Actions 使用情况
- 更新过期的 Actions

---

## 监控和调试

### 1. 查看工作流日志

1. 进入 **Actions** 标签
2. 选择工作流运行
3. 点击 job 名称
4. 展开步骤查看日志

### 2. 添加调试日志

```yaml
- name: Debug info
  run: |
    echo "Node version: $(node --version)"
    echo "npm version: $(npm --version)"
    echo "Current directory: $(pwd)"
```

### 3. 启用调试模式

设置 secrets：
- `ACTIONS_STEP_DEBUG`: `true`

### 4. 使用 GitHub CLI 查看日志

```bash
gh run view <run-id> --log
```

---

## 工作流维护

### 定期检查清单

- [ ] 检查 Actions 版本是否过期
- [ ] 更新依赖版本
- [ ] 审查工作流性能
- [ ] 检查失败率
- [ ] 更新文档

### 自动化维护

使用 Dependabot 自动更新：

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

---

## 常用命令参考

```bash
# 查看工作流列表
gh workflow list

# 手动运行工作流
gh workflow run <workflow-name>

# 查看最近的运行
gh run list

# 查看工作流日志
gh run view <run-id> --log

# 查看工作流详情
gh run view <run-id>

# 取消工作流运行
gh run cancel <run-id>

# 重新运行工作流
gh run rerun <run-id>
```

---

## 资源链接

- [GitHub Actions 官方文档](https://docs.github.com/en/actions)
- [GitHub Marketplace](https://github.com/marketplace?type=actions)
- [Actions 最佳实践](https://docs.github.com/en/actions/guides)
- [Workflow 语法](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

---

## 总结

✅ **已修复的问题：**
- 更新 `actions/upload-artifact` 从 v3 到 v4

✅ **建议的改进：**
- 定期检查 Actions 版本
- 使用 Dependabot 自动更新
- 遵循最佳实践
- 监控工作流性能

🎉 **现在你的工作流已经是最新的了！**
