<script setup lang="ts">
import { computed } from 'vue'
import { Monitor, MoonStar, SunMedium } from 'lucide-vue-next'

const colorMode = useColorMode()
const { t } = useI18n()

const modes = computed(() => [
  { label: t('theme.light'), value: 'light', icon: SunMedium },
  { label: t('theme.dark'), value: 'dark', icon: MoonStar },
  { label: t('theme.system'), value: 'system', icon: Monitor }
] as const)

const currentMode = computed(() => modes.value.find(mode => mode.value === colorMode.preference) ?? modes.value[2])
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="sm" class="gap-2 rounded-full px-3">
        <component :is="currentMode.icon" class="size-4" />
        <span class="text-xs font-medium">{{ currentMode.label }}</span>
      </Button>
    </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-36">
        <DropdownMenuItem
        v-for="mode in modes"
          :key="mode.value"
          class="gap-2"
          @click="colorMode.preference = mode.value"
        >
        <component :is="mode.icon" class="size-4" />
        <span>{{ mode.label }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
