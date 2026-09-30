<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('login.title'),
  description: () => t('login.storyDescription'),
})
</script>

<template>
  <div class="login-page">
    <!-- AI modified: compose the responsive story and form panels from the current Pen prototype. -->
    <LoginStory />
    <section class="login-page__panel" :aria-label="$t('login.title')">
      <LoginForm />
    </section>
  </div>
</template>

<style scoped>
.login-page {
  display: grid;
  min-height: 0;
  flex: 1;
  grid-template-columns: minmax(0, 11fr) minmax(480px, 7fr);
}

.login-page__panel {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: center;
  border-left: 1px solid var(--border);
  background: var(--background);
}

@media (min-width: 640px) and (max-width: 1023px) {
  .login-page {
    display: flex;
    flex-direction: column;
  }

  .login-page__panel {
    flex: 1;
    border-top: 1px solid var(--border);
    border-left: 0;
  }
}

@media (max-width: 639px) {
  .login-page {
    display: flex;
    flex-direction: column;
  }

  .login-page__panel {
    flex: 1;
    align-items: flex-start;
    border-top: 1px solid var(--border);
    border-left: 0;
    padding: 28px 20px 0;
  }
}
</style>
