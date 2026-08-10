# 🧱 Gnuxter

English | [简体中文](./README.zh-CN.md)

A production-oriented Nuxt 4 starter template. Gnuxter pre-configures the infrastructure layer that is commonly required across projects — internationalization, SEO, accessibility, theming, security, and testing — so that development can begin at the application layer rather than the configuration layer.

## ✨ Features

| Category | Implementation |
|---|---|
| 🏗️ Framework | Nuxt 4, Vue 3, TypeScript |
| 🎨 Styling | Tailwind CSS 4, CSS custom properties, dark mode |
| 🗃️ State | Pinia |
| 🌐 Internationalization | `@nuxtjs/i18n` — `zh-CN` and `en-US` locales, prefix routing strategy, browser language detection |
| 🔤 Fonts | `@nuxt/fonts` — Inter, Noto Sans SC via Google Fonts |
| 🖼️ Icons | `@nuxt/icon` — Lucide collection, server-side bundle |
| 🔍 SEO | `nuxt-seo-utils`, `nuxt-og-image`, `nuxt-schema-org`, `@nuxtjs/sitemap`, `@nuxtjs/robots` |
| ♿ Accessibility | `@nuxt/a11y` — audit feedback enabled in development |
| 🔒 Security | `nuxt-csurf` — CSRF protection on `POST`, `PUT`, `PATCH`, `DELETE` |
| 📱 Device | `@nuxtjs/device` — server-side device detection |
| 📲 PWA | `@vite-pwa/nuxt` — install manifest, Workbox service worker, and reproducible app icons |
| 📊 Analytics | `@vercel/analytics`, `@vercel/speed-insights` |
| 🎞️ Animation | `@formkit/auto-animate` |
| 🔗 Link Integrity | `nuxt-link-checker` — disabled by default, intended for CI |
| 🧪 Testing | Vitest (unit + Nuxt component), Playwright (E2E) |
| 🧹 Linting | `@nuxt/eslint` + `@antfu/eslint-config` |

## 📋 Prerequisites

- Node.js `^22.19.0 || ^24.11.0 || >=26.0.0`
- pnpm 10.28 or later

## 🚀 Getting Started

```bash
pnpm install
pnpm dev
```

The development server starts at `http://localhost:3000`.

## 📜 Scripts

```bash
# Development
pnpm dev                # start development server
pnpm build              # build for production
pnpm generate           # generate static output
pnpm preview            # preview production build locally

# Quality
pnpm check              # run lint and type checking
pnpm lint               # check code with the Antfu ESLint config
pnpm lint:fix           # fix lint and formatting issues
pnpm typecheck          # run Nuxt/Vue TypeScript checks

# Testing
pnpm test               # run all Vitest tests
pnpm test:watch         # run Vitest in watch mode
pnpm test:coverage      # run Vitest with coverage report
pnpm test:unit          # run unit tests only
pnpm test:nuxt          # run Nuxt component tests only
pnpm test:e2e           # run Playwright E2E tests
pnpm test:e2e:ui        # run Playwright E2E tests with UI

# PWA
pnpm pwa:assets         # regenerate install icons from public/favicon.svg
```

## 📁 Project Structure

```
app/
├── app.vue
├── assets/css/
│   └── main.css          # Tailwind entry, design tokens, base styles
├── components/
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   └── LangSwitcher.vue
├── layouts/
│   └── default.vue
├── pages/
│   └── index.vue
└── stores/
    └── app.ts            # theme and navigation state
i18n/
└── locales/
    ├── en.json
    └── zh.json
test/
├── nuxt/                 # Nuxt component tests (vitest + @nuxt/test-utils)
└── unit/                 # pure unit tests (vitest, node environment)
tests/                    # Playwright E2E tests
.vscode/                  # ESLint and Vue editor recommendations
nuxt.config.ts
pnpm-workspace.yaml       # package-manager policy and security overrides
pwa-assets.config.ts      # deterministic PWA icon generation
playwright.config.ts
vitest.config.ts
```

## ⚙️ Configuration Reference

All module configuration is centralized in `nuxt.config.ts`.

### `site`
Site-wide metadata consumed by the SEO module suite. Update `url`, `name`, and `description` before deployment.

### `i18n`
Locale definitions, routing strategy (`prefix_except_default`), and browser language detection via cookie. Language files are located in `i18n/locales/`.

### `fonts`
Font families loaded via `@nuxt/fonts`. Currently configured for Inter and Noto Sans SC from Google Fonts.

### `icon`
Icon collections bundled server-side. Currently includes the Lucide collection.

### `ogImage`
Open Graph image generation via `nuxt-og-image`. Preview at `/__og-image__/image` during development.

### `sitemap` / `robots`
Sitemap and robots.txt generation. Accessible at `/sitemap.xml` and `/robots.txt`.

### `schemaOrg`
Structured data identity block. Currently configured as `Organization`. Update `name` and `url` to match the target project.

### `csurf`
CSRF token enforcement on write methods. Set `https: true` in production; configure any endpoint-specific exception through Nuxt route rules.

### `a11y`
Accessibility audit feedback is enabled in development. Findings are surfaced in the browser console.

### `linkChecker`
Disabled by default. Enable during CI builds by setting `enabled: true` or via environment variable.

### `pwa`
`@vite-pwa/nuxt` generates `/manifest.webmanifest`, `/sw.js`, and a Workbox runtime during production builds. The service worker precaches versioned Nuxt assets and install icons, while SSR navigation and API responses stay network-only to avoid caching dynamic or CSRF-protected data. Updates use the safe `prompt` lifecycle and activate after the existing app session closes unless you add an update prompt UI.

The source icon is `public/favicon.svg`. Run `pnpm pwa:assets` after replacing it to regenerate the favicon, 192/512 icons, maskable icon, and Apple touch icon.

### `eslint`
Nuxt keeps project-aware globals and directory rules, while `@antfu/eslint-config` owns JavaScript, TypeScript, Vue, import ordering, and code style. ESLint is also the formatter; the project does not require Prettier.

## ✅ Customization Checklist

Before adapting this template for a production project, address the following:

- [ ] Update `site.url`, `site.name`, `site.description`, and `schemaOrg.identity` in `nuxt.config.ts`
- [ ] Replace locale strings in `i18n/locales/en.json` and `i18n/locales/zh.json`
- [ ] Replace the demo landing page in `app/pages/index.vue`
- [ ] Set `csurf.https` to `true` for HTTPS deployments
- [ ] Add `runtimeConfig` and a `.env.example` file for any external service credentials
- [ ] Enable `linkChecker` in CI
- [ ] Replace `public/favicon.svg`, then run `pnpm pwa:assets`
- [ ] Add a PWA update prompt if the target product needs in-session updates
- [ ] Replace placeholder tests with project-specific test cases
- [ ] Remove or configure modules that are not required for the target project

## 📄 License

MIT
