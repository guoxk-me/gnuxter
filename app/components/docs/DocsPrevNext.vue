<script setup lang="ts">
interface SurroundingLink {
  title?: string
  path?: string
  description?: string
}

defineProps<{
  prev?: SurroundingLink | null
  next?: SurroundingLink | null
  prevLabel: string
  nextLabel: string
}>()
</script>

<template>
  <div class="grid gap-4 pt-6 md:grid-cols-2">
    <Card v-if="prev" class="border-border/70 bg-card/80">
      <CardHeader>
        <CardDescription>{{ prevLabel }}</CardDescription>
        <CardTitle class="text-xl">
          <NuxtLink :to="prev.path" class="transition hover:text-primary">
            {{ prev.title }}
          </NuxtLink>
        </CardTitle>
      </CardHeader>
    </Card>

    <Card v-if="next" class="border-border/70 bg-card/80" :class="!prev ? 'md:col-start-2' : ''">
      <CardHeader>
        <CardDescription>{{ nextLabel }}</CardDescription>
        <CardTitle class="text-xl">
          <NuxtLink :to="next.path" class="transition hover:text-primary">
            {{ next.title }}
          </NuxtLink>
        </CardTitle>
      </CardHeader>
    </Card>
  </div>
</template>
