<script setup lang="ts">
const localePath = useLocalePath()
const appStore = useAppStore()
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-sm">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
      <!-- Logo -->
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2 font-bold text-lg tracking-tight">
        <Icon name="lucide:layers" class="size-6 text-primary-600" />
        <span>Gnuxter</span>
      </NuxtLink>

      <!-- Right actions -->
      <div class="flex items-center gap-2">
        <LangSwitcher />

        <!-- Theme toggle -->
        <button
          class="rounded-md p-2 text-gray-600 dark:text-gray-400
                 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
          :aria-label="appStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="appStore.toggleTheme()"
        >
          <Icon :name="appStore.isDark ? 'lucide:sun' : 'lucide:moon'" class="size-5" />
        </button>
      </div>
    </div>
  </header>
</template>
