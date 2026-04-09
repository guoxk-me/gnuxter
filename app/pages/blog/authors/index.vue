<script setup lang="ts">
const localePath = useLocalePath()
const { locale, t } = useI18n()

const { data: authors } = await useAsyncData('authors', () => queryCollection('authors').all())
const { data: posts } = await useAsyncData(() => `blog-authors-${locale.value}`, () => {
  return queryCollection('blog')
    .where('locale', '=', locale.value)
    .where('draft', '=', false)
    .order('publishedAt', 'DESC')
    .all()
})

const authorEntries = computed(() => {
  const counts = new Map<string, number>()

  for (const post of posts.value || []) {
    if (post.author)
      counts.set(post.author, (counts.get(post.author) || 0) + 1)
  }

  return (authors.value || [])
    .filter(author => counts.has(author.slug))
    .map(author => ({
      ...author,
      count: counts.get(author.slug) || 0,
      to: localePath(`/blog/authors/${author.slug}`)
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
})

useSeoMeta({
  title: () => t('blog.authorsIndexTitle'),
  description: () => t('blog.authorsIndexDescription'),
  ogTitle: () => t('blog.authorsIndexTitle'),
  ogDescription: () => t('blog.authorsIndexDescription')
})
</script>

<template>
  <section class="space-y-8 py-6 lg:py-10">
    <div class="space-y-3">
      <Badge variant="secondary" class="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.25em]">
        {{ t('blog.authorBadge') }}
      </Badge>
      <h1 class="text-4xl font-semibold tracking-tight">{{ t('blog.authorsIndexTitle') }}</h1>
      <p class="max-w-2xl text-lg leading-8 text-muted-foreground">
        {{ t('blog.authorsIndexDescription') }}
      </p>
    </div>

    <div class="grid gap-4 lg:grid-cols-2">
      <Card v-for="author in authorEntries" :key="author.slug" class="border-border/70 bg-card/80">
        <CardHeader class="gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div class="flex items-start gap-4">
            <Avatar class="size-14 border border-border/70">
              <AvatarImage :src="author.avatar" :alt="author.name" class="object-cover" />
              <AvatarFallback>{{ author.name.slice(0, 2).toUpperCase() }}</AvatarFallback>
            </Avatar>
            <div class="space-y-2">
              <CardTitle class="text-xl">{{ author.name }}</CardTitle>
              <p class="text-sm font-medium text-primary/80">{{ author.title }}</p>
              <CardDescription>{{ author.bio }}</CardDescription>
            </div>
          </div>
          <Badge variant="outline">{{ author.count }}</Badge>
        </CardHeader>
        <CardFooter>
          <Button as-child variant="ghost" class="px-0">
            <NuxtLink :to="author.to">{{ t('blog.openAuthor') }}</NuxtLink>
          </Button>
        </CardFooter>
      </Card>

      <Card v-if="!authorEntries.length" class="border-dashed border-border/70 bg-card/60 lg:col-span-2">
        <CardContent class="px-6 py-8 text-center text-muted-foreground">
          {{ t('blog.authorsIndexEmpty') }}
        </CardContent>
      </Card>
    </div>
  </section>
</template>
