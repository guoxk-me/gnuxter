<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('about.title')} — Gnuxter`,
  description: () => t('about.desc'),
})

useSchemaOrg([
  defineWebPage({
    name: () => t('about.title'),
    description: () => t('about.desc'),
  }),
])

defineOgImageComponent('NuxtSeo', {
  title: 'Gnuxter',
  description: 'Universal Nuxt 4 Template',
  siteName: 'Gnuxter',
})

const stack = [
  { name: 'Nuxt 4', icon: 'lucide:layers', desc: '全栈 Vue 框架，支持 SSR/SSG' },
  { name: 'Vue 3', icon: 'lucide:component', desc: 'Composition API + script setup' },
  { name: 'TypeScript', icon: 'lucide:code-2', desc: '全链路类型安全' },
  { name: 'Tailwind CSS', icon: 'lucide:palette', desc: '原子化 CSS 样式系统' },
  { name: '@nuxtjs/i18n', icon: 'lucide:languages', desc: '多语言国际化方案' },
  { name: 'Pinia', icon: 'lucide:database', desc: '类型安全的状态管理' },
  { name: 'nuxt-og-image', icon: 'lucide:image', desc: '动态 OG 图片生成' },
  { name: 'nuxt-schema-org', icon: 'lucide:tag', desc: 'JSON-LD 结构化数据' },
  { name: '@nuxtjs/sitemap', icon: 'lucide:map', desc: '自动生成 XML 站点地图' },
  { name: '@nuxtjs/robots', icon: 'lucide:bot', desc: '动态 robots.txt 控制' },
  { name: 'nuxt-csurf', icon: 'lucide:shield-check', desc: 'CSRF 跨站请求伪造防护' },
  { name: '@nuxt/icon', icon: 'lucide:star', desc: 'Iconify 图标集，支持 SSR' },
  { name: '@nuxt/fonts', icon: 'lucide:type', desc: 'Google Fonts 自动优化' },
  { name: '@formkit/auto-animate', icon: 'lucide:sparkles', desc: 'DOM 变化自动动画' },
  { name: '@nuxtjs/device', icon: 'lucide:monitor-smartphone', desc: '服务端设备类型检测' },
  { name: 'Vitest + Playwright', icon: 'lucide:flask-conical', desc: '单元 + E2E 测试套件' },
]
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <!-- Header -->
    <div class="mb-12 animate-slide-up">
      <h1 class="mb-3 text-3xl font-bold sm:text-4xl">
        {{ t('about.title') }}
      </h1>
      <p class="max-w-2xl text-lg text-gray-500 dark:text-gray-400">
        {{ t('about.desc') }}
      </p>
    </div>

    <!-- OG Image Preview -->
    <div class="mb-12 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-6">
      <div class="mb-3 flex items-center gap-2">
        <Icon name="lucide:image" class="size-5 text-gray-500" />
        <h2 class="font-semibold">OG Image 预览</h2>
      </div>
      <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
        以下是本页面自动生成的 Open Graph 图片，可在社交平台分享时显示：
      </p>
      <a
        href="/__og-image__/image"
        target="_blank"
        class="btn-secondary inline-flex"
      >
        <Icon name="lucide:external-link" class="size-4" />
        在新标签页查看 OG Image
      </a>
    </div>

    <!-- Tech Stack -->
    <div>
      <h2 class="mb-6 text-2xl font-bold">{{ t('about.stack') }}</h2>
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in stack"
          :key="item.name"
          class="card flex items-start gap-3"
        >
          <div class="rounded-md bg-gray-100 dark:bg-gray-800 p-2 shrink-0">
            <Icon :name="item.icon" class="size-4 text-gray-600 dark:text-gray-300" />
          </div>
          <div>
            <div class="font-medium text-sm">{{ item.name }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
