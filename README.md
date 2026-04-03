# 云选优品（yunxuan-mall）

React + TypeScript 电商前台：首页与频道、商品详情、购物车、结算与支付流程、登录与个人中心；工程化包含 ESLint、Prettier、Vitest 与 GitHub Actions CI。

[![CI](https://github.com/Leo12345678900000/yunxuan-mall/actions/workflows/ci.yml/badge.svg)](https://github.com/Leo12345678900000/yunxuan-mall/actions/workflows/ci.yml)

## 功能概览

| 模块       | 说明                             |
| ---------- | -------------------------------- |
| 首页       | 轮播、分类入口、各类商品推荐位   |
| 分类       | 一级 / 二级分类与商品列表        |
| 商品详情   | 规格 SKU、详情与相关推荐         |
| 购物车     | 增删改、选中与金额汇总           |
| 结算与支付 | 需登录；下单、支付页与支付回调页 |
| 用户       | 登录；个人中心（资料、订单）     |

路由与鉴权：`checkout`、`pay`、`member` 等使用登录态校验（`RequireAuth`）。

## 技术栈

- **框架**：React 18、TypeScript、Vite 5
- **UI**：Ant Design 5、Sass
- **状态**：Zustand
- **路由**：React Router 6（`createBrowserRouter`）
- **请求**：Axios（开发环境经 Vite 代理 `/api`）
- **质量**：ESLint、Prettier、Vitest；CI 中执行 lint、格式检查、单测与生产构建

## 快速开始

**环境**：Node.js 20+（与 CI 一致），包管理使用 npm。

```sh
git clone https://github.com/Leo12345678900000/yunxuan-mall.git
cd yunxuan-mall
npm install
npm run dev
```

浏览器访问终端提示的本地地址（一般为 `http://localhost:5173`）。

### 接口与代理

- **开发**：`npm run dev` 时，请求走 `baseURL` 为 `/api`，由 Vite 代理到后端；代理目标在 `vite.config.ts` 的 `server.proxy['/api'].target`，可按需改为你的接口地址。
- **生产构建**：默认直连 `src/utils/apiBase.ts` 中的 `API_ORIGIN`；可通过环境变量覆盖（见下）。

### 环境变量

复制 `.env.example` 为 `.env.development.local` / `.env.production.local` 后按需修改（勿提交含密钥的文件）。仅 `VITE_` 前缀会注入前端，详见 [Vite 环境变量](https://cn.vitejs.dev/guide/env-and-mode.html)。

| 变量              | 说明                                                                        |
| ----------------- | --------------------------------------------------------------------------- |
| `VITE_API_ORIGIN` | 生产等场景下的 API 源站（末尾不要斜杠）；未设置时使用 `apiBase.ts` 内默认值 |
| `VITE_API_BASE`   | 可选；强制覆盖 axios 的 `baseURL`（一般留空；开发默认 `/api`）              |

## 常用命令

```sh
npm run dev          # 本地开发（/api 走 Vite 代理）
npm run build        # 生产构建
npm run preview      # 本地预览 dist
npm run lint         # ESLint
npm run format       # Prettier 写入格式化
npm run format:check # 仅检查格式（CI 使用）
npm test             # 单元测试（Vitest）
npm run test:watch   # 监听跑测试
```

## 目录结构（摘要）

```text
src/
  apis/           # 按业务划分的接口封装
  components/     # 通用组件与布局
  hooks/          # 自定义 Hooks
  pages/          # 页面级路由组件
  stores/         # Zustand 状态
  styles/         # 全局与主题相关样式
  utils/          # 请求封装、API 基址等
```

## CI（GitHub Actions）

推送或向 `main` / `master` 提 PR 时，工作流会依次执行：`npm ci` → `npm run lint` → `npm run format:check` → `npm test` → `npm run build`。配置见 [.github/workflows/ci.yml](.github/workflows/ci.yml)。

## 演示与截图（可选）

若有线上 Demo 或部署在 GitHub Pages / Vercel 等，可在此补充链接；在 README 中插入 1～2 张关键页面截图能方便面试官快速了解界面与完成度。

## 更多参考

- [Vite 配置](https://vitejs.dev/config/)

## 推荐开发环境

[VS Code](https://code.visualstudio.com/) + 扩展：[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)、[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)。
