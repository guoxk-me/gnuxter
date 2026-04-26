<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()

const availableLocales = computed(() =>
  locales.value.filter(l => l.code !== locale.value)
)
</script>

<template>
  <div class="flex items-center gap-1">
    <button
      v-for="loc in availableLocales"
      :key="loc.code"
      class="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium
             text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800
             transition-colors duration-150"
      :aria-label="t('lang.switch')"
      @click="setLocale(loc.code)"
    >
      <Icon name="lucide:languages" class="size-4" />
      <span>{{ loc.name }}</span>
    </button>
  </div>
</template>
