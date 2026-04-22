<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()
const { locale, t } = useI18n()

const decodedTag = computed(() => {
  const value = Array.isArray(route.params.tag) ? route.params.tag[0] : route.params.tag
  return typeof value === 'string' ? decodeURIComponent(value) : ''
})

const { data: posts } = await useAsyncData(() => `blog-tag-${locale.value}-${decodedTag.value}`, () => {
  return queryCollection('blog')
    .where('locale', '=', locale.value)
    .where('draft', '=', false)
    .order('publishedAt', 'DESC')
    .all()
})

const { data: authors } = await useAsyncData('authors', () => queryCollection('authors').all())

const authorMap = computed(() => new Map((authors.value || []).map(author => [author.slug, author])))

const taggedPosts = computed(() => {
  const currentTag = decodedTag.value.trim().toLowerCase()

  return (posts.value || []).filter(post => (post.tags || []).some(tag => tag.toLowerCase() === currentTag))
})

const relatedTags = computed(() => {
  const tags = new Set<string>()

  for (const post of taggedPosts.value) {
    for (const tag of post.tags || []) {
      if (tag.toLowerCase() !== decodedTag.value.trim().toLowerCase())
        tags.add(tag)
    }
  }

  return Array.from(tags).sort((a, b) => a.localeCompare(b))
})

useSeoMeta({
  title: () => `${t('blog.tagTitle')} #${decodedTag.value}`,
  description: () => t('blog.tagDescription', { tag: decodedTag.value }),
  ogTitle: () => `${t('blog.tagTitle')} #${decodedTag.value}`,
  ogDescription: () => t('blog.tagDescription', { tag: decodedTag.value })
})
</script>

<template>
  <section class="space-y-8 py-6 lg:py-10">
    <div class="space-y-3">
      <Badge variant="secondary" class="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.25em]">
        {{ t('blog.tagBadge') }}
      </Badge>
      <h1 class="text-4xl font-semibold tracking-tight">#{{ decodedTag }}</h1>
      <p class="max-w-2xl text-lg leading-8 text-muted-foreground">
        {{ t('blog.tagDescription', { tag: decodedTag }) }}
      </p>
    </div>

    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div class="space-y-4">
        <BlogCard
          v-for="post in taggedPosts"
          :key="post.path"
          :post="post"
          :read-label="t('blog.read')"
          :author="authorMap.get(post.author || '')"
          :author-href="post.author ? localePath(`/blog/authors/${post.author}`) : null"
        />

        <Card v-if="!taggedPosts.length" class="border-dashed border-border/70 bg-card/60">
          <CardContent class="px-6 py-8 text-center text-muted-foreground">
            {{ t('blog.tagEmpty') }}
          </CardContent>
        </Card>
      </div>

      <div class="space-y-4">
        <Card class="border-border/70 bg-card/80">
          <CardHeader>
            <CardTitle class="text-lg">{{ t('blog.relatedTags') }}</CardTitle>
            <CardDescription>{{ t('blog.relatedTagsDescription') }}</CardDescription>
          </CardHeader>
          <CardContent>
            <BlogTagList :tags="relatedTags" />
          </CardContent>
        </Card>

        <Button as-child variant="outline" class="w-full rounded-full">
          <NuxtLink :to="localePath('/blog')">
            {{ t('blog.backToBlog') }}
          </NuxtLink>
        </Button>
      </div>
    </div>
  </section>
</template>
