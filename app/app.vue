<script setup lang="ts">
const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const i18nHead = useLocaleHead({
  addSeoAttributes: true,
  identifierAttribute: 'id'
})

const canonicalHref = computed(() => {
  return new URL(route.path || '/', runtimeConfig.public.siteUrl).toString()
})

useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  link: [
    ...i18nHead.value.link,
    {
      rel: 'canonical',
      href: canonicalHref.value
    }
  ],
  meta: i18nHead.value.meta
}))
</script>

<template>
  <div class="min-h-screen">
    <NuxtRouteAnnouncer />
    <main class="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <AppHeader />
      <NuxtPage />
      <AppFooter />
    </main>
  </div>
</template>
