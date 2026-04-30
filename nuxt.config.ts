// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@vercel/analytics',
    '@vercel/speed-insights',
    '@nuxt/test-utils',
    '@formkit/auto-animate',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/icon',
    '@nuxt/scripts',
    '@nuxt/fonts',
    'workflow',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-og-image',
    'nuxt-schema-org',
    'nuxt-link-checker',
    'nuxt-csurf',
    '@nuxtjs/device',
    'nuxt-seo-utils',
    '@nuxt/hints',
  ],

  // ─── CSS ────────────────────────────────────────────────────────────────────
  css: ['~/assets/css/main.css'],

  // ─── Vite ────────────────────────────────────────────────────────────────────
  vite: {
    plugins: [tailwindcss()],
  },

  // ─── Site metadata (used by SEO suite) ──────────────────────────────────────
  site: {
    url: 'http://localhost:3000',
    name: 'Gnuxter',
    description: 'A universal Nuxt 4 starter template with i18n, SEO, and more.',
    defaultLocale: 'zh',
  },

  // ─── i18n ────────────────────────────────────────────────────────────────────
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'zh',
    locales: [
      { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  // ─── Fonts ───────────────────────────────────────────────────────────────────
  fonts: {
    families: [
      { name: 'Inter', provider: 'google' },
      { name: 'Noto Sans SC', provider: 'google' },
    ],
  },

  // ─── Icons ───────────────────────────────────────────────────────────────────
  icon: {
    serverBundle: {
      collections: ['lucide'],
    },
  },

  // ─── OG Image ────────────────────────────────────────────────────────────────
  ogImage: {
    enabled: true,
  },

  // ─── Sitemap ─────────────────────────────────────────────────────────────────
  sitemap: {
    strictNuxtContentPaths: false,
  },

  // ─── Robots ──────────────────────────────────────────────────────────────────
  robots: {
    disallow: ['/api/', '/_nuxt/'],
  },

  // ─── Schema.org ──────────────────────────────────────────────────────────────
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Gnuxter',
      url: 'http://localhost:3000',
    },
  },

  // ─── CSRF ────────────────────────────────────────────────────────────────────
  csurf: {
    https: false,
    cookie: {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
    },
    methodsToProtect: ['POST', 'PUT', 'PATCH', 'DELETE'],
    excludedUrls: ['/api/health'],
    headerName: 'csrf-token',
  },

  // ─── Link Checker ────────────────────────────────────────────────────────────
  linkChecker: {
    enabled: false, // enable during build/CI only
  },

  // ─── A11y ────────────────────────────────────────────────────────────────────
  a11y: {
    auditUserFeedback: {
      enabled: true,
    },
  },
})
