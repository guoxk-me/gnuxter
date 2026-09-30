<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'Gnuxter',
  description: () => t('home.description'),
})

useSchemaOrg([
  defineWebPage({
    name: 'Gnuxter',
    description: () => t('home.description'),
  }),
])
</script>

<template>
  <div class="starter-page">
    <!-- AI modified: the route is now a composition surface for the Pen prototype sections. -->
    <div class="starter-page__content">
      <StarterHero />
      <StarterFeatureList />
      <TechnologyStack />
    </div>
  </div>
</template>

<style scoped>
.starter-page {
  display: flex;
  flex: 1;
  justify-content: center;
}

.starter-page__content {
  display: flex;
  width: min(672px, calc(100% - 48px));
  flex-direction: column;
  gap: 50px;
  padding-block: 92px 56px;
}

@media (min-width: 640px) and (max-width: 1023px) {
  .starter-page__content {
    padding-block: 72px 48px;
  }
}

@media (max-width: 639px) {
  .starter-page__content {
    width: 100%;
    gap: 28px;
    padding: 36px 20px 20px;
  }
}
</style>
