<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()

const { data: page } = await useAsyncData(route.path, () => queryCollection('changelog').path(route.path).first())

if (!page.value)
  throw createError({ statusCode: 404, statusMessage: t('changelog.notFound') })

useSeoMeta({
  title: () => page.value?.title || t('changelog.seoTitle'),
  description: () => page.value?.description || t('changelog.seoDescription'),
  ogTitle: () => page.value?.title || t('changelog.seoTitle'),
  ogDescription: () => page.value?.description || t('changelog.seoDescription')
})
</script>

<template>
  <section class="space-y-6 py-6 lg:py-10">
    <div class="space-y-3">
      <div class="flex flex-wrap items-center gap-3">
        <Badge>{{ page?.version }}</Badge>
        <span class="text-sm text-muted-foreground">{{ page?.publishedAt }}</span>
      </div>
      <h1 class="text-4xl font-semibold tracking-tight">{{ page?.title }}</h1>
      <p class="max-w-3xl text-lg leading-8 text-muted-foreground">{{ page?.description }}</p>
    </div>

    <Card class="border-border/70 bg-card/80 shadow-sm">
      <CardContent class="px-6 py-8 sm:px-8">
        <ContentRenderer v-if="page" :value="page" class="content-prose" />
      </CardContent>
    </Card>
  </section>
</template>
