// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@vite-pwa/nuxt',
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

  // AI modified: keep Nuxt globals while Antfu owns the shared JS, TS, and Vue rules.
  eslint: {
    config: {
      standalone: false,
    },
  },

  // ─── CSS ────────────────────────────────────────────────────────────────────
  css: ['~/assets/css/main.css'],

  // ─── Vite ────────────────────────────────────────────────────────────────────
  vite: {
    plugins: [tailwindcss()],
  },

  // AI modified: provide an installable, SSR-safe PWA without caching dynamic navigations.
  pwa: {
    registerType: 'prompt',
    registerWebManifestInRouteRules: true,
    includeAssets: [
      'favicon.ico',
      'favicon.svg',
      'apple-touch-icon-180x180.png',
    ],
    manifest: {
      id: '/',
      name: 'Gnuxter',
      short_name: 'Gnuxter',
      description: 'A universal Nuxt 4 starter template with i18n, SEO, and more.',
      lang: 'zh-CN',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#18181b',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    workbox: {
      cleanupOutdatedCaches: true,
      globPatterns: ['**/*.{css,js,mjs,ico,png,svg}'],
      navigateFallback: null,
    },
  },

  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', href: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon-180x180.png' },
      ],
      meta: [
        { name: 'theme-color', content: '#18181b' },
      ],
    },
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
    clientBundle: {
      icons: [
        'lucide:bot',
        'lucide:image',
        'lucide:languages',
        'lucide:layers',
        'lucide:map',
        'lucide:moon',
        'lucide:plus',
        'lucide:sun',
        'lucide:x',
      ],
      scan: false,
      includeCustomCollections: false,
      sizeLimitKb: 256,
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
    // AI modified: route exceptions belong in routeRules, not the global module options.
    headerName: 'csrf-token',
  },

  // ─── Link Checker ────────────────────────────────────────────────────────────
  linkChecker: {
    enabled: false, // enable during build/CI only
  },

  // ─── A11y ────────────────────────────────────────────────────────────────────
  a11y: {
    // AI modified: retain browser feedback through the module's supported option.
    logIssues: true,
  },
})
