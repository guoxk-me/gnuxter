<script setup lang="ts">
interface Author {
  name: string
  title: string
  bio: string
  avatar: string
  socials?: {
    github?: string
    x?: string
    website?: string
  }
}

defineProps<{
  author: Author
  heading: string
  to?: string
  ctaLabel?: string
}>()
</script>

<template>
  <Card class="border-border/70 bg-card/80">
    <CardHeader class="gap-4 sm:flex-row sm:items-start">
      <Avatar class="size-14 border border-border/70">
        <AvatarImage :src="author.avatar" :alt="author.name" class="object-cover" />
        <AvatarFallback>{{ author.name.slice(0, 2).toUpperCase() }}</AvatarFallback>
      </Avatar>
      <div class="space-y-2">
        <CardDescription>{{ heading }}</CardDescription>
        <CardTitle class="text-xl">{{ author.name }}</CardTitle>
        <p class="text-sm font-medium text-primary/80">{{ author.title }}</p>
      </div>
    </CardHeader>
    <CardContent class="space-y-4">
      <p class="text-sm leading-7 text-muted-foreground">
        {{ author.bio }}
      </p>

      <div v-if="author.socials" class="flex flex-wrap gap-2">
        <Button v-if="author.socials.github" as-child variant="outline" size="sm" class="rounded-full">
          <NuxtLink :to="author.socials.github" target="_blank">GitHub</NuxtLink>
        </Button>
        <Button v-if="author.socials.x" as-child variant="outline" size="sm" class="rounded-full">
          <NuxtLink :to="author.socials.x" target="_blank">X</NuxtLink>
        </Button>
        <Button v-if="author.socials.website" as-child variant="outline" size="sm" class="rounded-full">
          <NuxtLink :to="author.socials.website" target="_blank">Site</NuxtLink>
        </Button>
      </div>

      <Button v-if="to && ctaLabel" as-child variant="ghost" class="px-0">
        <NuxtLink :to="to">{{ ctaLabel }}</NuxtLink>
      </Button>
    </CardContent>
  </Card>
</template>
