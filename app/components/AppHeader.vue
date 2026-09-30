<script setup lang="ts">
const localePath = useLocalePath()
const route = useRoute()
const appStore = useAppStore()

// AI modified: login screens use the slightly taller chrome defined by the Pen prototype.
const isLoginPage = computed(() => route.path.endsWith('/login') || route.path === '/login')
</script>

<template>
  <header class="app-header" :class="{ 'app-header--login': isLoginPage }">
    <NuxtLink :to="localePath('/')" class="app-brand" aria-label="Gnuxter home">
      <Icon name="lucide:layers" class="app-brand__mark" />
      <span>Gnuxter</span>
    </NuxtLink>

    <nav class="app-header__actions" aria-label="Utility navigation">
      <LangSwitcher />
      <button
        class="nav-action"
        type="button"
        :aria-label="appStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="appStore.toggleTheme()"
      >
        <Icon :name="appStore.isDark ? 'lucide:sun' : 'lucide:moon'" class="nav-action__icon" />
        <span class="nav-action__label">{{ $t('nav.theme') }}</span>
      </button>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  position: relative;
  z-index: 20;
  display: flex;
  height: 48px;
  flex: none;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
  background: color-mix(in srgb, var(--background) 94%, transparent);
  padding-inline: 28px;
  backdrop-filter: blur(12px);
}

.app-header--login {
  height: 52px;
}

.app-brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: var(--foreground);
  font-family: 'Playfair Display', 'Lora', serif;
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
  text-decoration: none;
}

.app-brand__mark {
  width: 12px;
  height: 12px;
  color: var(--primary);
}

.app-header__actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.nav-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 0;
  color: var(--muted-foreground);
  font-size: 11px;
  font-weight: 500;
  line-height: 16px;
}

.nav-action:hover {
  color: var(--foreground);
}

.nav-action__icon {
  width: 14px;
  height: 14px;
}

@media (max-width: 639px) {
  .app-header {
    padding-inline: 16px;
  }

  .app-header__actions {
    gap: 14px;
  }

  .nav-action {
    gap: 0;
  }

  .nav-action__label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
}
</style>
