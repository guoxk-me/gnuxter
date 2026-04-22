<script setup lang="ts">
interface NavItem {
  title?: string
  path?: string
  children?: NavItem[]
}

defineProps<{
  items: NavItem[]
  currentPath: string
  depth?: number
}>()
</script>

<template>
  <ul class="space-y-1" :class="depth ? 'border-l border-border/60 pl-3' : ''">
    <li v-for="item in items" :key="item.path || item.title" class="space-y-1">
      <NuxtLink
        v-if="item.path"
        :to="item.path"
        class="block rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
        :class="currentPath === item.path ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground' : ''"
      >
        {{ item.title }}
      </NuxtLink>
      <p v-else class="px-3 py-2 text-sm font-medium text-foreground">
        {{ item.title }}
      </p>

      <DocsSidebarTree
        v-if="item.children?.length"
        :items="item.children"
        :current-path="currentPath"
        :depth="(depth || 0) + 1"
      />
    </li>
  </ul>
</template>
