# 模板项目缺失清单

## 结论

当前仓库更像是一个已经接入较多 Nuxt 模块的演示型 starter，而不是一个功能闭环清晰、文档完整、可直接分发的模板项目。

项目里已经具备 i18n、主题切换、基础 SEO、Schema.org、OG Image、Sitemap、Robots、测试骨架等能力，但仍存在以下两类问题：

1. 已有能力没有在文档里说明。
2. 已安装的模块没有形成实际使用闭环，或配置还停留在样例状态。

## 已经做了但没有明确表述的能力

以下能力已经在代码中接入，但 README 目前几乎没有体现：

1. 国际化能力：`@nuxtjs/i18n` 已接入，支持 `zh` / `en`。
2. 主题切换：基于 Pinia 管理暗黑模式，并持久化到 `localStorage`。
3. SEO 基础配置：页面已使用 `useSeoMeta`。
4. Schema.org：页面已通过 `useSchemaOrg` 输出结构化数据。
5. OG Image：`nuxt-og-image` 已启用。
6. Sitemap：`@nuxtjs/sitemap` 已启用。
7. Robots：`@nuxtjs/robots` 已启用。
8. 动效能力：`@formkit/auto-animate` 已有页面演示。
9. 基础测试能力：Vitest、Nuxt Test Utils、Playwright 已配置。
10. 可访问性与辅助能力：`@nuxt/a11y`、`@nuxt/icon`、`@nuxt/fonts` 等模块已接入。

## 主要缺失项

### P0 必补

#### 1. README 仍是默认模板文案

现状：`README.md` 仍为 Nuxt 默认 starter 内容。

缺失：

1. 模板定位说明。
2. 已集成能力列表。
3. 项目目录结构说明。
4. 本地开发命令。
5. 测试命令。
6. 部署方式。
7. 环境变量说明。
8. 模块使用说明。

影响：外部使用者无法快速理解这个模板真正提供了什么。

#### 2. 环境配置没有抽离

现状：`nuxt.config.ts` 中仍写死 `http://localhost:3000`。

缺失：

1. `runtimeConfig`。
2. `.env.example`。
3. 生产环境域名配置说明。

影响：SEO、Schema.org、Sitemap 等能力在真实部署时不能直接复用。

#### 3. 工程脚本不完整

现状：`package.json` 只有 `dev`、`build`、`preview`、`test` 等基础命令。

缺失：

1. `lint`
2. `lint:fix`
3. `typecheck`
4. `check` 或等价组合命令

影响：模板缺少最基础的工程质量入口。

#### 4. 没有 CI

现状：仓库中没有 `.github/workflows/*`。

缺失：

1. 安装依赖。
2. Lint。
3. Typecheck。
4. Unit/Nuxt Test。
5. Build。

影响：模板无法在 PR 或 push 时自动验证质量。

#### 5. 测试仍是示例测试

现状：测试文件仍是样例：

1. `test/unit/example.test.ts`
2. `test/nuxt/component.test.ts`
3. `tests/example.spec.ts`

缺失：

1. 主题切换测试。
2. i18n 切换测试。
3. 首页真实渲染测试。
4. SEO 输出测试。
5. E2E 首页行为测试。

影响：虽然看起来“有测试”，但并没有验证模板本身的核心能力。

### P1 已安装但没有闭环的模块与配置

#### 1. `nuxt-csurf` 只配了 config，没有演示路径

现状：`nuxt.config.ts` 已配置 `csurf`。

缺失：

1. 受保护的 `POST` API 示例。
2. 前端表单示例。
3. 文档说明当前仅为预置能力。

影响：模板使用者不知道这个模块如何真正使用。

#### 2. `@nuxtjs/device` 已安装但未使用

缺失：

1. 页面示例。
2. 使用文档。
3. 或移除该模块。

#### 3. `@nuxt/scripts` 已安装但未使用

缺失：

1. 第三方脚本加载示例。
2. 安全加载说明。
3. 或移除该模块。

#### 4. `@vercel/analytics` 与 `@vercel/speed-insights` 缺少部署说明

缺失：

1. 是否仅生产启用的说明。
2. Vercel 部署前提说明。
3. 本地开发是否生效的说明。

#### 5. `nuxt-link-checker` 已配置但关闭

现状：`linkChecker.enabled = false`。

缺失：

1. 在 CI 中开启的方式。
2. 独立脚本命令。
3. 文档说明何时启用。

#### 6. `@nuxt/hints` 与 `workflow` 已装但无仓库说明

缺失：

1. 为什么需要它们。
2. 适用场景。
3. 如果模板用户不需要，是否建议移除。

#### 7. CSRF 配置排除了 `/api/health`，但仓库中没有对应接口

现状：`excludedUrls` 包含 `/api/health`，但项目中没有 `server/` 目录。

缺失：

1. 健康检查接口。
2. 或移除该例外配置。

### P1 配置不一致与样例残留

#### 1. 字体配置和实际使用不一致

现状：

1. `nuxt.config.ts` 加载的是 `Inter`、`Noto Sans SC`。
2. `app/assets/css/main.css` 实际使用的是 `Work Sans`、`Merriweather`、`Playfair Display`、`Lora`、`Noto Serif SC`。

影响：模板的声明配置与实际视觉效果不一致，容易让人误判字体链路是否正常。

#### 2. E2E 测试断言仍是旧样例

现状：`tests/example.spec.ts` 仍断言标题匹配 `/Nuxt/`。

影响：该断言更像默认 starter 遗留，不是当前项目语义。

#### 3. `public/_robots.txt` 容易造成理解混乱

现状：项目已启用 `@nuxtjs/robots`，同时 `public/` 下还有 `_robots.txt`。

影响：不清楚最终输出由哪个来源控制，容易让模板使用者困惑。

### P2 模板仓库常见但尚未补齐的内容

1. `error.vue` 或基础 404 / 500 页面。
2. 一个基础 API 示例。
3. 健康检查接口。
4. 部署文档。
5. `LICENSE`。
6. `CONTRIBUTING.md`。
7. `CHANGELOG.md` 或发布约定。
8. `.env.example`。
9. 模板定位说明：这是演示 starter 还是生产起步模板。

## 代码层面的具体观察

### `README.md`

当前 README 没有体现该模板真正的价值点，只保留了 Nuxt 默认脚手架说明。

### `nuxt.config.ts`

配置层面已经包含较多模块，但存在以下问题：

1. `site.url` 与 `schemaOrg.identity.url` 仍为本地地址。
2. `csurf` 已配置，但缺少实际使用场景。
3. `linkChecker` 被关闭，但没有说明如何在 CI 或构建中启用。

### `package.json`

依赖已经偏“全家桶 starter”，但工程脚本仍偏基础，缺少质量门禁命令。

### 测试文件

测试基础设施已经接好，但目前验证的是“测试框架能跑”，不是“模板功能能用”。

## 建议优先级

### 第一阶段

1. 重写 README。
2. 抽离环境变量与 `runtimeConfig`。
3. 增加 `lint`、`typecheck`、`check` 脚本。
4. 增加 GitHub Actions CI。

### 第二阶段

1. 将示例测试替换为模板能力测试。
2. 决定哪些模块保留，哪些模块移除。
3. 为保留模块补最小可运行示例或使用说明。

### 第三阶段

1. 补错误页。
2. 补健康检查接口。
3. 补部署文档。
4. 补 License 与协作规范文档。

## 建议执行策略

对于当前仓库，建议先做一次“模板收敛”：

1. 把真正想主推的能力保留下来。
2. 把只是尝试接入、但没有示例和文档的模块暂时移除，或明确标注为预留能力。
3. 让 README、配置、页面演示、测试和部署文档形成一致闭环。

只有这样，这个项目才会从“装了很多模块的 starter”变成“可直接复用、可对外介绍的模板”。
