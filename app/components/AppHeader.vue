<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const appStore = useAppStore()

const navLinks = computed(() => [
  { to: localePath('/'), label: t('nav.home') },
  { to: localePath('/about'), label: t('nav.about') },
])
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-sm">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
      <!-- Logo -->
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2 font-bold text-lg tracking-tight">
        <Icon name="lucide:layers" class="size-6 text-primary-600" />
        <span>Gnuxter</span>
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden items-center gap-1 sm:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="rounded-md px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400
                 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
          active-class="text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

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

        <!-- Mobile menu toggle -->
        <button
          class="rounded-md p-2 text-gray-600 dark:text-gray-400
                 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 sm:hidden"
          aria-label="Toggle menu"
          @click="appStore.toggleMobileMenu()"
        >
          <Icon :name="appStore.isMobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="size-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Nav -->
    <div v-if="appStore.isMobileMenuOpen" class="border-t border-[var(--color-border)] px-4 py-3 sm:hidden">
      <nav class="flex flex-col gap-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300
                 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          active-class="text-primary-600 bg-primary-50 dark:bg-primary-950"
          @click="appStore.closeMobileMenu()"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
