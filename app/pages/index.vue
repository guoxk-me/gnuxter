<script setup lang="ts">
const { t, locale, locales } = useI18n()
const appStore = useAppStore()

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

// Auto-animate demo
const demoList = ref([1, 2, 3])

const currentLocaleName = computed(() =>
  locales.value.find(item => item.code === locale.value)?.name ?? locale.value,
)

const seoLinks = [
  { href: '/sitemap.xml', label: 'sitemap.xml', icon: 'lucide:map' },
  { href: '/robots.txt', label: 'robots.txt', icon: 'lucide:bot' },
  { href: '/__og-image__/image', label: 'OG Image', icon: 'lucide:image' },
]

let nextId = 4

function addItem() {
  demoList.value.push(nextId++)
}

function removeItem(id: number) {
  demoList.value = demoList.value.filter(item => item !== id)
}
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
    <section class="animate-slide-up text-center">
      <div class="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm text-gray-500 dark:text-gray-400">
        <Icon name="lucide:zap" class="size-4" />
        <span>Nuxt 4 Starter</span>
      </div>
      <h1 class="mb-4 text-5xl font-bold tracking-tight sm:text-6xl">
        {{ t('home.hero.title') }}
      </h1>
      <p class="mx-auto max-w-xl text-base text-gray-500 dark:text-gray-400 sm:text-lg">
        {{ t('home.hero.subtitle') }}
      </p>
    </section>

    <section class="mx-auto mt-14 flex max-w-2xl flex-col gap-3">
      <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-4 sm:px-5">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ t('home.modules.theme.title') }}</div>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ t('home.modules.theme.desc') }}</p>
          </div>
          <button
            class="btn-secondary justify-center px-3 py-2 text-sm"
            :aria-label="t('home.modules.theme.toggle')"
            @click="appStore.toggleTheme()"
          >
            <Icon :name="appStore.isDark ? 'lucide:sun' : 'lucide:moon'" class="size-4" />
            {{ t('home.modules.theme.toggle') }}
          </button>
        </div>

        <div class="mt-4 flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm transition-colors">
          <span class="text-gray-500 dark:text-gray-400">{{ t('home.modules.theme.current') }}</span>
          <span class="font-medium">{{ appStore.isDark ? t('home.modules.theme.dark') : t('home.modules.theme.light') }}</span>
        </div>
      </div>

      <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-4 sm:px-5">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ t('home.modules.i18n.title') }}</div>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ t('home.modules.i18n.desc') }}</p>
          </div>
          <LangSwitcher />
        </div>

        <div class="mt-4 flex flex-col gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm">
          <div class="flex items-center justify-between gap-3">
            <span class="text-gray-500 dark:text-gray-400">{{ t('home.modules.i18n.current') }}</span>
            <span class="font-medium">{{ currentLocaleName }}</span>
          </div>
          <p class="text-gray-500 dark:text-gray-400">{{ t('home.modules.i18n.previewBody') }}</p>
        </div>
      </div>

      <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-4 sm:px-5">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ t('home.modules.autoAnimate.title') }}</div>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ t('home.modules.autoAnimate.desc') }}</p>
          </div>
          <button class="btn-primary justify-center text-sm" @click="addItem">
            <Icon name="lucide:plus" class="size-4" />
            {{ t('home.modules.autoAnimate.add') }}
          </button>
        </div>

        <ul v-auto-animate class="mt-4 flex flex-wrap gap-2">
          <li
            v-for="item in demoList"
            :key="item"
            class="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm"
          >
            <span>{{ t('home.modules.autoAnimate.item', { id: item }) }}</span>
            <button
              class="rounded-full p-0.5 text-gray-400 transition-colors hover:text-red-500"
              :aria-label="t('home.modules.autoAnimate.remove')"
              @click="removeItem(item)"
            >
              <Icon name="lucide:x" class="size-3.5" />
            </button>
          </li>
        </ul>
      </div>

      <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-4 sm:px-5">
        <div>
          <div>
            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ t('home.modules.seo.title') }}</div>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ t('home.modules.seo.desc') }}</p>
          </div>
        </div>

        <div class="mt-4 flex flex-wrap gap-2 text-sm">
          <a
            v-for="link in seoLinks"
            :key="link.href"
            :href="link.href"
            target="_blank"
            class="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 transition-colors hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400"
          >
            <Icon :name="link.icon" class="size-4" />
            {{ link.label }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
