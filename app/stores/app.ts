import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  // ─── Theme ──────────────────────────────────────────────────────────────────
  const isDark = ref(false)

  function toggleTheme() {
    isDark.value = !isDark.value
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', isDark.value)
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    }
  }

  function initTheme() {
    if (import.meta.client) {
      const saved = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = saved ? saved === 'dark' : prefersDark
      document.documentElement.classList.toggle('dark', isDark.value)
    }
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
    initTheme,
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  }
})
