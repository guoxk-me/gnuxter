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
    // AI modified: share visual, composable, and SEO capabilities with gnuxter-lite.
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    // AI modified: expose Vee Validate v5 through Nuxt auto-imports.
    '@vee-validate/nuxt',
    '@nuxt/scripts',
    '@nuxt/fonts',
    'workflow',
    '@nuxtjs/seo',
    'nuxt-security',
    '@nuxtjs/device',
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

  // AI modified: align Nuxt Color Mode with the existing Tailwind `.dark` theme tokens.
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  // AI modified: prefix generic form components to avoid collisions in product code.
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
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
    // AI modified: load the display and body families specified by the Pen prototype.
    families: [
      { name: 'Merriweather', provider: 'google' },
      { name: 'Playfair Display', provider: 'google' },
      { name: 'Roboto Mono', provider: 'google' },
      { name: 'Work Sans', provider: 'google' },
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
        'lucide:arrow-right',
        'lucide:arrow-up-right',
        'lucide:bot',
        'lucide:check',
        'lucide:chevron-right',
        'lucide:eye',
        'lucide:eye-off',
        'lucide:github',
        'lucide:image',
        'lucide:languages',
        'lucide:layers',
        'lucide:lock-keyhole',
        'lucide:map',
        'lucide:moon',
        'lucide:plus',
        'lucide:refresh-cw',
        'lucide:scan-search',
        'lucide:shield-check',
        'lucide:sparkles',
        'lucide:sun',
        'lucide:sun-moon',
        'lucide:user-round',
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

  // ─── Security headers & CSP ──────────────────────────────────────────────────
  security: {
    // AI modified: keep the frontend baseline limited to browser headers and CSP.
    strict: false,
    headers: {
      contentSecurityPolicy: {
        'base-uri': ['\'none\''],
        'connect-src': ['\'self\'', 'https:'],
        'default-src': ['\'self\''],
        'font-src': ['\'self\'', 'https:', 'data:'],
        'form-action': ['\'self\''],
        'frame-ancestors': ['\'none\''],
        'frame-src': ['\'self\''],
        'img-src': ['\'self\'', 'https:', 'data:', 'blob:'],
        'manifest-src': ['\'self\''],
        'media-src': ['\'self\'', 'https:', 'blob:'],
        'object-src': ['\'none\''],
        'script-src': ['\'self\'', 'https:', '\'unsafe-inline\'', '\'strict-dynamic\'', '\'nonce-{{nonce}}\''],
        'script-src-attr': ['\'none\''],
        'style-src': ['\'self\'', 'https:', '\'unsafe-inline\''],
        'upgrade-insecure-requests': true,
        'worker-src': ['\'self\'', 'blob:'],
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
      xFrameOptions: 'DENY',
    },
    requestSizeLimiter: false,
    rateLimiter: false,
    xssValidator: false,
    corsHandler: false,
    allowedMethodsRestricter: false,
    basicAuth: false,
    csrf: false,
    hidePoweredBy: true,
    nonce: true,
    removeLoggers: false,
    sri: true,
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
