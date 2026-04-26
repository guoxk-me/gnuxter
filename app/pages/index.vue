<script setup lang="ts">
const { t } = useI18n()

// SEO
useSeoMeta({
  title: () => t('home.hero.title'),
  description: () => t('home.hero.subtitle'),
})

// Schema.org
useSchemaOrg([
  defineWebPage({
    name: () => t('home.hero.title'),
    description: () => t('home.hero.subtitle'),
  }),
])

// Features list with icons
const features = computed(() => [
  {
    key: 'i18n',
    icon: 'lucide:languages',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950',
  },
  {
    key: 'seo',
    icon: 'lucide:search',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-950',
  },
  {
    key: 'tailwind',
    icon: 'lucide:palette',
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-50 dark:bg-sky-950',
  },
  {
    key: 'pinia',
    icon: 'lucide:database',
    color: 'text-yellow-600 dark:text-yellow-400',
    bg: 'bg-yellow-50 dark:bg-yellow-950',
  },
  {
    key: 'icons',
    icon: 'lucide:star',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-950',
  },
  {
    key: 'fonts',
    icon: 'lucide:type',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-950',
  },
  {
    key: 'csrf',
    icon: 'lucide:shield-check',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950',
  },
  {
    key: 'animate',
    icon: 'lucide:sparkles',
    color: 'text-pink-600 dark:text-pink-400',
    bg: 'bg-pink-50 dark:bg-pink-950',
  },
])

// Auto-animate demo
const demoList = ref([
  { id: 1, text: '条目 A' },
  { id: 2, text: '条目 B' },
  { id: 3, text: '条目 C' },
])

let nextId = 4

function addItem() {
  demoList.value.push({ id: nextId++, text: `条目 ${String.fromCharCode(63 + nextId)}` })
}

function removeItem(id: number) {
  demoList.value = demoList.value.filter(item => item.id !== id)
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <!-- Hero -->
    <section class="mb-16 text-center animate-slide-up">
      <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-200 dark:border-primary-800
                  bg-primary-50 dark:bg-primary-950 px-4 py-1.5 text-sm text-primary-700 dark:text-primary-300">
        <Icon name="lucide:rocket" class="size-4" />
        <span>Nuxt 4 · Vue 3 · TypeScript</span>
      </div>
      <h1 class="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
        {{ t('home.hero.title') }}
      </h1>
      <p class="mx-auto mb-8 max-w-xl text-lg text-gray-500 dark:text-gray-400">
        {{ t('home.hero.subtitle') }}
      </p>
      <div class="flex flex-wrap justify-center gap-3">
        <NuxtLink :to="useLocalePath()('/about')" class="btn-primary">
          <Icon name="lucide:book-open" class="size-4" />
          {{ t('home.hero.cta') }}
        </NuxtLink>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener"
          class="btn-secondary"
        >
          <Icon name="lucide:github" class="size-4" />
          GitHub
        </a>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="mb-16">
      <h2 class="mb-8 text-center text-2xl font-bold">
        {{ t('home.features.title') }}
      </h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="f in features"
          :key="f.key"
          class="card group"
        >
          <div :class="['mb-3 inline-flex rounded-lg p-2.5', f.bg]">
            <Icon :name="f.icon" :class="['size-5', f.color]" />
          </div>
          <h3 class="mb-1.5 font-semibold">
            {{ t(`home.features.${f.key}.title`) }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {{ t(`home.features.${f.key}.desc`) }}
          </p>
        </div>
      </div>
    </section>

    <!-- Auto Animate Demo -->
    <section class="mb-16">
      <div class="card">
        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Icon name="lucide:sparkles" class="size-5 text-pink-500" />
            <h3 class="font-semibold">Auto Animate 动画演示</h3>
          </div>
          <button class="btn-primary text-sm" @click="addItem">
            <Icon name="lucide:plus" class="size-4" />
            添加
          </button>
        </div>
        <ul v-auto-animate class="flex flex-col gap-2">
          <li
            v-for="item in demoList"
            :key="item.id"
            class="flex items-center justify-between rounded-lg border border-[var(--color-border)]
                   bg-white dark:bg-gray-800 px-4 py-3 text-sm"
          >
            <span>{{ item.text }}</span>
            <button
              class="rounded p-1 text-gray-400 hover:text-red-500 transition-colors"
              @click="removeItem(item.id)"
            >
              <Icon name="lucide:x" class="size-4" />
            </button>
          </li>
        </ul>
      </div>
    </section>

    <!-- SEO verification links -->
    <section class="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-6">
      <h3 class="mb-4 flex items-center gap-2 font-semibold">
        <Icon name="lucide:terminal" class="size-5 text-gray-500" />
        SEO 验证链接
      </h3>
      <div class="flex flex-wrap gap-3 text-sm">
        <a href="/sitemap.xml" target="_blank" class="btn-secondary">
          <Icon name="lucide:map" class="size-4" />
          sitemap.xml
        </a>
        <a href="/robots.txt" target="_blank" class="btn-secondary">
          <Icon name="lucide:bot" class="size-4" />
          robots.txt
        </a>
        <a href="/__og-image__/image" target="_blank" class="btn-secondary">
          <Icon name="lucide:image" class="size-4" />
          OG Image
        </a>
      </div>
    </section>
  </div>
</template>
