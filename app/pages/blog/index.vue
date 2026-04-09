<script setup lang="ts">
const localePath = useLocalePath()
const { locale, t } = useI18n()

const { data: posts } = await useAsyncData(() => `blog-${locale.value}`, () => {
  return queryCollection('blog').where('locale', '=', locale.value).where('draft', '=', false).order('publishedAt', 'DESC').all()
})

const { data: authors } = await useAsyncData('authors', () => queryCollection('authors').all())

const authorMap = computed(() => new Map((authors.value || []).map(author => [author.slug, author])))
const allTags = computed(() => Array.from(new Set((posts.value || []).flatMap(post => post.tags || []))))

useSeoMeta({
  title: () => t('blog.seoTitle'),
  description: () => t('blog.seoDescription'),
  ogTitle: () => t('blog.seoTitle'),
  ogDescription: () => t('blog.seoDescription')
})
</script>

<template>
  <section class="space-y-8 py-6 lg:py-10">
    <div class="space-y-3">
      <Badge variant="secondary" class="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.25em]">{{ t('blog.badge') }}</Badge>
      <h1 class="text-4xl font-semibold tracking-tight">{{ t('blog.title') }}</h1>
      <p class="max-w-2xl text-lg leading-8 text-muted-foreground">
        {{ t('blog.description') }}
      </p>
    </div>

    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div class="space-y-4">
        <BlogCard
          v-for="post in posts"
          :key="post.path"
          :post="post"
          :read-label="t('blog.read')"
          :author="authorMap.get(post.author || '')"
          :author-href="post.author ? localePath(`/blog/authors/${post.author}`) : null"
        />
      </div>

      <div class="space-y-4">
        <Card class="border-border/70 bg-card/80">
          <CardHeader>
            <CardTitle class="text-lg">{{ t('blog.tags') }}</CardTitle>
            <CardDescription>{{ t('blog.tagsDescription') }}</CardDescription>
          </CardHeader>
          <CardContent>
            <BlogTagList :tags="allTags" />
          </CardContent>
          <CardFooter>
            <Button as-child variant="ghost" class="px-0">
              <NuxtLink :to="localePath('/blog/tags')">{{ t('blog.openAllTags') }}</NuxtLink>
            </Button>
          </CardFooter>
        </Card>

        <BlogAuthorCard
          v-if="authors?.[0]"
          :author="authors[0]"
          :heading="t('blog.authorHeading')"
          :to="localePath(`/blog/authors/${authors[0].slug}`)"
          :cta-label="t('blog.authorCta')"
        />

        <Button as-child variant="outline" class="w-full rounded-full">
          <NuxtLink :to="localePath('/blog/authors')">
            {{ t('blog.openAllAuthors') }}
          </NuxtLink>
        </Button>
      </div>
    </div>
  </section>
</template>
