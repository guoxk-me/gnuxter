# Gnuxter 纯前端复杂 C 端模板能力复盘

> 日期：2026-08-17  
> 定位：Nuxt 4 / Vue 3 纯前端 starter，用于快速承接交互复杂、消费独立服务的 C 端项目。  
> 范围：检查当前仓库的 `package.json`、`nuxt.config.ts`、`app/`、`test/`、`tests/`、现有 `docs/`，并对照相邻的 `gnuxter-lite`；不讨论后端、认证、数据库，不安装依赖，不修改运行代码。

## 状态标记

- **Executed**：已通过本地命令读取或检索仓库，结论直接来自当前文件。
- **Inspected**：已对照截至 2026-08-17 的官方文档、官方仓库或 Nuxt Modules 页面。
- **Assumed**：基于“纯前端、复杂 C 端 starter”的产品定位做出的取舍；实施后仍需测试验证。

## 总结

Gnuxter 当前不是“缺很多库”，而是**已经装了较多能力，但默认层与项目层没有分开**。表单校验、Vue Query、MSW Node 测试、Pinia、SEO、PWA、i18n、图片、图标、主题、脚本和测试框架都已存在。下一步应该先形成一条可复制的产品开发闭环，再减少默认启用的业务型模块。

更优先的架构问题是：Gnuxter 目前并没有通过 Nuxt Layer `extends` 继承 `gnuxter-lite`，而是在两个仓库里分别维护相似依赖与配置。两边的 Nuxt、Tailwind、Unhead、i18n 和测试工具版本已经出现差异；继续复制能力会让 lite 修复无法自动进入 Gnuxter。Nuxt 官方将 Layers 明确用于跨项目共享配置、组件、composable 与标准 setup，因此应先把 lite 收敛为可复用基础 Layer，再让 Gnuxter 只保留复杂 C 端增量。**Executed + Inspected**  
官方依据：[Nuxt 4 Layers](https://nuxt.com/docs/4.x/getting-started/layers)；[Authoring Nuxt Layers](https://nuxt.com/docs/4.x/guide/going-further/layers/)

| 层级 | 建议 | 状态 | 结论 |
| --- | --- | --- | --- |
| 现在先做 | 让 Gnuxter 通过 Nuxt Layer `extends` 真正继承 gnuxter-lite | **Executed + Inspected** | 当前没有继承关系，公共依赖和配置已经发生版本漂移。 |
| 现在就补 | shadcn-vue 最小 UI 集，Reka UI 只作为其原语层 | **Executed + Inspected + Assumed** | 当前没有 `components.json` 或 UI 原语，只有自定义 `.btn`；复杂页面会很快出现重复实现。 |
| 现在就补 | `@axe-core/playwright` 可访问性 smoke test | **Executed + Inspected + Assumed** | 已有 `@nuxt/a11y` 开发期日志，但没有浏览器自动化回归；两者职责不同。 |
| 已补 | `nuxt-security` 的安全响应头 / CSP 基线，退出核心层的 `nuxt-csurf` | **Executed + Inspected** | 已限定为浏览器安全头、CSP、SRI 与 SSR nonce / SSG hash，后端中间件全部关闭。 |
| 现在就补 | 不增加库：修复 layout、错误页、运行时配置、真实页面状态和 CI | **Executed + Inspected** | 这些问题比新增数据、监控或持久化库更影响模板能否直接使用。 |
| 现在就收敛 | 明确 vee-validate v5 beta 策略 | **Executed + Inspected + Assumed** | 表单能力已接好并有测试，但当前精确版本仍是 `5.0.0-beta.1`，不能当作无风险稳定基线。 |
| 按项目启用 | TanStack Vue Query、OpenAPI 类型客户端、Sentry、PWA、浏览器 MSW、Storybook | **Executed + Inspected + Assumed** | 都有明确价值，但会引入第二套缓存、服务契约、供应商、Service Worker 或独立构建约束。 |
| 暂不引入 | Pinia 持久化插件、第二套视觉库、Axios、`@vee-validate/zod`、Histoire | **Executed + Inspected + Assumed** | 当前收益不足，或维护状态、双栈和隐私代价不适合默认 starter。 |
| 从核心层移出 | `workflow`、`@nuxtjs/device`、Vercel 监控、PWA、Vue Query | **Executed + Assumed** | 当前均为全局启用，但不是每个纯前端项目的共同需求；其中 `workflow` 还偏离本次纯前端边界。`nuxt-csurf` 已退出核心层。 |

## 当前能力实况

### 已具备，不再列为依赖缺口

| 能力 | 当前实现 | 状态 | 判断 |
| --- | --- | --- | --- |
| 表单校验 | `@vee-validate/nuxt`、`vee-validate@5.0.0-beta.1`、`zod@4.4.3`，并有 Nuxt 集成测试 | **Executed** | 能力已经存在；缺的是版本风险策略和真实表单范例。 |
| 服务端状态 | `@tanstack/vue-query@5.101.4`，有请求级 `QueryClient`、dehydrate / hydrate 插件及测试 | **Executed** | 已安装但不应默认拥有所有请求；应按业务域使用。 |
| API Mock | `msw@2.15.0`，Vitest Node server 与 handler 测试已存在 | **Executed** | 测试侧基线已经完成；浏览器 Worker 仍是可选项。 |
| Head / SEO | Nuxt 内置 Unhead API、显式 `@unhead/vue`、`@nuxtjs/seo` | **Executed + Inspected** | Head 能力不缺。若业务代码没有直接 import `@unhead/vue`，显式依赖应复核是否必要；Nuxt 已提供 `useHead` / `useSeoMeta`。 |
| 基础状态 | Pinia + `@pinia/nuxt` | **Executed** | 普通客户端状态已覆盖；持久化不是默认必需。 |
| 质量工具 | ESLint、TypeScript、Vitest、Nuxt Test Utils、Playwright | **Executed** | 工具齐全，但仍有占位测试，且没有 CI。 |
| 可访问性反馈 | `@nuxt/a11y@1.0.0-alpha.1`，`logIssues: true` | **Executed** | 开发期能力存在，但版本为 alpha，且不能替代自动化与人工测试。 |

### 当前更需要修复的闭环问题

1. **Layout 渲染结构错误。** `app/app.vue` 已用 `<NuxtLayout><NuxtPage /></NuxtLayout>`，但 `app/layouts/default.vue` 内再次使用 `<NuxtPage />`。Nuxt 官方要求 layout 用 `<slot />` 承接页面。**Executed + Inspected**  
   官方依据：[Nuxt 4 Views](https://nuxt.com/docs/4.x/getting-started/views/)；[Nuxt 4 Layouts](https://nuxt.com/docs/4.x/directory-structure/app/layouts)

2. **缺少全局错误体验。** 仓库没有 `app/error.vue`，也没有可复用的 loading / empty / error / retry 状态。复杂 C 端项目需要这些状态先于更多请求库。**Executed + Inspected + Assumed**  
   官方依据：[Nuxt 4 error.vue](https://nuxt.com/docs/4.x/directory-structure/app/error)

3. **部署配置仍写死。** `site.url` 和 Schema.org URL 为 `http://localhost:3000`，仓库没有 `.env.example`；独立 API 的 base URL 也没有公共 runtime config 契约。**Executed + Inspected**  
   官方依据：[Nuxt 4 Runtime Config](https://nuxt.com/docs/4.x/guide/going-further/runtime-config)

4. **测试数量不等于业务保障。** 表单、Vue Query、MSW 和主题已有测试，但 `test/unit/example.test.ts`、`test/nuxt/component.test.ts` 仍是占位内容；没有错误页、i18n、SEO、空态和可访问性回归。**Executed + Assumed**

5. **没有 CI。** 当前脚本包含 lint、typecheck、unit/Nuxt test、E2E 与 build，但没有 `.github/workflows`，`linkChecker` 也始终关闭。**Executed + Inspected**  
   官方依据：[Nuxt 4 Testing](https://nuxt.com/docs/4.x/getting-started/testing)

6. **视觉令牌没有闭环。** CSS 引用了未定义的 `--accent` / `--accent-foreground`，缺少 card、popover、destructive 等常见组件令牌；`@nuxt/fonts` 加载 Inter / Noto Sans SC，但 CSS 使用 Work Sans、Noto Serif SC、Merriweather、Playfair Display、Lora。**Executed**

7. **全局过渡范围过大。** `*` 会统一 transition 背景、文字和边框，容易给表单、列表和 reduced-motion 用户带来意外行为；这应由组件和动效规范控制。**Executed + Assumed**

## 现在就该补

### 1. shadcn-vue 最小 UI 体系

**结论：现在接入，但只提交最小组件集，不批量导入全部组件。— Executed + Inspected + Assumed**

当前仅有 Header、Footer、语言切换和两个手写 button class。复杂 C 端项目反复需要表单控件、对话框、抽屉、菜单、反馈和异步状态；没有统一原语会快速产生交互与可访问性差异。

建议首批只加入：`Button`、`Input`、`Label` / `Field`、`Card`、`Dialog`、`Sheet`、`DropdownMenu`、`Skeleton`、`Empty`、`Sonner`。接入原则：

- 页面与业务组件只消费仓库内的 shadcn-vue 源码组件。
- Reka UI 是 shadcn-vue 的低层原语，不再并列暴露为第二套视觉组件体系。
- CLI 初始化必须人工合并 `main.css`；现有语义变量并不完整，不能直接覆盖。
- shadcn-vue 官方 Nuxt 指南说明部分组件需要 VueUse 的 `provideSSRWidth` 避免移动端 hydration 问题；仓库已有 VueUse，但仍需实测。
- 源码进入仓库后，升级需要审查本地改动，代价高于黑盒 npm 组件库。

官方依据：

- [shadcn-vue Introduction](https://shadcn-vue.com/docs/introduction)
- [shadcn-vue Nuxt 4 / Tailwind 4 安装](https://next.shadcn-vue.com/docs/installation/nuxt)
- [shadcn-vue Tailwind v4](https://next.shadcn-vue.com/docs/tailwind-v4)
- [Reka UI Introduction](https://www.reka-ui.com/docs/overview/introduction)
- [Reka UI Nuxt 安装](https://reka-ui.com/docs/overview/installation)

### 2. 浏览器级可访问性回归

**结论：增加 `@axe-core/playwright`，至少扫描首页、一个复杂表单和一个 Dialog / Sheet 流程。— Executed + Inspected + Assumed**

Playwright 官方示例使用 `@axe-core/playwright` 扫描可自动检测的问题，并明确说明自动化只能发现部分问题，需要与人工评估结合。它应补充 `@nuxt/a11y`，而不是替换开发期反馈。

代价：axe 会增加 E2E 时间；第三方组件可能产生需要人工确认的结果，因此应限定核心路径并禁止无说明地关闭规则。

官方依据：[Playwright Accessibility Testing](https://playwright.dev/docs/accessibility-testing)

### 3. 浏览器安全头基线

**结论：已引入 `nuxt-security@2.5.1` 并启用经过验证的响应头与 CSP；CSRF、限流、请求体限制、CORS 等中间件不进入纯前端默认层。— Executed + Inspected**

Nuxt Security 官方支持 Nuxt 4，能为 SSR 和 SSG 提供安全头与 CSP；CSRF 在官方能力列表中本就是可选项。本次已直接启用 CSP，并分别通过 SSR 响应与 SSG 产物验证。后续增加字体、Nuxt Image、Nuxt Scripts、监控或外部 API 时，应先在测试环境补充最小 source 范围再发布。

当前已移除 `nuxt-csurf` 的直接依赖与全局模块配置。对于消费独立服务、没有本地 cookie-auth API 的纯前端模板，它不应默认启用；如果具体项目使用 cookie 会话，再由该项目选择 CSRF 方案，且不能与另一套 CSRF 中间件叠加。`nuxt-security` 内部仍为其可选 CSRF 能力保留传递依赖，但 `csrf: false` 保证该中间件不会注册。

当前配置同时服务 SSR 与 SSG；若最终只发布纯静态文件，可由 CDN 平台接管响应头策略，并保留生成到 HTML 的 CSP 作为跨平台基线，或在确认平台覆盖完整后按部署预设关闭重复配置。

项目选择 `2.5.1` 而非最新版 `2.6.0`，因为前者支持 Node >=20，能够维持模板声明的 Node 22/24 范围；`2.6.0` 已将最低 Node 版本提高到 24。当前配置还显式关闭请求体限制、rate limiter、XSS request validator、CORS、allowed methods、Basic Auth 与 logger removal，只保留 CSP、SRI、nonce / SSG hash、隐藏技术响应头及浏览器安全头。

代价与验证点：

- Nuxt Security 默认不只注册 headers，也可能注册全局中间件；核心模板应明确关闭不属于纯前端的部分。
- SSR CSP 使用 nonce，SSG 使用 hash / meta 和托管平台 headers，必须分别构建验证；本次两条路径均已通过。
- 当前 starter 为外部 API、图片、字体和媒体保留了 `https:` 兼容范围，具体项目接入服务后应收紧为实际域名。

官方依据：

- [Nuxt Modules：nuxt-security](https://nuxt.com/modules/security)
- [Nuxt Security 默认配置](https://nuxt-security.vercel.app/getting-started/configuration)
- [Nuxt Security CSP：SSR / SSG / Report-Only](https://nuxt-security.vercel.app/headers/csp)

### 4. 先收敛已有依赖边界

**结论：模板核心不应把所有已安装模块全局启用；应拆为核心与项目预设。— Executed + Assumed**

建议保留在核心：Nuxt、Vue、Tailwind、Pinia、VueUse、Color Mode、i18n、Image、Icon、Fonts、聚合 SEO、VeeValidate + Zod、测试工具，以及完成后的最小 UI 与安全头。

建议从核心降为按项目开启：

- `@tanstack/vue-query`：数据密集型交互项目。
- `@vite-pwa/nuxt`：确实要求安装、离线或更新策略的项目。
- `@vercel/analytics` / `@vercel/speed-insights`：部署到 Vercel 且接受该供应商的项目。
- `@nuxtjs/device`：确实需要服务端 User-Agent 分支的项目；常规响应式优先 CSS。
- `@formkit/auto-animate`：产品动效明确需要时。
- `@nuxt/scripts`：出现第三方脚本时再启用并配置 CSP。
- `@nuxt/hints`、`@nuxt/test-utils/module`：开发体验选项，不是生产能力；Nuxt 官方把 Test Utils module 标注为可选的 DevTools 集成。
- `workflow`：偏离纯前端定位，且仓库没有消费路径，不应属于核心模板。
- `nuxt-csurf`：只有项目确认 cookie-auth / 同源变更请求模型后再选择。

## 按项目启用

### 1. TanStack Vue Query：只给 server-state 复杂的业务域

**结论：不建议作为所有页面的默认数据层；当前已安装，应降为 `data-heavy` 预设或至少规定按业务域使用。— Executed + Inspected + Assumed**

Nuxt 的 `useFetch` / `useAsyncData` 已处理 SSR payload、水合复用、key、共享状态、刷新和请求去重，足以覆盖首屏、SEO、详情页和普通列表。Vue Query 的增量价值是长期客户端缓存、失效、重试、后台刷新、mutation 和乐观更新。

当前 SSR plugin 与 TanStack 官方 Nuxt 示例基本一致，但仍需每个需要 SSR 的 Query 在页面端做 prefetch / suspense；只有安装 plugin 不等于首屏数据已自动预取。必须规定同一远端资源只能有一个缓存所有者，不能同时由 `useFetch` 与 QueryClient 管理。

官方依据：

- [Nuxt 4 Data Fetching](https://nuxt.com/docs/4.x/getting-started/data-fetching)
- [TanStack Vue Query SSR / Nuxt](https://tanstack.com/query/latest/docs/framework/vue/guides/ssr)
- [TanStack Vue Query Important Defaults](https://tanstack.com/query/latest/docs/framework/vue/guides/important-defaults)
- [TanStack Vue Query Optimistic Updates](https://tanstack.com/query/latest/docs/framework/vue/guides/optimistic-updates)

### 2. 类型化服务接入：OpenAPI 契约存在时启用

**结论：提供 `openapi-typescript` + `openapi-fetch` 的可选接入约定，不默认安装。— Inspected + Assumed**

这是最符合“快速接入服务”的可选能力：`openapi-typescript` 从 OpenAPI 3.0 / 3.1 生成零运行时类型，`openapi-fetch` 用 schema 对 path、query、body 和 response 做类型检查。它不替代 `useFetch` / `useAsyncData` 或 Vue Query，而是作为底层 HTTP client / queryFn。

只有服务提供稳定 OpenAPI schema 时才有收益；否则生成代码会制造错误安全感。项目启用后应在 CI 检查 schema 生成结果与 TypeScript，而不是手工编辑生成类型。

官方依据：

- [openapi-typescript Introduction](https://openapi-ts.dev/introduction)
- [openapi-fetch](https://openapi-ts.dev/openapi-fetch/)
- [openapi-fetch 与 Nuxt useAsyncData 示例](https://openapi-ts.dev/openapi-fetch/examples)

### 3. Sentry：生产可观测性预设

**结论：保留为 `observability` 预设，不默认安装或启用。— Executed + Inspected + Assumed**

当前 Vercel Analytics / Speed Insights 不等于异常追踪。官方 `@sentry/nuxt` 同时封装浏览器 Vue SDK 与服务端 Node SDK，Nuxt Modules 页面确认最低支持 Nuxt 3.7，因此与 Nuxt 4 没有版本边界阻塞。

不默认的原因：需要 DSN、source map 上传凭据、采样与隐私策略，并绑定供应商。项目启用时应由环境变量控制，先关闭 Replay，明确用户信息脱敏和 source map 保留策略。

官方依据：[Nuxt Modules：Official Sentry SDK for Nuxt](https://nuxt.com/modules/sentry)

### 4. PWA 与浏览器 MSW：作为互斥风险共同设计

**结论：PWA 是产品选择；浏览器 MSW 仅用于显式开发模式，不能直接叠加到当前默认 Worker。— Executed + Inspected + Assumed**

当前 PWA 使用 `registerType: 'prompt'`，但没有更新提示 UI，因此配置没有形成用户体验闭环。若项目不需要安装/离线能力，应移出核心；若保留，必须实现更新确认流程并验证缓存策略。

Node MSW 已经足够支撑 Vitest。浏览器 MSW 需要 Service Worker，而项目已有 Workbox PWA Worker；MSW 官方说明同一 scope 的多个 Service Worker 需要合并方案。浏览器 mock 只应在后端未完成的原型联调项目中启用，并受开发环境和显式开关双重限制。

官方依据：

- [Vite PWA Nuxt 集成](https://vite-pwa-org.netlify.app/frameworks/nuxt.html)
- [Vite PWA Prompt for update](https://vite-pwa-org.netlify.app/guide/prompt-for-update.html)
- [MSW Node Integration](https://mswjs.io/docs/integrations/node)
- [MSW Merging Service Workers](https://mswjs.io/docs/recipes/merging-service-workers)

### 5. Storybook：组件规模形成后再选

**结论：当前不默认引入；当本地 UI 组件跨页面 / 跨项目复用，或需要独立视觉测试时，按项目固定版本启用 Storybook。— Executed + Inspected + Assumed**

Storybook 官方 Nuxt 模块支持 Vue 3；其主分支已说明 Nuxt 4 / Storybook 10，但稳定发布、Nuxt 4 与 DevTools/HMR 的版本反馈仍需项目级验证。当前业务组件只有 3 个，先用真实页面、Vitest 与 Playwright 验证最小 UI 集更划算。

Histoire 官方稳定文档仍主要写 Vue 3 / Nuxt 3，Nuxt 4 改进位于预发布版本，因此暂不进入 starter。两套工作台也不应并存。

官方依据：

- [Nuxt Storybook Setup](https://storybook.nuxtjs.org/getting-started/setup/)
- [Nuxt Storybook 官方仓库](https://github.com/nuxt-modules/storybook)
- [Histoire 官方插件](https://histoire.dev/guide/plugins/official)
- [Histoire 官方 Releases](https://github.com/histoire-dev/histoire/releases)

## 暂不引入或不默认启用

| 候选 | 结论 | 状态 | 原因 |
| --- | --- | --- | --- |
| `pinia-plugin-persistedstate` | 暂不引入 | **Inspected + Assumed** | 官方仓库已归档；Nuxt 默认把整个 store 写进 cookie，存在约 4 KB、随请求发送和中间件水合限制。少量非敏感字段优先现有 `useCookie` / VueUse storage。 |
| Axios | 暂不引入 | **Inspected + Assumed** | Nuxt 已内置 `$fetch` / ofetch，`useFetch` / `useAsyncData` 又提供 SSR payload 与水合语义；新增 Axios 会产生第二套请求约定。 |
| 独立全量 UI 库 | 暂不引入 | **Assumed** | 与 shadcn-vue / Reka 形成两套主题、交互和可访问性规范。 |
| 直接全局暴露 Reka UI | 暂不引入 | **Inspected + Assumed** | Reka 作为设计系统低层原语即可，业务层统一消费本地 UI 组件。 |
| `@vee-validate/zod` | 不引入 | **Executed + Inspected** | vee-validate v5 已通过 Standard Schema 直接消费 Zod，官方迁移文档说明适配包不再需要。 |
| 浏览器 MSW 默认启动 | 不启用 | **Executed + Inspected** | 与 PWA Worker 共享 scope，需要合并且不能进入生产。 |
| Histoire | 暂不引入 | **Inspected + Assumed** | 稳定文档尚未明确 Nuxt 4，相关改进仍处预发布版本。 |
| 通用日期、图表、地图、上传、富文本库 | 不默认引入 | **Assumed** | 强依赖产品需求、地区、数据量和服务端协议，应以功能预设接入。 |
| Auth、DB、CMS、支付、邮件 SDK | 本次明确排除 | **Assumed** | 超出纯前端 starter 边界，并会绑定服务商与安全模型。 |

`pinia-plugin-persistedstate` 官方依据：[官方仓库（Archived）](https://github.com/prazdevs/pinia-plugin-persistedstate)；[Nuxt 使用与限制](https://prazdevs.github.io/pinia-plugin-persistedstate/frameworks/nuxt.html)

## 表单版本决策

**结论：能力保留，但当前 beta 版本必须被明确标记；生产 starter 应在“锁定 beta 并持续验证”与“回到稳定 v4”之间做一次正式选择。— Executed + Inspected + Assumed**

当前实现已经按 v5 Standard Schema 直接传入 Zod，并有集成测试，这是正确方向；不应再增加 `@vee-validate/zod`。但本地依赖名明确为 `5.0.0-beta.1`。在 v5 stable 发布前，建议：

1. 保持精确版本，不使用范围自动升级。
2. README 明示 beta，保留真实复杂表单、嵌套字段、异步校验和 SSR 测试。
3. 关注 v5 迁移文档提到的行为变化：schema defaults 和 required meta 不再由 Standard Schema 自动提供。
4. 若模板目标是“低风险生产默认”，则切回稳定 v4，而不是假定 beta 等同稳定版。

官方依据：

- [vee-validate v5 Nuxt Integration](https://vee-validate.logaretm.com/v5/integrations/nuxt/)
- [vee-validate v5 Migration](https://vee-validate.logaretm.com/v5/guide/migration/)
- [vee-validate v5 Zod / Standard Schema](https://vee-validate.logaretm.com/v5/guide/composition-api/getting-started/)

## 推荐实施顺序

1. **先建立 lite → Gnuxter 的继承关系。— Executed + Inspected**  
   把 gnuxter-lite 的公共配置、主题、组件和 composable 收敛为基础 Nuxt Layer；移除或隔离其演示页面与 demo API；Gnuxter 通过 `extends` 消费，并只维护表单、复杂 UI、服务预设等增量能力。

2. **再修闭环，不装库。— Executed + Inspected**  
   修正 layout slot；补 `error.vue`、加载/空/错/重试状态；抽离 site / API runtime config 与 `.env.example`；补 CI；移除占位测试；统一字体和主题令牌。

3. **加入最小 UI 与可访问性回归。— Inspected + Assumed**  
   初始化 shadcn-vue，人工合并 CSS，只加最小组件集；加入 axe Playwright 核心路径测试。

4. **建立安全头基线（已完成）。— Executed + Inspected**  
   `nuxt-security` 已限定为 headers / CSP，并通过类型检查、生产 SSR 构建、Playwright 响应头测试和 SSG 生成验证；静态 HTML 已包含 CSP meta、hash 与 SRI，不默认开启服务器中间件和 CSRF。

5. **做默认依赖瘦身。— Executed + Assumed**  
   把 Vue Query、PWA、Vercel 监控、device、auto-animate、workflow 和 nuxt-csurf 移到按项目预设或移除；`@nuxt/test-utils/module` 仅保留为开发体验选项。

6. **再提供服务预设。— Inspected + Assumed**  
   `data-heavy` 使用 Vue Query；有 OpenAPI schema 时使用类型化 client；生产需要错误监控时启用 Sentry；组件规模增大后启用 Storybook。

## 本次验证边界

- **Executed**：读取并检索了当前 `package.json`、`nuxt.config.ts`、`app/`、`test/`、`tests/`、`docs/`，并对照 `gnuxter-lite` 的依赖、配置和目录；移除直接 `nuxt-csurf`、安装 `nuxt-security@2.5.1`，执行 Nuxt prepare、lint/typecheck、单元测试、生产 SSR 构建、Playwright E2E、SSG generate、依赖审计及静态产物检查。
- **Inspected**：只使用 Nuxt、各库官方文档、官方仓库或 Nuxt Modules 页面核对能力与兼容边界。
- **Assumed**：以上“默认 / 按项目 / 暂不引入”是基于 Gnuxter 的纯前端复杂 C 端定位，不代表所有 Nuxt 项目的统一答案。
- **未执行**：其余候选库仍未安装；shadcn-vue、axe、Sentry、OpenAPI client、浏览器 MSW 等候选项的 bundle、SSR hydration 与运行时兼容性仍需在实际引入时验证。
