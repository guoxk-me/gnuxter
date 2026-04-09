<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()
const { t } = useI18n()

const { data: page } = await useAsyncData(route.path, () => queryCollection('blog').path(route.path).first())
const { data: authors } = await useAsyncData('authors', () => queryCollection('authors').all())

const author = computed(() => (authors.value || []).find(item => item.slug === page.value?.author))

if (!page.value)
  throw createError({ statusCode: 404, statusMessage: t('blog.notFound') })

useSeoMeta({
  title: () => page.value?.title || t('blog.seoTitle'),
  description: () => page.value?.description || t('blog.seoDescription'),
  ogTitle: () => page.value?.title || t('blog.seoTitle'),
  ogDescription: () => page.value?.description || t('blog.seoDescription'),
  articlePublishedTime: () => page.value?.publishedAt,
  articleModifiedTime: () => page.value?.updatedAt || page.value?.publishedAt
})
</script>

<template>
  <section class="space-y-6 py-6 lg:py-10">
    <div class="space-y-3">
      <Badge variant="secondary" class="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.25em]">{{ t('blog.articleBadge') }}</Badge>
      <h1 class="text-4xl font-semibold tracking-tight">{{ page?.title }}</h1>
      <div class="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span>{{ page?.publishedAt }}</span>
        <span>•</span>
        <span>{{ page?.readingTime }}</span>
      </div>
      <p class="max-w-3xl text-lg leading-8 text-muted-foreground">{{ page?.description }}</p>
      <BlogTagList :tags="page?.tags" />
    </div>

    <Card class="border-border/70 bg-card/80 shadow-sm">
      <CardContent class="px-6 py-8 sm:px-8">
        <ContentRenderer v-if="page" :value="page" class="content-prose" />
      </CardContent>
    </Card>

    <BlogAuthorCard
      v-if="author"
      :author="author"
      :heading="t('blog.authorHeading')"
      :to="localePath(`/blog/authors/${author.slug}`)"
      :cta-label="t('blog.authorCta')"
    />
  </section>
</template>
