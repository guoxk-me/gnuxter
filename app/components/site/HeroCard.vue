<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()
</script>

<template>
  <Card class="border-white/60 bg-white/85 shadow-xl shadow-primary/10 backdrop-blur dark:border-white/10 dark:bg-card/80">
    <CardHeader class="space-y-4">
      <Badge variant="secondary" class="w-fit rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.22em]">
        {{ t('hero.badge') }}
      </Badge>
      <div class="space-y-3">
        <CardTitle class="max-w-2xl text-3xl leading-tight sm:text-4xl">
          {{ t('hero.title') }}
        </CardTitle>
        <CardDescription class="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          {{ t('hero.description') }}
        </CardDescription>
      </div>
    </CardHeader>
    <CardContent class="grid gap-4 md:grid-cols-3">
      <div class="rounded-2xl border bg-background/80 p-4">
        <p class="text-sm font-medium">{{ t('hero.cards.primitives.title') }}</p>
        <p class="mt-2 text-sm leading-6 text-muted-foreground">
          {{ t('hero.cards.primitives.description') }}
        </p>
      </div>
      <div class="rounded-2xl border bg-background/80 p-4">
        <p class="text-sm font-medium">{{ t('hero.cards.tokens.title') }}</p>
        <p class="mt-2 text-sm leading-6 text-muted-foreground">
          {{ t('hero.cards.tokens.description') }}
        </p>
      </div>
      <div class="rounded-2xl border bg-background/80 p-4">
        <p class="text-sm font-medium">{{ t('hero.cards.next.title') }}</p>
        <p class="mt-2 text-sm leading-6 text-muted-foreground">
          {{ t('hero.cards.next.description') }}
        </p>
      </div>
    </CardContent>
    <CardFooter class="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      <Button as-child class="rounded-full px-5">
        <NuxtLink :to="localePath('/docs')">{{ t('hero.primaryCta') }}</NuxtLink>
      </Button>
      <Button as-child variant="outline" class="rounded-full px-5">
        <NuxtLink :to="localePath('/blog')">{{ t('hero.secondaryCta') }}</NuxtLink>
      </Button>
    </CardFooter>
  </Card>
</template>
