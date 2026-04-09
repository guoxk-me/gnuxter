// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['../assets/css/tailwind.css'],

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://gnuxter.dev'
    }
  },

  app: {
    head: {
      titleTemplate: '%s · Gnuxter'
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/content'
  ],

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://gnuxter.dev',
    name: 'Gnuxter',
    description: 'A Nuxt starter for bilingual docs, blog, and changelog content.',
    defaultLocale: 'en'
  },

  routeRules: {
    '/__nuxt_content/**': { prerender: true }
  },

  robots: {
    groups: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/__nuxt_content/']
      }
    ]
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Gnuxter',
      url: process.env.NUXT_PUBLIC_SITE_URL || 'https://gnuxter.dev'
    }
  },

  sitemap: {
    zeroRuntime: true,
    defaults: {
      changefreq: 'weekly',
      priority: 0.7
    }
  },

  ogImage: false,

  colorMode: {
    classSuffix: ''
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    langDir: 'locales',
    detectBrowserLanguage: {
      redirectOn: 'root',
      useCookie: true
    },
    locales: [
      {
        code: 'en',
        name: 'English',
        language: 'en-US',
        file: 'en.json'
      },
      {
        code: 'zh',
        name: '中文',
        language: 'zh-CN',
        file: 'zh.json'
      }
    ],
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://gnuxter.dev'
  },

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  },

  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  }
})
