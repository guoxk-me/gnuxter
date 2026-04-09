<script setup lang="ts">
const localePath = useLocalePath()
const { locale, t } = useI18n()

const { data: docs } = await useAsyncData(() => `docs-${locale.value}`, () => {
  return queryCollection('docs').where('locale', '=', locale.value).where('draft', '=', false).order('order', 'ASC').all()
})

const sections = computed(() => {
  const groups = new Map<string, { name: string, entries: typeof docs.value }>()

  for (const entry of docs.value || []) {
    const name = entry.category || t('docs.uncategorized')

    if (!groups.has(name))
      groups.set(name, { name, entries: [] })

    groups.get(name)?.entries.push(entry)
  }

  return Array.from(groups.values()).map(section => ({
    ...section,
    to: `${localePath('/docs')}#${section.name}`
  }))
})

useSeoMeta({
  title: () => t('docs.seoTitle'),
  description: () => t('docs.seoDescription'),
  ogTitle: () => t('docs.seoTitle'),
  ogDescription: () => t('docs.seoDescription')
})
</script>

<template>
  <section class="space-y-8 py-6 lg:py-10">
    <div class="space-y-3">
      <Badge variant="secondary" class="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.25em]">{{ t('docs.badge') }}</Badge>
      <h1 class="text-4xl font-semibold tracking-tight">{{ t('docs.title') }}</h1>
      <p class="max-w-2xl text-lg leading-8 text-muted-foreground">
        {{ t('docs.description') }}
      </p>
    </div>

    <div class="space-y-8">
      <section v-for="section in sections" :id="section.name" :key="section.name" class="space-y-4 scroll-mt-28">
        <div class="space-y-2">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="space-y-1">
              <p class="text-sm font-medium uppercase tracking-[0.2em] text-primary/70">{{ t('docs.sectionLabel') }}</p>
              <h2 class="text-2xl font-semibold tracking-tight">{{ section.name }}</h2>
            </div>
            <Button as-child variant="outline" size="sm" class="rounded-full">
              <NuxtLink :to="section.to">{{ t('docs.copySectionLink') }}</NuxtLink>
            </Button>
          </div>
          <p class="text-sm text-muted-foreground">{{ t('docs.sectionDescription', { count: section.entries.length }) }}</p>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <Card v-for="entry in section.entries" :key="entry.path" class="border-border/70 bg-card/80">
            <CardHeader>
              <CardTitle>{{ entry.title }}</CardTitle>
              <CardDescription>{{ entry.description }}</CardDescription>
            </CardHeader>
            <CardFooter class="justify-between">
              <Badge variant="outline">{{ entry.locale.toUpperCase() }}</Badge>
              <Button as-child variant="ghost">
                <NuxtLink :to="entry.path">{{ t('docs.read') }}</NuxtLink>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  </section>
</template>
