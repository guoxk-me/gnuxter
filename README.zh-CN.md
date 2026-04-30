# 🧱 Gnuxter

[English](./README.md) | 简体中文

面向生产环境的 Nuxt 4 起始模板。Gnuxter 预先完成了项目间通常需要重复配置的基础设施层——国际化、SEO、可访问性、主题、安全防护与测试——使开发工作可以直接从应用层开始，而非配置层。

## ✨ 功能一览

| 分类 | 实现方案 |
|---|---|
| 🏗️ 框架 | Nuxt 4、Vue 3、TypeScript |
| 🎨 样式 | Tailwind CSS 4、CSS 自定义属性、深色模式 |
| 🗃️ 状态管理 | Pinia |
| 🌐 国际化 | `@nuxtjs/i18n` — 中文（zh-CN）与英文（en-US）双语，前缀路由策略，浏览器语言自动检测 |
| 🔤 字体 | `@nuxt/fonts` — Inter、Noto Sans SC，通过 Google Fonts 加载 |
| 🖼️ 图标 | `@nuxt/icon` — Lucide 图标集，服务端打包 |
| 🔍 SEO | `nuxt-seo-utils`、`nuxt-og-image`、`nuxt-schema-org`、`@nuxtjs/sitemap`、`@nuxtjs/robots` |
| ♿ 可访问性 | `@nuxt/a11y` — 开发环境下启用审计反馈 |
| 🔒 安全 | `nuxt-csurf` — 对 `POST`、`PUT`、`PATCH`、`DELETE` 请求启用 CSRF 防护 |
| 📱 设备检测 | `@nuxtjs/device` — 服务端设备类型识别 |
| 📊 数据分析 | `@vercel/analytics`、`@vercel/speed-insights` |
| 🎞️ 动画 | `@formkit/auto-animate` |
| 🔗 链接检查 | `nuxt-link-checker` — 默认关闭，建议在 CI 中启用 |
| 🧪 测试 | Vitest（单元测试 + Nuxt 组件测试）、Playwright（E2E 测试） |
| 🧹 代码规范 | `@nuxt/eslint` |

## 📋 环境要求

- Node.js 20 及以上
- pnpm 9 及以上

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

# 测试
pnpm test               # 运行全部 Vitest 测试
pnpm test:watch         # 以监听模式运行 Vitest
pnpm test:coverage      # 运行 Vitest 并生成覆盖率报告
pnpm test:unit          # 仅运行单元测试
pnpm test:nuxt          # 仅运行 Nuxt 组件测试
pnpm test:e2e           # 运行 Playwright E2E 测试
pnpm test:e2e:ui        # 以 UI 模式运行 Playwright E2E 测试
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
├── nuxt/                 # Nuxt 组件测试（vitest + @nuxt/test-utils）
└── unit/                 # 纯单元测试（vitest，node 环境）
tests/                    # Playwright E2E 测试
nuxt.config.ts
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

### `ogImage`
通过 `nuxt-og-image` 生成 Open Graph 图片。开发环境下可在 `/__og-image__/image` 预览。

### `sitemap` / `robots`
自动生成 sitemap 与 robots.txt，分别可通过 `/sitemap.xml` 和 `/robots.txt` 访问。

### `schemaOrg`
结构化数据身份块，当前配置为 `Organization` 类型。需将 `name` 与 `url` 更新为目标项目的实际信息。

### `csurf`
对写操作方法强制校验 CSRF Token。`/api/health` 端点默认豁免。生产环境部署时应将 `https` 设为 `true`。

### `a11y`
开发环境下启用可访问性审计反馈，结果输出至浏览器控制台。

### `linkChecker`
默认关闭。可在 CI 构建阶段通过设置 `enabled: true` 启用。

## ✅ 定制清单

在将本模板用于生产项目之前，请完成以下检查项：

- [ ] 更新 `nuxt.config.ts` 中的 `site.url`、`site.name`、`site.description` 及 `schemaOrg.identity`
- [ ] 替换 `i18n/locales/en.json` 与 `i18n/locales/zh.json` 中的语言字符串
- [ ] 替换 `app/pages/index.vue` 中的演示首页
- [ ] HTTPS 部署时将 `csurf.https` 设为 `true`
- [ ] 为外部服务凭据添加 `runtimeConfig` 及 `.env.example` 文件
- [ ] 在 CI 中启用 `linkChecker`
- [ ] 用项目实际测试用例替换占位测试
- [ ] 移除或配置目标项目不需要的模块

## 📄 许可证

MIT
