<script setup lang="ts">
const props = defineProps<{
  tags?: string[]
  activeTag?: string
  useSearchLinks?: boolean
}>()

const localePath = useLocalePath()

function normalizeTag(tag: string) {
  return tag.trim().toLowerCase()
}

const tagLinks = computed(() => (props.tags || []).map(tag => ({
  tag,
  to: props.useSearchLinks
    ? { path: localePath('/search'), query: { q: tag } }
    : localePath(`/blog/tags/${encodeURIComponent(tag)}`),
  isActive: normalizeTag(tag) === normalizeTag(props.activeTag || '')
})))
</script>

<template>
  <div v-if="tagLinks.length" class="flex flex-wrap gap-2">
    <Button
      v-for="item in tagLinks"
      :key="item.tag"
      as-child
      variant="outline"
      size="sm"
      class="rounded-full"
      :class="item.isActive ? 'border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground' : ''"
    >
      <NuxtLink :to="item.to">
        #{{ item.tag }}
      </NuxtLink>
    </Button>
  </div>
</template>
