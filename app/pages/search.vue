<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()
const { locale, t } = useI18n()

const query = ref(typeof route.query.q === 'string' ? route.query.q : '')

const { data: entries } = await useAsyncData(() => `search-${locale.value}`, async () => {
  const [docs, blog, changelog] = await Promise.all([
    queryCollection('docs').where('locale', '=', locale.value).where('draft', '=', false).all(),
    queryCollection('blog').where('locale', '=', locale.value).where('draft', '=', false).all(),
    queryCollection('changelog').where('locale', '=', locale.value).where('draft', '=', false).all()
  ])

  return [
    ...docs.map(item => ({ ...item, kind: 'docs' })),
    ...blog.map(item => ({ ...item, kind: 'blog' })),
    ...changelog.map(item => ({ ...item, kind: 'changelog' }))
  ]
})

const filteredEntries = computed(() => {
  const term = query.value.trim().toLowerCase()

  if (!term)
    return entries.value || []

  return (entries.value || []).filter((entry) => {
    return [
      entry.title,
      entry.description,
      entry.category,
      ...(entry.tags || [])
    ]
      .filter(Boolean)
      .some(value => String(value).toLowerCase().includes(term))
  })
})

function submitSearch() {
  navigateTo({
    path: localePath('/search'),
    query: query.value.trim() ? { q: query.value.trim() } : {}
  })
}

useSeoMeta({
  title: () => t('search.seoTitle'),
  description: () => t('search.seoDescription')
})
</script>

<template>
  <section class="space-y-8 py-6 lg:py-10">
    <div class="space-y-3">
      <Badge variant="secondary" class="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.25em]">
        {{ t('search.badge') }}
      </Badge>
      <h1 class="text-4xl font-semibold tracking-tight">{{ t('search.title') }}</h1>
      <p class="max-w-2xl text-lg leading-8 text-muted-foreground">
        {{ t('search.description') }}
      </p>
    </div>

    <Card class="border-border/70 bg-card/80">
      <CardContent class="px-6 py-6">
        <form class="flex flex-col gap-3 sm:flex-row" @submit.prevent="submitSearch">
          <Input v-model="query" :placeholder="t('search.placeholder')" class="h-11 rounded-full" />
          <Button type="submit" class="h-11 rounded-full px-6">
            {{ t('search.action') }}
          </Button>
        </form>
      </CardContent>
    </Card>

    <div class="grid gap-4">
      <Card v-for="entry in filteredEntries" :key="entry.path" class="border-border/70 bg-card/80">
        <CardHeader class="gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div class="space-y-2">
            <div class="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{{ entry.kind }}</Badge>
              <Badge v-if="entry.category" variant="secondary">{{ entry.category }}</Badge>
            </div>
            <CardTitle class="text-2xl leading-tight">
              <NuxtLink :to="entry.path" class="transition hover:text-primary">
                {{ entry.title }}
              </NuxtLink>
            </CardTitle>
            <CardDescription>{{ entry.description }}</CardDescription>
          </div>
          <p class="text-sm text-muted-foreground">{{ entry.publishedAt || entry.updatedAt }}</p>
        </CardHeader>
        <CardContent class="space-y-4">
          <BlogTagList :tags="entry.tags" use-search-links />
        </CardContent>
      </Card>

      <Card v-if="!filteredEntries.length" class="border-dashed border-border/70 bg-card/60">
        <CardContent class="px-6 py-8 text-center text-muted-foreground">
          {{ t('search.empty') }}
        </CardContent>
      </Card>
    </div>
  </section>
</template>
