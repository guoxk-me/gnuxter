<template>
  <section class="login-story" aria-labelledby="login-story-title">
    <div class="login-story__content">
      <div class="login-story__eyebrow">
        <hr aria-hidden="true">
        <span>{{ $t('login.eyebrow') }}</span>
      </div>
      <h1 id="login-story-title">
        {{ $t('login.storyTitle') }}
      </h1>
      <p>{{ $t('login.storyDescription') }}</p>
      <div class="login-story__note">
        <Icon name="lucide:shield-check" />
        <span>{{ $t('login.storyNote') }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.login-story {
  display: flex;
  min-width: 0;
  align-items: center;
  padding-inline: 72px;
}

.login-story__content {
  display: flex;
  width: min(520px, 100%);
  flex-direction: column;
  gap: 24px;
}

.login-story__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--muted-foreground);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.16em;
  line-height: 12px;
}

.login-story__eyebrow hr {
  width: 32px;
  border: 0;
  border-top: 1px solid var(--primary);
}

.login-story h1 {
  margin: 0;
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.3;
}

.login-story p {
  max-width: 440px;
  color: var(--muted-foreground);
  font-size: 16px;
  line-height: 1.7;
}

.login-story__note {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 10px;
  border-top: 1px solid var(--border);
  padding-top: 18px;
  color: var(--muted-foreground);
  font-size: 11px;
  line-height: 16px;
}

.login-story__note :deep(.iconify) {
  width: 14px;
  height: 14px;
  color: var(--primary);
}

@media (min-width: 640px) and (max-width: 1023px) {
  .login-story {
    height: 224px;
    justify-content: center;
    padding: 68px 0 42px;
  }

  .login-story__content {
    width: 480px;
    gap: 16px;
  }

  .login-story h1 {
    font-size: 36px;
    line-height: 1.28;
  }

  .login-story p {
    max-width: 480px;
    font-size: 14px;
    line-height: 24px;
  }

  .login-story__note {
    display: none;
  }
}

@media (max-width: 639px) {
  .login-story {
    height: 172px;
    align-items: flex-start;
    padding: 34px 20px 24px;
  }

  .login-story__content {
    width: 100%;
    gap: 12px;
  }

  .login-story h1 {
    font-size: 30px;
    line-height: 1.27;
  }

  .login-story p {
    max-width: 350px;
    font-size: 13px;
    line-height: 20px;
  }

  .login-story__note {
    display: none;
  }
}
</style>
