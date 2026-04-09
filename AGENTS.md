# AGENTS.md

This file gives repository-specific guidance to coding agents working in `gnuxter`.

## Scope

- Applies to the whole repository.
- Prefer existing project conventions over generic framework defaults.
- This is a Nuxt 4 + Vue 3 + TypeScript + Nuxt Content project managed with `pnpm`.

## Rule Sources

- No root `AGENTS.md` existed before this file was created.
- No `.cursor/rules/` directory was found.
- No `.cursorrules` file was found.
- No `.github/copilot-instructions.md` file was found.
- If any of those files are added later, treat them as higher-priority repo guidance and merge them with this document.

## Stack Snapshot

- Framework: `nuxt` `^4.4.2`
- Language: `typescript` `^5.9.3`
- UI: `vue` `^3.5.x`, `reka-ui`, `shadcn-nuxt`, Tailwind CSS v4
- Content: `@nuxt/content`
- i18n: `@nuxtjs/i18n`
- SEO: `@nuxtjs/seo`
- Utilities: `@vueuse/core`, `zod`, `class-variance-authority`, `clsx`, `tailwind-merge`

## Repository Layout

- `app/` contains the Nuxt app code.
- `app/pages/` uses file-based routing.
- `app/components/site/` contains site-specific UI.
- `app/components/docs/` and `app/components/blog/` contain feature components.
- `app/components/ui/` contains shadcn/reka-style primitives and wrappers.
- `app/plugins/` contains Nuxt plugins.
- `content/` contains docs, blog, changelog, and author content.
- `content.config.ts` defines content collection schemas.
- `nuxt.config.ts` contains runtime, modules, SEO, i18n, and content config.
- `lib/utils.ts` is the shared home of the `cn()` class-merging helper.

## Package Manager

- Use `pnpm` for all package management and script execution.
- Lockfile is `pnpm-lock.yaml`; do not switch package managers.
- Prefer `pnpm exec <tool>` when there is no package script.

## Build, Dev, Lint, and Check Commands

### Install

```bash
pnpm install
```

### Dev Server

```bash
pnpm dev
```

### Production Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Static Generation

```bash
pnpm generate
```

### Lint Entire Repository

```bash
pnpm exec eslint .
```

### Lint a Single File

```bash
pnpm exec eslint app/pages/index.vue
pnpm exec eslint app/components/site/AppHeader.vue
```

### Type Checking

```bash
pnpm exec nuxt typecheck
```

### Tests

- There is currently no test script in `package.json`.
- No `vitest`, `jest`, `playwright`, or other test config was found.
- No `*.test.*` or `*.spec.*` files were found.
- `pnpm test` is not a supported workflow in the current repo state.

### Running a Single Test

- Not currently possible because no test runner is configured.
- If you add a test framework, also add documented package scripts for both full and single-test execution.

## Current Baseline Health

- `pnpm exec eslint .` runs successfully but reports warnings.
- Current warnings are mostly `vue/require-default-prop` in generated UI wrapper components.
- `pnpm exec nuxt typecheck` currently fails in the existing codebase.
- Known current typecheck issues include `app/app.vue`, `app/pages/docs/[...slug].vue`, and `app/pages/docs/index.vue`.
- There is also a `vue-router/volar/sfc-route-blocks` package export resolution issue during typecheck.
- Do not assume the repository starts from a fully green baseline.

## High-Level Coding Conventions

- Use Vue 3 Composition API with `<script setup lang="ts">`.
- Stay in TypeScript; do not introduce plain JS files unless there is a strong reason.
- Prefer Nuxt auto-imported composables and components when the project already relies on them.
- Keep page components focused on data loading, derived state, SEO, and layout composition.
- Keep reusable presentation in feature components or `app/components/ui/`.

## Imports

- Prefer type-only imports via `import type { ... } from '...'`.
- Prefer alias imports like `@/lib/utils` for app-level shared modules.
- Relative imports are acceptable for very local re-exports or sibling component modules.
- Existing shadcn-generated files often use relative imports like `from "."`; preserve local patterns in that subtree.
- Group imports as: type imports, value imports, then local style/helpers if needed.
- Do not add unused imports; rely on Nuxt auto-imports where appropriate.

## Formatting Style

- Match the surrounding file before changing quote style.
- The app code mostly uses single quotes and no semicolons.
- Some generated UI files use double quotes; do not churn those files just for quote normalization.
- Keep object literals and chained content queries readable with one call per line when long.
- Prefer early returns / guard clauses over deep nesting.
- Avoid adding comments unless the logic is non-obvious.

## Types

- Define explicit interfaces or type aliases for props and structured data.
- Prefer narrow types over `any`; no existing `any` usage was found in the app code.
- Use `withDefaults(defineProps<Props>(), ...)` when optional props need defaults.
- Keep prop shapes close to the component that owns them unless reused broadly.
- Use schema validation in content definitions with `zod` when shaping authored content.
- Preserve nullable and optional states explicitly in computed values and props.

## Naming

- Vue SFC component filenames use PascalCase, e.g. `AppHeader.vue`, `BlogCard.vue`.
- Route files follow Nuxt conventions, including dynamic segments like `[tag].vue` and `[...slug].vue`.
- Local variables and functions use `camelCase`.
- Interfaces and types use `PascalCase`.
- Content collection names are lowercase: `docs`, `blog`, `changelog`, `authors`.
- Keep naming descriptive and domain-specific; avoid vague names like `data2`, `helper`, or `temp`.

## Vue and Nuxt Patterns

- Use `useAsyncData()` for async page data and keep cache keys deterministic.
- When loading multiple independent queries, use `Promise.all()`.
- Use `computed()` for derived values instead of mutating watcher-driven state.
- Use `useSeoMeta()` and `useHead()` for page/head metadata.
- Throw `createError({ statusCode, statusMessage })` for not-found page states.
- Prefer composables like `useI18n()`, `useLocalePath()`, and `useSwitchLocalePath()` instead of ad hoc route logic.

## Error Handling

- For missing content pages, follow the existing `createError(404)` pattern.
- Fail loudly for impossible states rather than silently swallowing errors.
- Keep user-visible error messages localizable when they reach the UI.
- Avoid broad `try/catch` blocks unless you can add meaningful recovery or context.
- When touching async data flows, preserve SSR-safe behavior.

## i18n and Content Rules

- This repo is bilingual: English default, Chinese under `/zh/*`.
- Preserve the `prefix_except_default` routing model.
- Content queries typically filter by `locale` and `draft = false`.
- Docs ordering uses the `order` field; blog/changelog ordering uses `publishedAt DESC`.
- Authors are loaded from the `authors` data collection.
- When adding content schema fields, update `content.config.ts` and any affected templates together.

## UI and Styling Rules

- Tailwind utility classes are the primary styling approach.
- Reuse shared UI primitives before building custom replacements.
- Use `cn()` to merge Tailwind class lists.
- Use `cva()` for component variant systems in shared UI components.
- Preserve the existing visual language: rounded cards, muted borders, layered surfaces, and locale-aware navigation.
- Keep styles responsive; existing code consistently includes mobile and desktop layouts.

## Working in `app/components/ui`

- Treat this subtree as generated-and-customized shadcn/reka wrapper code.
- Make minimal, targeted edits there; avoid broad stylistic rewrites.
- Follow the existing prop patterns around `class?: HTMLAttributes['class']`.
- Be aware that some files currently trigger lint warnings for missing default values on optional props.
- If you fix warnings here, do it consistently across related components.

## Files to Check Before Large Changes

- `package.json` for available scripts.
- `nuxt.config.ts` for runtime/module constraints.
- `content.config.ts` for content schema changes.
- `components.json` for UI alias and shadcn settings.
- `README.md` for documented product intent and routes.

## Agent Checklist Before Finishing

- Run `pnpm exec eslint .` after meaningful code changes.
- Run `pnpm exec nuxt typecheck` when TypeScript-relevant files change, but remember the baseline is currently not clean.
- If you add tests, add package scripts and document how to run a single test.
- Do not claim tests passed unless you actually ran them.
- Call out baseline failures separately from regressions you introduced.

## Change Discipline

- Keep edits small and local.
- Do not reformat unrelated files.
- Do not replace established Nuxt/Vue idioms with generic patterns.
- Prefer improving existing abstractions over introducing parallel ones.
- When uncertain, follow the nearest existing file in the same subtree.
