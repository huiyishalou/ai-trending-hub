# GitHub Actions 实际使用示例

## 场景 1：创建 Pull Request 时自动运行测试

### 步骤

1. **创建新分支**
```bash
git checkout -b feature/new-feature
```

2. **修改代码**
```bash
# 编辑文件...
```

3. **提交代码**
```bash
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

4. **创建 Pull Request**
   - 进入 GitHub 仓库
   - 点击 "Compare & pull request"
   - 填写 PR 信息
   - 点击 "Create pull request"

5. **工作流自动运行**
   - GitHub 自动触发 Tests、Lint、CI 工作流
   - 在 PR 页面查看运行状态
   - 工作流完成后在 PR 上评论结果

### 预期结果

```
✅ Tests passed! All checks completed successfully.
✅ Linting passed! Code quality checks completed.
```

---

## 场景 2：手动运行测试工作流

### 使用 GitHub 网页界面

1. 进入仓库 → **Actions** 标签
2. 左侧选择 "Tests" 工作流
3. 点击 "Run workflow"
4. 选择分支（默认 main）
5. 点击 "Run workflow"
6. 等待工作流完成

### 使用 GitHub CLI

```bash
# 运行 Tests 工作流
gh workflow run tests.yml

# 运行 Lint 工作流
gh workflow run lint.yml

# 运行 CI 工作流
gh workflow run ci.yml
```

### 查看运行结果

```bash
# 列出最近的运行
gh run list

# 查看具体运行的日志
gh run view <run-id> --log
```

---

## 场景 3：修复失败的测试

### 步骤

1. **查看失败信息**
   - 进入 Actions 标签
   - 点击失败的运行
   - 展开失败的步骤查看错误

2. **在本地重现问题**
```bash
npm test -- --run
```

3. **修复代码**
```bash
# 编辑文件修复问题...
```

4. **验证修复**
```bash
npm test -- --run
npm run build
npm run lint
```

5. **推送修复**
```bash
git add .
git commit -m "fix: resolve test failures"
git push
```

6. **工作流重新运行**
   - GitHub 自动触发工作流
   - 验证所有测试通过

---

## 场景 4：在 PR 中查看测试结果

### 在 PR 页面

1. 进入 Pull Request
2. 向下滚动到 "Checks" 部分
3. 查看各个工作流的状态：
   - ✅ Tests - 通过
   - ✅ Lint - 通过
   - ✅ CI - 通过

4. 点击 "Details" 查看详细日志

### PR 评论

工作流完成后会自动在 PR 上评论：

```
✅ Tests passed! All checks completed successfully.
✅ Linting passed! Code quality checks completed.
```

---

## 场景 5：每日自动聚合趋势

### 配置

工作流已配置为每天 UTC 8:00 自动运行。

### 查看结果

1. 进入 Actions 标签
2. 选择 "Daily AI Trending Fetch" 工作流
3. 查看最近的运行
4. 检查 README 是否更新
5. 查看是否创建了新的 Issue 和 Discussion

### 手动触发

```bash
gh workflow run daily-fetch.yml
```

---

## 场景 6：监控工作流性能

### 查看工作流统计

1. 进入 **Actions** 标签
2. 查看各工作流的运行次数
3. 查看成功/失败率
4. 分析运行时间

### 优化工作流

如果工作流运行时间过长：

1. 检查是否有不必要的步骤
2. 启用缓存加速依赖安装
3. 使用矩阵策略并行运行
4. 增加超时时间

---

## 常见工作流场景

### 场景：修改 package.json

1. 修改 package.json
2. 推送代码
3. 工作流自动运行
4. 重新安装依赖
5. 运行测试

### 场景：添加新测试

1. 创建新的测试文件
2. 推送代码
3. 工作流运行新测试
4. 验证测试通过

### 场景：更新 Node 版本

1. 编辑工作流文件
2. 修改 `node-version` 矩阵
3. 推送代码
4. 工作流在新版本上运行

### 场景：修复 Lint 错误

1. 运行本地 lint
```bash
npm run lint
```

2. 修复错误
3. 推送代码
4. 工作流验证修复

---

## 工作流日志示例

### 成功的测试运行

```
✓ Checkout code
✓ Setup Node.js 18.x
✓ Install dependencies
✓ Build TypeScript
✓ Run tests
  ✓ 88 tests passed
✓ Generate coverage report
✓ Upload coverage to Codecov
✓ Comment PR with test results
```

### 失败的测试运行

```
✓ Checkout code
✓ Setup Node.js 18.x
✓ Install dependencies
✓ Build TypeScript
✗ Run tests
  ✗ 2 tests failed
  - Test: should handle error
  - Test: should validate input
```

---

## 故障排除

### 工作流没有运行

**检查清单：**
- [ ] 工作流文件在 `.github/workflows/` 目录
- [ ] 工作流文件名正确
- [ ] 工作流文件 YAML 语法正确
- [ ] 分支名称匹配触发条件

### 测试失败

**排查步骤：**
1. 查看工作流日志
2. 找到失败的测试
3. 在本地运行相同的测试
4. 修复代码
5. 重新推送

### 工作流超时

**解决方案：**
- 增加 `timeout-minutes`
- 优化测试性能
- 分离长时间运行的任务

---

## 最佳实践

### 1. 定期检查工作流

- 每周查看一次工作流运行情况
- 监控成功率
- 优化运行时间

### 2. 保持工作流简洁

- 只运行必要的检查
- 避免重复的步骤
- 使用缓存加速

### 3. 添加清晰的日志

- 使用有意义的步骤名称
- 添加调试信息
- 记录关键指标

### 4. 定期更新依赖

- 更新 GitHub Actions
- 更新 Node 版本
- 更新工具版本

### 5. 监控成本

- GitHub Actions 有免费额度
- 监控使用情况
- 优化工作流以减少运行时间

---

## 下一步

1. 推送代码到 GitHub
2. 创建 Pull Request
3. 观察工作流自动运行
4. 查看测试结果
5. 根据需要调整工作流

---

**需要帮助？** 查看 `GITHUB_ACTIONS_GUIDE.md` 获取更多信息。
