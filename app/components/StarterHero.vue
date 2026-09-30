<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <section class="starter-hero" aria-labelledby="starter-title">
    <div class="starter-hero__meta">
      <div class="starter-hero__eyebrow">
        <hr aria-hidden="true">
        <span>{{ $t('home.eyebrow') }}</span>
      </div>
      <span class="starter-hero__version">v1.0 <span class="starter-hero__year">· 2026</span></span>
    </div>

    <h1 id="starter-title" class="starter-hero__title">
      Gnuxter
    </h1>
    <p class="starter-hero__description">
      {{ $t('home.description') }}
    </p>

    <div class="starter-hero__actions">
      <NuxtLink :to="localePath('/login')" class="starter-hero__primary">
        {{ $t('home.actions.start') }}
        <Icon name="lucide:arrow-up-right" />
      </NuxtLink>
      <a
        href="https://github.com/guoxk-me/gnuxter"
        target="_blank"
        rel="noopener noreferrer"
        class="starter-hero__secondary"
      >
        <Icon name="lucide:github" />
        {{ $t('home.actions.source') }}
      </a>
    </div>
  </section>
</template>

<style scoped>
.starter-hero {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 18px;
}

.starter-hero__meta {
  display: flex;
  height: 12px;
  align-items: center;
  justify-content: space-between;
}

.starter-hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: var(--muted-foreground);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.22em;
  line-height: 12px;
}

.starter-hero__eyebrow hr {
  width: 28px;
  border: 0;
  border-top: 1px solid var(--primary);
}

.starter-hero__version {
  color: var(--muted-foreground);
  font-size: 10px;
  line-height: 12px;
}

.starter-hero__title {
  margin: 0;
  font-size: 56px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.25;
}

.starter-hero__description {
  max-width: 672px;
  color: var(--muted-foreground);
  font-size: 17px;
  line-height: 1.7;
}

.starter-hero__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.starter-hero__primary,
.starter-hero__secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 7px;
  font-size: 12px;
  line-height: 17px;
  text-decoration: none;
}

.starter-hero__primary {
  min-height: 31px;
  background: var(--primary);
  padding: 7px 12px;
  color: var(--primary-foreground);
  font-weight: 600;
}

.starter-hero__secondary {
  min-height: 29px;
  border: 1px solid var(--border);
  padding: 6px 11px;
  color: var(--secondary-foreground);
  font-weight: 500;
}

.starter-hero__primary:hover,
.starter-hero__secondary:hover {
  transform: translateY(-1px);
}

.starter-hero__primary :deep(.iconify),
.starter-hero__secondary :deep(.iconify) {
  width: 13px;
  height: 13px;
}

@media (max-width: 639px) {
  .starter-hero {
    gap: 14px;
  }

  .starter-hero__version .starter-hero__year {
    display: none;
  }

  .starter-hero__title {
    font-size: 42px;
    line-height: 1.26;
  }

  .starter-hero__description {
    font-size: 14px;
    line-height: 1.65;
  }
}
</style>
