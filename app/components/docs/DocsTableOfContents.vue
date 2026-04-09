<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  children?: TocLink[]
}

defineProps<{
  links: TocLink[]
}>()
</script>

<template>
  <ul class="space-y-2">
    <li v-for="link in links" :key="link.id" class="space-y-2">
      <a
        :href="`#${link.id}`"
        class="block text-sm text-muted-foreground transition hover:text-foreground"
      >
        {{ link.text }}
      </a>

      <DocsTableOfContents v-if="link.children?.length" :links="link.children" />
    </li>
  </ul>
</template>
