# Node.js 兼容性问题解决

## 问题描述

**错误信息：**
```
ReferenceError: File is not defined
    at Object.<anonymous> (/node_modules/undici/lib/web/webidl/index.js:537:48)
```

**原因：**
- `File` API 在 Node.js 18 的早期版本中不完全支持
- `undici` 库（被 `node-fetch` 和其他库使用）需要 `File` API
- Node.js 18.17+ 和 Node.js 20+ 完全支持 `File` API

## 解决方案

### 1. 更新 GitHub Actions 工作流

编辑 `.github/workflows/daily-fetch.yml`：

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # 改为 20 或 18.17+
    cache: 'npm'
```

### 2. 更新 package.json

添加 `engines` 字段指定最小 Node 版本：

```json
{
  "engines": {
    "node": ">=18.17.0"
  }
}
```

### 3. 更新本地开发环境

确保你的本地 Node.js 版本满足要求：

```bash
# 检查当前 Node 版本
node --version

# 如果版本过低，升级 Node.js
# 使用 nvm（推荐）
nvm install 20
nvm use 20

# 或访问 https://nodejs.org/ 下载最新版本
```

## Node.js 版本支持矩阵

| Node.js 版本 | File API | 推荐 | 状态 |
|-------------|---------|------|------|
| 16.x | ❌ | ❌ | 不支持 |
| 18.0 - 18.16 | ⚠️ | ❌ | 部分支持 |
| 18.17+ | ✅ | ✅ | 完全支持 |
| 20.x | ✅ | ✅ | 完全支持 |
| 22.x | ✅ | ✅ | 完全支持 |

## 已修复的文件

### 1. `.github/workflows/daily-fetch.yml`
```yaml
# 更新前
node-version: '18'

# 更新后
node-version: '20'
```

### 2. `package.json`
```json
// 添加了
"engines": {
  "node": ">=18.17.0"
}
```

### 3. `README.md`
```markdown
// 更新前
- Node.js 18+

// 更新后
- Node.js 18.17+ (or Node.js 20+)
```

## 验证修复

### 本地验证

```bash
# 检查 Node 版本
node --version

# 重新安装依赖
npm ci

# 构建项目
npm run build

# 运行测试
npm test -- --run

# 运行 fetch 命令
npm run fetch
```

### GitHub Actions 验证

1. 推送代码到 GitHub
2. 进入 **Actions** 标签
3. 查看 "Daily AI Trending Fetch" 工作流
4. 点击 "Run workflow" 手动触发
5. 检查运行是否成功

## 常见的 Node.js 兼容性问题

### 问题 1：Buffer 相关错误

**症状：**
```
ReferenceError: Buffer is not defined
```

**解决方案：**
```typescript
// 添加 import
import { Buffer } from 'buffer';
```

### 问题 2：fetch 不可用

**症状：**
```
ReferenceError: fetch is not defined
```

**解决方案：**
- 升级到 Node.js 18+
- 或使用 `node-fetch` 包

### 问题 3：TextEncoder/TextDecoder 不可用

**症状：**
```
ReferenceError: TextEncoder is not defined
```

**解决方案：**
```typescript
// 添加 import
import { TextEncoder, TextDecoder } from 'util';
```

## 最佳实践

### 1. 指定 Node 版本

在 `package.json` 中：
```json
{
  "engines": {
    "node": ">=18.17.0",
    "npm": ">=9.0.0"
  }
}
```

### 2. 使用 .nvmrc

创建 `.nvmrc` 文件：
```
20
```

然后使用：
```bash
nvm use
```

### 3. 在 CI/CD 中测试多个版本

```yaml
strategy:
  matrix:
    node-version: [18.17.x, 20.x, 22.x]
```

### 4. 定期更新依赖

```bash
npm update
npm audit fix
```

## 相关资源

- [Node.js 官方文档](https://nodejs.org/)
- [Node.js 发布日程](https://nodejs.org/en/about/releases/)
- [undici 库](https://github.com/nodejs/undici)
- [File API 支持](https://nodejs.org/api/webstreams.html)

## 总结

✅ **已修复：**
- 更新 GitHub Actions 工作流使用 Node.js 20
- 添加 `engines` 字段到 package.json
- 更新 README 中的 Node 版本要求

✅ **建议：**
- 使用 Node.js 20+ 获得最佳兼容性
- 定期更新依赖
- 在 CI/CD 中测试多个 Node 版本

🎉 **现在你的项目应该能正常运行了！**
