# 云选优品（yunxuan-mall）

React 18 + TypeScript + Vite 5 电商前台，Ant Design 5、Zustand、React Router 6；含 ESLint、Prettier、Vitest 与 GitHub Actions CI。

## 环境变量

复制 `.env.example` 为 `.env.development.local` / `.env.production.local` 按需配置（勿提交含密钥的文件）。详见 [Vite 环境变量](https://cn.vitejs.dev/guide/env-and-mode.html)。

## 推荐开发环境

[VS Code](https://code.visualstudio.com/) + 扩展：[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)、[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)。

## 常用命令

```sh
npm install          # 安装依赖
npm run dev          # 本地开发（API 通过 Vite 代理 /api）
npm run build        # 生产构建
npm run preview      # 预览 dist
npm run lint         # ESLint
npm run format       # Prettier 格式化
npm run format:check # 仅检查格式（CI 使用）
npm test             # 单元测试（Vitest）
npm run test:watch   # 监听跑测试
```

## 更多配置

[Vite 配置说明](https://vitejs.dev/config/)
