<script setup lang="ts">
interface Post {
  path: string
  title: string
  description: string
  publishedAt?: string
  readingTime?: string
  tags?: string[]
  author?: string
}

interface Author {
  name: string
  avatar: string
}

defineProps<{
  post: Post
  readLabel: string
  author?: Author | null
  authorHref?: string | null
}>()
</script>

<template>
  <Card class="border-border/70 bg-card/80">
    <CardHeader class="gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="space-y-3">
        <div class="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>{{ post.publishedAt }}</span>
          <span v-if="post.readingTime">•</span>
          <span v-if="post.readingTime">{{ post.readingTime }}</span>
        </div>

        <div class="space-y-2">
          <CardTitle class="text-2xl leading-tight">
            <NuxtLink :to="post.path" class="transition hover:text-primary">
              {{ post.title }}
            </NuxtLink>
          </CardTitle>
          <CardDescription class="max-w-2xl">{{ post.description }}</CardDescription>
        </div>

        <BlogTagList :tags="post.tags" />
      </div>

      <div class="flex items-center gap-3 rounded-full border border-border/70 bg-background/60 px-3 py-2 text-sm text-muted-foreground">
        <Avatar v-if="author" class="size-8 border border-border/70">
          <AvatarImage :src="author.avatar" :alt="author.name" class="object-cover" />
          <AvatarFallback>{{ author.name.slice(0, 2).toUpperCase() }}</AvatarFallback>
        </Avatar>
        <NuxtLink v-if="authorHref" :to="authorHref" class="transition hover:text-primary">
          {{ author?.name || post.author }}
        </NuxtLink>
        <span v-else>{{ author?.name || post.author }}</span>
      </div>
    </CardHeader>

    <CardFooter>
      <Button as-child variant="ghost" class="px-0">
        <NuxtLink :to="post.path">{{ readLabel }}</NuxtLink>
      </Button>
    </CardFooter>
  </Card>
</template>
