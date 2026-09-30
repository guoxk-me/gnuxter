<script setup lang="ts">
const route = useRoute()
const year = new Date().getFullYear()

// AI modified: match the login footer height without duplicating the shared shell.
const isLoginPage = computed(() => route.path.endsWith('/login') || route.path === '/login')
</script>

<template>
  <footer class="app-footer" :class="{ 'app-footer--login': isLoginPage }">
    <span>Gnuxter · {{ year }}</span>
    <nav class="app-footer__links" aria-label="Footer navigation">
      <a href="https://nuxt.com" target="_blank" rel="noopener noreferrer">Nuxt 4</a>
      <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer">Tailwind CSS</a>
      <a href="https://github.com/guoxk-me/gnuxter" target="_blank" rel="noopener noreferrer">GitHub</a>
    </nav>
  </footer>
</template>

<style scoped>
.app-footer {
  display: flex;
  height: 48px;
  flex: none;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--border);
  padding-inline: 28px;
  color: var(--muted-foreground);
  font-size: 10px;
  line-height: 12px;
}

.app-footer--login {
  height: 44px;
}

.app-footer__links {
  display: flex;
  align-items: center;
  gap: 18px;
}

.app-footer__links a:hover {
  color: var(--foreground);
}

@media (max-width: 639px) {
  .app-footer {
    padding-inline: 16px;
  }

  .app-footer__links a:not(:last-child) {
    display: none;
  }
}
</style>
