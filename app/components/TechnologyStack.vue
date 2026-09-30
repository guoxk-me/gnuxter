<script setup lang="ts">
const technologies = ['Nuxt 4', 'Vue 3', 'TypeScript', 'Tailwind CSS', 'PWA']
</script>

<template>
  <section class="technology" aria-labelledby="technology-title">
    <h2 id="technology-title">
      {{ $t('home.stack') }}
    </h2>
    <ul class="technology__tags">
      <li v-for="technology in technologies" :key="technology" :class="{ 'technology__tag--accent': technology === 'Nuxt 4' }">
        {{ technology }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.technology {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 34px;
  border-top: 1px solid var(--border);
  padding-top: 24px;
}

.technology h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  line-height: 23px;
}

.technology__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.technology__tags li {
  border-radius: 6px;
  background: var(--secondary);
  padding: 5px 8px;
  color: var(--secondary-foreground);
  font-size: 10px;
  font-weight: 500;
  line-height: 12px;
}

.technology__tags .technology__tag--accent {
  background: var(--accent);
  color: var(--accent-foreground);
}

@media (max-width: 639px) {
  .technology {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 18px;
  }

  .technology h2 {
    font-size: 14px;
    line-height: 20px;
  }

  .technology__tags {
    gap: 6px;
  }
}
</style>
