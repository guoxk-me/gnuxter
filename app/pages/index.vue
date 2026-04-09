<script setup lang="ts">
const { locale, t } = useI18n()
const localePath = useLocalePath()

const { data } = await useAsyncData(() => `home-${locale.value}`, async () => {
  const [docs, blog, changelog] = await Promise.all([
    queryCollection('docs').where('locale', '=', locale.value).where('draft', '=', false).order('order', 'ASC').limit(2).all(),
    queryCollection('blog').where('locale', '=', locale.value).where('draft', '=', false).order('publishedAt', 'DESC').limit(2).all(),
    queryCollection('changelog').where('locale', '=', locale.value).where('draft', '=', false).order('publishedAt', 'DESC').limit(1).all()
  ])

  return { docs, blog, changelog }
})

useSeoMeta({
  title: () => t('home.seoTitle'),
  description: () => t('home.seoDescription'),
  ogTitle: () => t('home.seoTitle'),
  ogDescription: () => t('home.seoDescription'),
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <section class="grid flex-1 items-start gap-10 py-6 lg:grid-cols-[1.2fr_0.8fr] lg:py-10">
    <div class="space-y-8">
      <div class="space-y-4">
        <Badge variant="secondary" class="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.25em]">
          {{ t('home.badge') }}
        </Badge>
        <h1 class="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          {{ t('home.title') }}
        </h1>
        <p class="max-w-2xl text-lg leading-8 text-muted-foreground">
          {{ t('home.description') }}
        </p>
      </div>

      <div class="flex flex-wrap gap-3">
        <Button as-child class="rounded-full px-5">
          <NuxtLink :to="localePath('/docs')">{{ t('home.docsCta') }}</NuxtLink>
        </Button>
        <Button as-child variant="outline" class="rounded-full px-5">
          <NuxtLink :to="localePath('/blog')">{{ t('home.blogCta') }}</NuxtLink>
        </Button>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <Card v-for="entry in data?.docs" :key="entry.path" class="border-border/70 bg-card/80">
          <CardHeader>
            <CardTitle class="text-lg">{{ entry.title }}</CardTitle>
            <CardDescription>{{ entry.description }}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button as-child variant="ghost" class="px-0">
              <NuxtLink :to="entry.path">{{ t('home.openDoc') }}</NuxtLink>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>

    <div class="space-y-4">
      <HeroCard />

      <Card class="border-border/70 bg-card/80">
        <CardHeader>
          <CardTitle>{{ t('home.latestBlog') }}</CardTitle>
          <CardDescription>{{ t('home.latestBlogDescription') }}</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div v-for="entry in data?.blog" :key="entry.path" class="rounded-2xl border border-border/70 p-4">
            <p class="text-sm font-medium">{{ entry.title }}</p>
            <p class="mt-2 text-sm leading-6 text-muted-foreground">{{ entry.description }}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
