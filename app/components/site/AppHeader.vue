<script setup lang="ts">
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { locale, t } = useI18n()

const navItems = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.docs'), to: localePath('/docs') },
  { label: t('nav.blog'), to: localePath('/blog') },
  { label: t('nav.changelog'), to: localePath('/changelog') },
  { label: t('nav.search'), to: localePath('/search') }
])

const alternateLocale = computed(() => (locale.value === 'en' ? 'zh' : 'en'))
const localeToggle = computed(() => ({
  label: locale.value === 'en' ? '中文' : 'EN',
  to: switchLocalePath(alternateLocale.value)
}))
</script>

<template>
  <header class="sticky top-0 z-20 mb-10 border-b border-border/70 bg-background/80 py-4 backdrop-blur">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="space-y-1">
        <NuxtLink :to="localePath('/')" class="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
          Gnuxter
        </NuxtLink>
        <p class="text-sm text-muted-foreground">
          {{ t('site.tagline') }}
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <nav class="flex flex-wrap items-center gap-1 rounded-full border border-border/70 bg-card/70 p-1 shadow-sm">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
            active-class="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <Button as-child variant="outline" size="sm" class="rounded-full">
          <NuxtLink :to="localeToggle.to || localePath('/')">
            {{ localeToggle.label }}
          </NuxtLink>
        </Button>

        <Button as-child variant="outline" size="sm" class="rounded-full">
          <NuxtLink :to="localePath('/search')">
            {{ t('nav.search') }}
          </NuxtLink>
        </Button>

        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
