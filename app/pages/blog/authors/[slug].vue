<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()
const { locale, t } = useI18n()

const authorSlug = computed(() => {
  const value = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
  return typeof value === 'string' ? value : ''
})

const { data: authors } = await useAsyncData('authors', () => queryCollection('authors').all())
const { data: posts } = await useAsyncData(() => `blog-author-${locale.value}-${authorSlug.value}`, () => {
  return queryCollection('blog')
    .where('locale', '=', locale.value)
    .where('draft', '=', false)
    .where('author', '=', authorSlug.value)
    .order('publishedAt', 'DESC')
    .all()
})

const author = computed(() => (authors.value || []).find(item => item.slug === authorSlug.value))

if (!author.value)
  throw createError({ statusCode: 404, statusMessage: t('blog.authorNotFound') })

const authorTags = computed(() => {
  return Array.from(new Set((posts.value || []).flatMap(post => post.tags || []))).sort((a, b) => a.localeCompare(b))
})

useSeoMeta({
  title: () => `${author.value?.name || t('blog.authorTitle')} · ${t('blog.title')}`,
  description: () => author.value?.bio || t('blog.authorDescription'),
  ogTitle: () => `${author.value?.name || t('blog.authorTitle')} · ${t('blog.title')}`,
  ogDescription: () => author.value?.bio || t('blog.authorDescription')
})
</script>

<template>
  <section class="space-y-8 py-6 lg:py-10">
    <BlogAuthorCard
      v-if="author"
      :author="author"
      :heading="t('blog.authorBadge')"
    />

    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div class="space-y-4">
        <Card class="border-border/70 bg-card/80">
          <CardHeader>
            <CardTitle class="text-2xl">{{ t('blog.authorPosts') }}</CardTitle>
            <CardDescription>{{ t('blog.authorPostsDescription') }}</CardDescription>
          </CardHeader>
        </Card>

        <BlogCard
          v-for="post in posts"
          :key="post.path"
          :post="post"
          :read-label="t('blog.read')"
          :author="author"
        />

        <Card v-if="!posts?.length" class="border-dashed border-border/70 bg-card/60">
          <CardContent class="px-6 py-8 text-center text-muted-foreground">
            {{ t('blog.authorEmpty') }}
          </CardContent>
        </Card>
      </div>

      <div class="space-y-4">
        <Card class="border-border/70 bg-card/80">
          <CardHeader>
            <CardTitle class="text-lg">{{ t('blog.authorTopics') }}</CardTitle>
            <CardDescription>{{ t('blog.authorTopicsDescription') }}</CardDescription>
          </CardHeader>
          <CardContent>
            <BlogTagList :tags="authorTags" />
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
