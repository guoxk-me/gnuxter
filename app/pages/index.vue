<script setup lang="ts">
const { t, locale, locales } = useI18n()
const appStore = useAppStore()

useSeoMeta({
  title: () => t('home.hero.title'),
  description: () => t('home.hero.subtitle'),
})

useSchemaOrg([
  defineWebPage({
    name: () => t('home.hero.title'),
    description: () => t('home.hero.subtitle'),
  }),
])

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
  <div class="mx-auto max-w-2xl px-6 py-20 sm:py-28">

    <!-- Hero -->
    <section class="animate-slide-up mb-20">
      <p class="mb-4 text-xs tracking-widest uppercase text-muted-foreground">
        Nuxt 4 Starter
      </p>
      <h1 class="mb-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {{ t('home.hero.title') }}
      </h1>
      <p class="text-sm text-muted-foreground leading-relaxed max-w-md">
        {{ t('home.hero.subtitle') }}
      </p>
    </section>

    <!-- Feature list -->
    <section class="divide-y divide-border">

      <!-- Theme -->
      <div class="py-5 flex items-start justify-between gap-6">
        <div class="min-w-0">
          <p class="text-sm font-medium text-foreground">{{ t('home.modules.theme.title') }}</p>
          <p class="mt-0.5 text-xs text-muted-foreground">
            {{ appStore.isDark ? t('home.modules.theme.dark') : t('home.modules.theme.light') }}
          </p>
        </div>
        <button
          class="btn-ghost shrink-0"
          :aria-label="t('home.modules.theme.toggle')"
          @click="appStore.toggleTheme()"
        >
          <Icon :name="appStore.isDark ? 'lucide:sun' : 'lucide:moon'" class="size-3.5" />
          {{ t('home.modules.theme.toggle') }}
        </button>
      </div>

      <!-- i18n -->
      <div class="py-5 flex items-start justify-between gap-6">
        <div class="min-w-0">
          <p class="text-sm font-medium text-foreground">{{ t('home.modules.i18n.title') }}</p>
          <p class="mt-0.5 text-xs text-muted-foreground">{{ currentLocaleName }}</p>
        </div>
        <LangSwitcher />
      </div>

      <!-- Auto Animate -->
      <div class="py-5">
        <div class="flex items-start justify-between gap-6">
          <div class="min-w-0">
            <p class="text-sm font-medium text-foreground">{{ t('home.modules.autoAnimate.title') }}</p>
            <p class="mt-0.5 text-xs text-muted-foreground">{{ t('home.modules.autoAnimate.desc') }}</p>
          </div>
          <button class="btn shrink-0" @click="addItem">
            <Icon name="lucide:plus" class="size-3.5" />
            {{ t('home.modules.autoAnimate.add') }}
          </button>
        </div>
        <ul v-auto-animate class="mt-3 flex flex-wrap gap-1.5">
          <li
            v-for="item in demoList"
            :key="item"
            class="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground"
          >
            {{ t('home.modules.autoAnimate.item', { id: item }) }}
            <button
              class="text-muted-foreground/50 hover:text-foreground transition-colors"
              :aria-label="t('home.modules.autoAnimate.remove')"
              @click="removeItem(item)"
            >
              <Icon name="lucide:x" class="size-3" />
            </button>
          </li>
        </ul>
      </div>

      <!-- SEO -->
      <div class="py-5">
        <p class="text-sm font-medium text-foreground mb-3">{{ t('home.modules.seo.title') }}</p>
        <div class="flex flex-wrap gap-2">
          <a
            v-for="link in seoLinks"
            :key="link.href"
            :href="link.href"
            target="_blank"
            class="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon :name="link.icon" class="size-3.5" />
            {{ link.label }}
          </a>
        </div>
      </div>

    </section>
  </div>
</template>
