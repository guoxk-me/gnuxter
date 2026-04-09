<script setup lang="ts">
const localePath = useLocalePath()
const { locale, t } = useI18n()

const { data: posts } = await useAsyncData(() => `blog-tags-${locale.value}`, () => {
  return queryCollection('blog')
    .where('locale', '=', locale.value)
    .where('draft', '=', false)
    .order('publishedAt', 'DESC')
    .all()
})

const tags = computed(() => {
  const counts = new Map<string, number>()

  for (const post of posts.value || []) {
    for (const tag of post.tags || [])
      counts.set(tag, (counts.get(tag) || 0) + 1)
  }

  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count, to: localePath(`/blog/tags/${encodeURIComponent(tag)}`) }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
})

useSeoMeta({
  title: () => t('blog.tagsIndexTitle'),
  description: () => t('blog.tagsIndexDescription'),
  ogTitle: () => t('blog.tagsIndexTitle'),
  ogDescription: () => t('blog.tagsIndexDescription')
})
</script>

<template>
  <section class="space-y-8 py-6 lg:py-10">
    <div class="space-y-3">
      <Badge variant="secondary" class="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.25em]">
        {{ t('blog.tagBadge') }}
      </Badge>
      <h1 class="text-4xl font-semibold tracking-tight">{{ t('blog.tagsIndexTitle') }}</h1>
      <p class="max-w-2xl text-lg leading-8 text-muted-foreground">
        {{ t('blog.tagsIndexDescription') }}
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <Card v-for="item in tags" :key="item.tag" class="border-border/70 bg-card/80">
        <CardHeader class="space-y-3">
          <div class="flex items-center justify-between gap-3">
            <CardTitle class="text-xl">#{{ item.tag }}</CardTitle>
            <Badge variant="outline">{{ item.count }}</Badge>
          </div>
          <CardDescription>{{ t('blog.tagDescription', { tag: item.tag }) }}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button as-child variant="ghost" class="px-0">
            <NuxtLink :to="item.to">{{ t('blog.openTag') }}</NuxtLink>
          </Button>
        </CardFooter>
      </Card>

      <Card v-if="!tags.length" class="border-dashed border-border/70 bg-card/60 md:col-span-2 xl:col-span-3">
        <CardContent class="px-6 py-8 text-center text-muted-foreground">
          {{ t('blog.tagsIndexEmpty') }}
        </CardContent>
      </Card>
    </div>
  </section>
</template>
