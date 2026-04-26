<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-auto border-t border-[var(--color-border)] py-8">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <!-- Brand -->
        <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Icon name="lucide:layers" class="size-4 text-primary-600" />
          <span>Gnuxter</span>
          <span>·</span>
          <span>{{ year }} · {{ t('footer.rights') }}</span>
        </div>

        <!-- Links -->
        <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <a
            href="https://nuxt.com"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1 hover:text-primary-600 transition-colors"
          >
            <Icon name="lucide:external-link" class="size-3.5" />
            Nuxt 4
          </a>
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1 hover:text-primary-600 transition-colors"
          >
            <Icon name="lucide:external-link" class="size-3.5" />
            Tailwind CSS
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
