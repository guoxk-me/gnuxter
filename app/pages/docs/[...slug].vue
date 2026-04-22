<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()
const { t } = useI18n()

const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path).first())

const localePrefix = computed(() => route.path.startsWith('/zh/') ? '/zh/docs' : '/docs')

const { data: navigation } = await useAsyncData(() => `docs-navigation-${localePrefix.value}`, () => {
  return queryCollectionNavigation('docs')
    .where('draft', '=', false)
    .where('path', 'LIKE', `${localePrefix.value}%`)
    .order('stem', 'ASC')
})

const { data: surroundings } = await useAsyncData(() => `docs-surround-${route.path}`, () => {
  return queryCollectionItemSurroundings('docs', route.path, {
    fields: ['title', 'description']
  })
    .where('draft', '=', false)
    .where('path', 'LIKE', `${localePrefix.value}%`)
    .order('order', 'ASC')
})

if (!page.value)
  throw createError({ statusCode: 404, statusMessage: t('docs.notFound') })

useSeoMeta({
  title: () => page.value?.title || t('docs.seoTitle'),
  description: () => page.value?.description || t('docs.seoDescription'),
  ogTitle: () => page.value?.title || t('docs.seoTitle'),
  ogDescription: () => page.value?.description || t('docs.seoDescription')
})

const tocLinks = computed(() => page.value?.body?.toc?.links || [])
const previousLink = computed(() => surroundings.value?.[0] || null)
const nextLink = computed(() => surroundings.value?.[1] || null)

const breadcrumbItems = computed(() => {
  const items = [{ label: t('docs.title'), to: localePath('/docs') }]

  if (page.value?.category)
    items.push({ label: page.value.category, to: `${localePath('/docs')}#${page.value.category}` })

  if (page.value?.title)
    items.push({ label: page.value.title })

  return items
})
</script>

<template>
  <section class="grid gap-8 py-6 lg:grid-cols-[250px_minmax(0,1fr)_220px] lg:py-10">
    <Card class="hidden h-fit border-border/70 bg-card/80 lg:block">
      <CardHeader>
        <CardTitle class="text-lg">{{ t('docs.sidebar') }}</CardTitle>
        <CardDescription>{{ t('docs.sidebarDescription') }}</CardDescription>
      </CardHeader>
      <CardContent>
        <DocsSidebarTree :items="navigation || []" :current-path="route.path" />
      </CardContent>
    </Card>

    <div class="space-y-6">
      <div class="space-y-3">
        <DocsBreadcrumb :items="breadcrumbItems" />
        <Badge variant="secondary" class="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.25em]">{{ t('docs.articleBadge') }}</Badge>
        <h1 class="text-4xl font-semibold tracking-tight">{{ page?.title }}</h1>
        <p class="max-w-3xl text-lg leading-8 text-muted-foreground">{{ page?.description }}</p>
      </div>

      <Card class="border-border/70 bg-card/80 shadow-sm">
        <CardContent class="px-6 py-8 sm:px-8">
          <ContentRenderer v-if="page" :value="page" class="content-prose" />
        </CardContent>
      </Card>

      <DocsPrevNext
        :prev="previousLink"
        :next="nextLink"
        :prev-label="t('docs.prev')"
        :next-label="t('docs.next')"
      />
    </div>

    <Card v-if="tocLinks.length" class="hidden h-fit border-border/70 bg-card/80 lg:block">
      <CardHeader>
        <CardTitle class="text-lg">{{ t('docs.toc') }}</CardTitle>
        <CardDescription>{{ t('docs.tocDescription') }}</CardDescription>
      </CardHeader>
      <CardContent>
        <DocsTableOfContents :links="tocLinks" />
      </CardContent>
    </Card>
  </section>
</template>
