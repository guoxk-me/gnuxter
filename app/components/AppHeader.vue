<script setup lang="ts">
const localePath = useLocalePath()
const appStore = useAppStore()
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xs">
    <div class="mx-auto flex h-12 max-w-2xl items-center justify-between px-6">
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2 text-sm font-medium text-foreground">
        <Icon name="lucide:layers" class="size-4 text-muted-foreground" />
        Gnuxter
      </NuxtLink>

      <div class="flex items-center gap-1">
        <LangSwitcher />
        <button
          class="rounded-md p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          :aria-label="appStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="appStore.toggleTheme()"
        >
          <Icon :name="appStore.isDark ? 'lucide:sun' : 'lucide:moon'" class="size-4" />
        </button>
      </div>
    </div>
  </header>
</template>
