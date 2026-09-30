<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const nextLocale = computed(() => locales.value.find(candidate => candidate.code !== locale.value))

// AI modified: the compact prototype control advances directly to the other configured locale.
function switchLocale() {
  if (nextLocale.value)
    setLocale(nextLocale.value.code)
}
</script>

<template>
  <button
    class="language-action"
    type="button"
    :aria-label="$t('lang.switch')"
    @click="switchLocale"
  >
    <Icon name="lucide:languages" class="language-action__icon" />
    <span class="language-action__label">{{ locale === 'zh' ? '中文' : 'EN' }}</span>
  </button>
</template>

<style scoped>
.language-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 0;
  color: var(--muted-foreground);
  font-size: 11px;
  font-weight: 500;
  line-height: 16px;
}

.language-action:hover {
  color: var(--foreground);
}

.language-action__icon {
  width: 14px;
  height: 14px;
}

@media (max-width: 639px) {
  .language-action {
    gap: 0;
  }

  .language-action__label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
}
</style>
