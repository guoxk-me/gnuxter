<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() =>
  locales.value.filter(l => l.code !== locale.value)
)
</script>

<template>
  <div class="flex items-center gap-1">
    <button
      v-for="loc in availableLocales"
      :key="loc.code"
      class="rounded-md p-1.5 text-muted-foreground hover:text-foreground transition-colors"
      @click="setLocale(loc.code)"
    >
      <Icon name="lucide:languages" class="size-4" />
    </button>
  </div>
</template>
