# 🧱 Gnuxter

[English](./README.md) | 简体中文

面向生产环境的 Nuxt 4 起始模板。Gnuxter 预先完成了项目间通常需要重复配置的基础设施层——国际化、SEO、可访问性、主题、安全防护与测试——使开发工作可以直接从应用层开始，而非配置层。

## ✨ 功能一览

| 分类 | 实现方案 |
|---|---|
| 🏗️ 框架 | Nuxt 4、Vue 3、TypeScript |
| 🎨 样式 | Tailwind CSS 4、CSS 自定义属性、`@nuxtjs/color-mode` |
| 🗃️ 状态管理 | Pinia |
| 🌐 国际化 | `@nuxtjs/i18n` — 中文（zh-CN）与英文（en-US）双语，前缀路由策略，浏览器语言自动检测 |
| 🔤 字体 | `@nuxt/fonts` — Inter、Noto Sans SC，通过 Google Fonts 加载 |
| 🖼️ 图标 | `@nuxt/icon` — Lucide 图标集，服务端打包 |
| 🖼️ 图片 | `@nuxt/image` — 图片优化与可扩展图片提供商 |
| 🧰 组合式工具 | `@vueuse/nuxt` — 自动导入 VueUse 工具 |
| 🔄 远端状态 | `@tanstack/vue-query` — 按业务域选择性使用查询缓存、失效与 mutation |
| 📝 表单 | Vee Validate 5 beta + Zod — Nuxt 自动导入与 Standard Schema 校验 |
| 🏷️ Head 管理 | `@unhead/vue` — Nuxt 使用的类型安全文档 Head 管理 |
| 🔍 SEO | `@nuxtjs/seo` — 聚合元信息、OG 图片、Schema.org、Sitemap、Robots 与链接检查 |
| ♿ 可访问性 | `@nuxt/a11y` — 开发环境下启用审计反馈 |
| 🔒 安全 | `nuxt-security` — 提供 CSP、SRI 与浏览器安全响应头，不启用后端中间件 |
| 📱 设备检测 | `@nuxtjs/device` — 服务端设备类型识别 |
| 📲 PWA | `@vite-pwa/nuxt` — 安装清单、Workbox Service Worker 与可复现应用图标 |
| 📊 数据分析 | `@vercel/analytics`、`@vercel/speed-insights` |
| 🎞️ 动画 | `@formkit/auto-animate` |
| 🔗 链接检查 | 由 `@nuxtjs/seo` 提供的 `nuxt-link-checker` — 默认关闭，建议在 CI 中启用 |
| 🧪 测试 | Vitest（单元测试 + Nuxt 组件测试）、MSW（接口 Mock）、Playwright（E2E 测试） |
| 🧹 代码规范 | `@nuxt/eslint` + `@antfu/eslint-config` |

## 📋 环境要求

- Node.js `^22.19.0 || ^24.11.0 || >=26.0.0`
- pnpm 10.28 及以上

## 🚀 快速开始

```bash
pnpm install
pnpm dev
```

开发服务器默认运行于 `http://localhost:3000`。

## 📜 脚本说明

```bash
# 开发
pnpm dev                # 启动开发服务器
pnpm build              # 构建生产版本
pnpm generate           # 生成静态输出
pnpm preview            # 本地预览生产构建

# 质量检查
pnpm check              # 运行 lint 与类型检查
pnpm lint               # 使用 Antfu ESLint 配置检查代码
pnpm lint:fix           # 自动修复代码规范与格式问题
pnpm typecheck          # 运行 Nuxt/Vue TypeScript 检查

# 测试
pnpm test               # 运行全部 Vitest 测试
pnpm test:watch         # 以监听模式运行 Vitest
pnpm test:coverage      # 运行 Vitest 并生成覆盖率报告
pnpm test:unit          # 仅运行单元测试
pnpm test:nuxt          # 仅运行 Nuxt 组件测试
pnpm test:e2e           # 运行 Playwright E2E 测试
pnpm test:e2e:ui        # 以 UI 模式运行 Playwright E2E 测试

# PWA
pnpm pwa:assets         # 从 public/favicon.svg 重新生成安装图标
```

## 📁 目录结构

```
app/
├── app.vue
├── assets/css/
│   └── main.css          # Tailwind 入口、设计令牌、基础样式
├── components/
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   └── LangSwitcher.vue
├── layouts/
│   └── default.vue
├── pages/
│   └── index.vue
└── stores/
    └── app.ts            # 主题与导航状态
i18n/
└── locales/
    ├── en.json
    └── zh.json
test/
├── mocks/                # 不包含具体业务处理器的共享 MSW Server
├── setup/                # Vitest 共用的 MSW 生命周期
├── nuxt/                 # Nuxt 组件测试（vitest + @nuxt/test-utils）
└── unit/                 # 纯单元测试（vitest，node 环境）
tests/                    # Playwright E2E 测试
.vscode/                  # ESLint 与 Vue 编辑器推荐配置
nuxt.config.ts
pnpm-workspace.yaml       # 包管理策略与安全补丁覆盖
pwa-assets.config.ts      # 可复现的 PWA 图标生成配置
playwright.config.ts
vitest.config.ts
```

## ⚙️ 配置说明

所有模块配置集中于 `nuxt.config.ts`。

### `site`
供 SEO 模块套件使用的全站元信息。部署前需更新 `url`、`name` 与 `description`。

### `i18n`
语言定义、路由策略（`prefix_except_default`）及基于 Cookie 的浏览器语言检测。语言文件位于 `i18n/locales/`。

### `fonts`
通过 `@nuxt/fonts` 加载的字体系列。当前配置为从 Google Fonts 加载 Inter 与 Noto Sans SC。

### `icon`
服务端打包的图标集合。当前包含 Lucide 图标集。

### `colorMode`
通过 `@nuxtjs/color-mode` 提供 SSR 安全的深浅色主题选择。现有 Pinia 主题操作会将持久化与系统偏好检测交给该模块。

### `image`
`@nuxt/image` 已使用默认 IPX 提供商启用。使用 `NuxtImg` 或 `NuxtPicture` 可优化本地及远程图片。

### `veeValidate`
Vee Validate 5 的组合式 API 已自动导入；由于 v5 尚未发布稳定版，目前明确锁定为 `5.0.0-beta.1`。通用组件采用避免命名冲突的 `VeeForm`、`VeeField`、`VeeFieldArray` 和 `VeeErrorMessage`。Zod Schema 可以直接传给 `validationSchema`，无需添加 `@vee-validate/zod`。

### MSW
两个 Vitest 项目共用 `test/mocks/server.ts` 中基于 Node 的 MSW Server。每个测试通过 `mockServer.use(...)` 声明自己的处理器；处理器会在测试后重置，未 Mock 的网络请求将直接导致测试失败。由于模板已有 PWA Service Worker，此处不会注册浏览器端 Mock Service Worker。

### Vue Query
`app/plugins/vue-query.ts` 已初始化 `@tanstack/vue-query`，并处理 SSR 缓存脱水与客户端水合。默认 `staleTime` 为 5 秒，避免水合后立刻发起重复请求。Nuxt 页面及 SEO 数据继续使用 `useFetch`；仅在需要长期远端状态、mutation 失效或乐观更新的业务域使用 Vue Query。同一资源不能同时交给两套缓存管理。

### `ogImage`
通过 `nuxt-og-image` 生成 Open Graph 图片。开发环境下可在 `/__og-image__/image` 预览。

### `sitemap` / `robots`
自动生成 sitemap 与 robots.txt，分别可通过 `/sitemap.xml` 和 `/robots.txt` 访问。

### `schemaOrg`
结构化数据身份块，当前配置为 `Organization` 类型。需将 `name` 与 `url` 更新为目标项目的实际信息。

### `security`
`nuxt-security` 通过 CSP、SRI、SSR nonce / SSG hash 与浏览器安全响应头提供纯前端安全基线。CSRF、限流、请求体限制、请求 XSS 校验、CORS、Basic Auth 与 HTTP 方法限制等后端中间件均显式关闭。模板允许 HTTPS API、图片、字体与媒体来源；生产项目应将宽泛的协议来源收紧为实际使用的服务域名。若最终采用纯静态托管，也可以把响应头交给 CDN 平台配置，同时保留当前 CSP 作为可移植的应用内基线。

### `a11y`
开发环境下启用可访问性审计反馈，结果输出至浏览器控制台。

### `linkChecker`
默认关闭。可在 CI 构建阶段通过设置 `enabled: true` 启用。

### `pwa`
生产构建时，`@vite-pwa/nuxt` 会生成 `/manifest.webmanifest`、`/sw.js` 与 Workbox 运行时。Service Worker 会预缓存带版本的 Nuxt 静态资源和安装图标；SSR 页面导航与 API 响应保持仅网络访问，避免缓存动态数据或会修改状态的数据。更新采用安全的 `prompt` 生命周期；若未增加更新提示 UI，新版本会在当前应用会话关闭后激活。

图标源文件为 `public/favicon.svg`。替换后运行 `pnpm pwa:assets`，即可重新生成 favicon、192/512 图标、maskable 图标与 Apple Touch 图标。

### `eslint`
Nuxt 负责项目感知的全局变量和目录规则，`@antfu/eslint-config` 负责 JavaScript、TypeScript、Vue、import 排序与代码风格。ESLint 同时承担格式化职责，项目不需要 Prettier。

## ✅ 定制清单

在将本模板用于生产项目之前，请完成以下检查项：

- [ ] 更新 `nuxt.config.ts` 中的 `site.url`、`site.name`、`site.description` 及 `schemaOrg.identity`
- [ ] 替换 `i18n/locales/en.json` 与 `i18n/locales/zh.json` 中的语言字符串
- [ ] 替换 `app/pages/index.vue` 中的演示首页
- [ ] 将 CSP 中的 `https:` 来源收紧为产品实际使用的 API、图片、字体、分析与媒体域名
- [ ] 为外部服务凭据添加 `runtimeConfig` 及 `.env.example` 文件
- [ ] 在 CI 中启用 `linkChecker`
- [ ] 替换 `public/favicon.svg`，然后运行 `pnpm pwa:assets`
- [ ] 如果产品需要会话内更新，为 PWA 增加更新提示 UI
- [ ] 用项目实际测试用例替换占位测试
- [ ] 移除或配置目标项目不需要的模块

## 📄 许可证

MIT
