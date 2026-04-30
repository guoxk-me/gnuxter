<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-auto border-t border-border py-6">
    <div class="mx-auto max-w-2xl px-6 flex items-center justify-between">
      <span class="text-xs text-muted-foreground">
        Gnuxter · {{ year }}
      </span>
      <div class="flex items-center gap-4 text-xs text-muted-foreground">
        <a href="https://nuxt.com" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors">
          Nuxt 4
        </a>
        <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors">
          Tailwind CSS
        </a>
      </div>
    </div>
  </footer>
</template>
