<script setup lang="ts">
const { locale, t } = useI18n()

const { data: entries } = await useAsyncData(() => `changelog-${locale.value}`, () => {
  return queryCollection('changelog').where('locale', '=', locale.value).where('draft', '=', false).order('publishedAt', 'DESC').all()
})

useSeoMeta({
  title: () => t('changelog.seoTitle'),
  description: () => t('changelog.seoDescription'),
  ogTitle: () => t('changelog.seoTitle'),
  ogDescription: () => t('changelog.seoDescription')
})
</script>

<template>
  <section class="space-y-8 py-6 lg:py-10">
    <div class="space-y-3">
      <Badge variant="secondary" class="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.25em]">{{ t('changelog.badge') }}</Badge>
      <h1 class="text-4xl font-semibold tracking-tight">{{ t('changelog.title') }}</h1>
      <p class="max-w-2xl text-lg leading-8 text-muted-foreground">
        {{ t('changelog.description') }}
      </p>
    </div>

    <div class="space-y-4">
      <Card v-for="entry in entries" :key="entry.path" class="border-border/70 bg-card/80">
        <CardHeader class="gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div class="space-y-2">
            <div class="flex items-center gap-3">
              <Badge>{{ entry.version }}</Badge>
              <span class="text-sm text-muted-foreground">{{ entry.publishedAt }}</span>
            </div>
            <CardTitle class="text-2xl">{{ entry.title }}</CardTitle>
            <CardDescription>{{ entry.description }}</CardDescription>
          </div>
          <Button as-child variant="ghost">
            <NuxtLink :to="entry.path">{{ t('changelog.read') }}</NuxtLink>
          </Button>
        </CardHeader>
      </Card>
    </div>
  </section>
</template>
