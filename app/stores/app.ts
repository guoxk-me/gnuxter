import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  // ─── Theme ──────────────────────────────────────────────────────────────────
  // AI modified: delegate SSR-safe theme persistence and system preference to Nuxt Color Mode.
  const colorMode = useColorMode()
  const isDark = computed(() => colorMode.value === 'dark')

  function toggleTheme() {
    colorMode.preference = isDark.value ? 'light' : 'dark'
  }

  // ─── Nav ────────────────────────────────────────────────────────────────────
  const isMobileMenuOpen = ref(false)

  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  function closeMobileMenu() {
    isMobileMenuOpen.value = false
  }

  return {
    isDark,
    toggleTheme,
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  }
})
