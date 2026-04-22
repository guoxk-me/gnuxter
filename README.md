# Gnuxter

Gnuxter is a content-first Nuxt 4 starter for bilingual documentation, blog, and changelog sites.

It ships with `Nuxt Content`, `@nuxtjs/i18n`, `@nuxtjs/seo`, `shadcn-vue`, Tailwind CSS, dark mode, and a starter information architecture that is intentionally heavier than the default Nuxt scaffold.

## What is included

- Nuxt 4 with pnpm
- `shadcn-vue` UI primitives wired through `shadcn-nuxt`
- Tailwind CSS v4 token layer
- Nuxt Content collections for docs, blog, changelog, and authors
- English default routes with Chinese under `/zh/*`
- Docs sidebar, table of contents, and prev-next navigation
- Blog cards, tags, author metadata, tag archives, and author archives
- Dedicated tag index and author index pages for blog navigation
- Unified search across docs, blog, and changelog
- Nuxt SEO, sitemap, robots, schema.org, and locale-aware head tags
- Color mode support

## Route model

- English docs: `/docs`
- Chinese docs: `/zh/docs`
- English blog: `/blog`
- Chinese blog: `/zh/blog`
- English changelog: `/changelog`
- Chinese changelog: `/zh/changelog`

## Content structure

```text
content/
  authors/
  blog/
    en/
    zh/
  changelog/
    en/
    zh/
  docs/
    en/
    zh/
```

Collection schemas live in `content.config.ts`.

## Development

Install dependencies:

```bash
pnpm install
```

Start the dev server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

Generate a static build:

```bash
pnpm generate
```

## Configuration notes

- Site URL is read from `NUXT_PUBLIC_SITE_URL` and falls back to `https://gnuxter.dev`.
- i18n uses `prefix_except_default`, so English stays unprefixed.
- `@nuxt/robots` writes to `public/_robots.txt` in this setup.
- App-level canonical tags are generated from the current route and `NUXT_PUBLIC_SITE_URL`.
- Sitemap is configured with `zeroRuntime: true` to reduce runtime overhead.
- OG image generation is currently disabled in `nuxt.config.ts`.

## Next ideas

- Add breadcrumb polish and richer docs section landing pages
- Improve search ranking and filtering
- Add author index and tag index pages
- Expand sample content and documentation for template users
- Add automated tests
