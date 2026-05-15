# markdown.box

`markdown.box` 是一个以 Markdown 发布为核心的在线工作台。它提供编辑、实时预览、HTML 复制和公开分享能力，目标不是做“另一个 formatter”，而是把 Markdown 从草稿一路带到可发布结果。

## 项目定位

- 面向写作者、开发者和内容创作者的 Markdown 工具站
- 以 `workbench` 为核心交互场景
- 以“Markdown in, rendered HTML out”为渲染原则
- 通过 share 机制把当前结果保存为可公开访问的页面

## 技术栈

### 前端

- Astro 6
- React 19
- TypeScript
- nanostores
- Tailwind CSS v4
- CodeMirror 6
- marked
- sanitize-html
- Lucide React
- Radix UI / shadcn 风格 UI 组件

### 服务端与部署

- `@astrojs/cloudflare`
- Cloudflare Wrangler
- Cloudflare D1

### 校验与测试

- Zod
- Vitest
- Playwright
- `astro check`

## 架构概览

项目采用“Astro 页面壳 + React 交互工作台 + Cloudflare API + D1 持久化”的分层方式。

### 1. 页面与路由层

Astro 负责页面入口、路由和整体壳层：

- `/`：项目首页 / 产品入口
- `/markdown-viewer`：轻量 viewer 入口
- `/workbench`：主工作台
- `/share/[id]`：公开分享页
- `/api/share`：创建分享
- `/api/share/[id]`：读取分享对应的 markdown
- `/api/share/[id]/invalidate`：失效分享

`src/layouts/BaseLayout.astro` 启用了 `ClientRouter`，用于 Astro 下的客户端导航切换。

### 2. 交互工作台层

React 承担真正的重交互部分，核心入口是：

- `src/components/WorkbenchBoot.tsx`
- `src/components/Workbench.tsx`

职责划分：

- `WorkbenchBoot`：负责根据 URL、客户端暂存状态、shareId 来初始化工作台
- `Workbench`：负责编辑器、预览、复制 HTML、创建分享、滚动同步等交互
- `ViewerWorkbenchEntry`：把 viewer 输入的长文本通过客户端状态带入 workbench
- `WorkbenchSidebar`：提供工具导航和响应式侧边栏

### 3. 状态管理层

项目使用 `nanostores`，当前主要分两类状态：

#### workbench store

文件：`src/lib/workbench-store.ts`

负责：

- `draftMarkdown`：编辑中的草稿
- `markdown`：正式提交用于渲染的内容
- `rendered`：从 markdown 派生出的 HTML 结果
- `shareState`：分享请求状态、结果链接、错误信息

工作流：

1. 用户在编辑器输入内容
2. 更新 `draftMarkdown`
3. 经过 debounce 后调用 `commitDraftMarkdown`
4. 标准化 markdown
5. 触发 `renderResult(markdown)` 重新生成预览 HTML

#### navigation store

文件：`src/lib/workbench-navigation-store.ts`

负责同一会话内从 `/markdown-viewer` 跳转到 `/workbench` 时的临时 payload 传递。

这个 store 的作用是：

- 避免把长文本塞进 URL
- 保持 viewer -> workbench 的顺滑跳转
- 将“同会话跳转”和“share 持久化”两种机制分离

### 4. 渲染层

文件：`src/lib/renderer.ts`

当前渲染链路非常直接：

1. `marked.parse(markdown)` 把 Markdown 转成 HTML
2. `sanitize-html` 对结果进行净化
3. 返回：
   - `html`
   - `rendererVersion`

这意味着：

- preview 显示的是纯渲染结果
- share 页展示的也是同一份渲染结果
- 不再在结果外层再拼额外的页面模板壳

### 5. Share 持久化层

文件：

- `src/lib/share.ts`
- `src/pages/api/share.ts`
- `src/pages/api/share/[id].ts`
- `src/pages/api/share/[id]/invalidate.ts`
- `src/pages/share/[id].astro`

分享流程：

1. workbench 发起 `POST /api/share`
2. 服务端校验 markdown
3. 重新执行 `renderResult(markdown)`
4. 生成 share record
5. 把记录写入 D1
6. 返回 `/share/:id`

share record 目前保存：

- `id`
- `markdown`
- `snapshotHtml`
- `rendererVersion`
- `createdAt`
- `invalidatedAt`
- `schemaVersion`

分享页直接读取 `snapshotHtml` 渲染，因此它展示的是分享创建当时的快照结果。

如果用户通过 share 回到 workbench，则由 `/api/share/[id]` 返回原始 markdown，再 hydrate 回编辑器。

## 数据库设计

当前仅有一张核心表：`share_records`

定义位于：`db/migrations/0001_init.sql`

字段包括：

- `id`
- `markdown`
- `view`
- `snapshot_html`
- `renderer_version`
- `created_at`
- `invalidated_at`
- `schema_version`

当前 `view` 约束仍在表结构中，但前端渲染已经收口为单一纯渲染结果链路。

## 目录结构

```text
.
├── db/
│   └── migrations/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── ViewerWorkbenchEntry.tsx
│   │   ├── Workbench.tsx
│   │   ├── WorkbenchBoot.tsx
│   │   └── WorkbenchSidebar.tsx
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── renderer.ts
│   │   ├── sample-markdown.ts
│   │   ├── schemas.ts
│   │   ├── share.ts
│   │   ├── utils.ts
│   │   ├── workbench-navigation-store.ts
│   │   └── workbench-store.ts
│   ├── pages/
│   │   ├── api/
│   │   ├── markdown-viewer/
│   │   ├── share/
│   │   ├── index.astro
│   │   └── workbench.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── DESIGN.md
├── package.json
├── tsconfig.json
└── wrangler.jsonc
```

## 设计系统

UI 设计规范集中在 `DESIGN.md`，定义了当前产品的：

- 色彩系统
- 字体系统
- 间距与圆角
- 阴影层级
- 组件视觉规范
- 文案基调

`src/styles/global.css` 基于这些设计 token 实现了全局样式变量和主题映射。

## 本地开发

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

## 构建与预览

开发环境构建：

```bash
npm run build:dev
```

生产环境构建：

```bash
npm run build:production
```

本地预览 Cloudflare 环境：

```bash
npm run preview
```

## 部署

部署到 dev：

```bash
npm run deploy:dev
```

部署到 production：

```bash
npm run deploy:production
```

## 数据库迁移

本地 D1 迁移：

```bash
npm run db:migrate:local
```

远程 dev 环境迁移：

```bash
npm run db:migrate:remote:dev
```

远程 production 环境迁移：

```bash
npm run db:migrate:remote:production
```

## 检查与测试

类型与 Astro 检查：

```bash
npm run check
```

单元测试：

```bash
npm run test
```

E2E 测试：

```bash
npm run test:e2e
```

## 当前设计取向

这个项目当前不是通用 CMS，也不是传统富文本编辑器，而是一个偏“结果导向”的 Markdown 工具工作台：

- 输入是 Markdown
- 中间是可控、可预览、可复制的渲染过程
- 输出是干净 HTML 和可分享结果页

如果后续继续扩展，比较自然的方向是围绕 workbench 增加更多 Markdown 工具，而不是把核心模型改成复杂内容平台。
