<script setup lang="ts">
type FeatureAction = 'theme' | 'locale' | 'demo' | 'seo'

interface StarterFeature {
  action: FeatureAction
  icon: string
  title: string
  description: string
  isPrimary?: boolean
}

const { t, locale, locales, setLocale } = useI18n()
const appStore = useAppStore()
const addedProjects = shallowRef(0)

const features = computed<StarterFeature[]>(() => [
  {
    action: 'theme',
    icon: 'lucide:sun-moon',
    title: t('home.features.theme.title'),
    description: t('home.features.theme.description'),
  },
  {
    action: 'locale',
    icon: 'lucide:languages',
    title: t('home.features.i18n.title'),
    description: t('home.features.i18n.description'),
  },
  {
    action: 'demo',
    icon: 'lucide:sparkles',
    title: t('home.features.motion.title'),
    description: t('home.features.motion.description'),
    isPrimary: true,
  },
  {
    action: 'seo',
    icon: 'lucide:scan-search',
    title: t('home.features.seo.title'),
    description: t('home.features.seo.description'),
  },
])

function actionLabel(action: FeatureAction) {
  if (action === 'theme')
    return t('home.features.theme.action')
  if (action === 'locale')
    return locale.value === 'zh' ? '中文' : 'EN'
  if (action === 'demo')
    return addedProjects.value > 0 ? t('home.features.motion.added', { count: addedProjects.value }) : t('home.features.motion.action')
  return t('home.features.seo.action')
}

// AI modified: every capability row now demonstrates the behavior advertised by the prototype.
function runFeature(action: FeatureAction) {
  if (action === 'theme') {
    appStore.toggleTheme()
    return
  }

  if (action === 'locale') {
    const alternateLocale = locales.value.find(candidate => candidate.code !== locale.value)
    if (alternateLocale)
      setLocale(alternateLocale.code)
    return
  }

  if (action === 'demo') {
    addedProjects.value += 1
    return
  }

  window.open('/sitemap.xml', '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <section class="foundation" aria-labelledby="foundation-title">
    <div class="foundation__intro">
      <h2 id="foundation-title">
        {{ $t('home.foundation.title') }}
      </h2>
      <p>{{ $t('home.foundation.caption') }}</p>
    </div>

    <div class="foundation__list">
      <article v-for="feature in features" :key="feature.action" class="feature-row">
        <div class="feature-row__identity">
          <span class="feature-row__icon" :class="{ 'feature-row__icon--accent': feature.action === 'theme' }">
            <Icon :name="feature.icon" />
          </span>
          <span class="feature-row__copy">
            <strong>{{ feature.title }}</strong>
            <small>{{ feature.description }}</small>
          </span>
        </div>

        <button
          class="feature-row__action"
          :class="{ 'feature-row__action--primary': feature.isPrimary }"
          type="button"
          @click="runFeature(feature.action)"
        >
          {{ actionLabel(feature.action) }}
          <Icon v-if="feature.action !== 'seo'" :name="feature.action === 'demo' ? 'lucide:plus' : 'lucide:chevron-right'" />
        </button>
      </article>
    </div>

    <p class="sr-only" aria-live="polite">
      {{ addedProjects > 0 ? $t('home.features.motion.status', { count: addedProjects }) : '' }}
    </p>
  </section>
</template>

<style scoped>
.foundation {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 34px;
  border-top: 1px solid var(--border);
  padding-top: 28px;
}

.foundation__intro {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.foundation__intro h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
}

.foundation__intro p {
  color: var(--muted-foreground);
  font-size: 12px;
  line-height: 19px;
}

.foundation__list {
  display: flex;
  flex-direction: column;
}

.feature-row {
  display: flex;
  min-height: 67px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
}

.feature-row__identity {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 12px;
}

.feature-row__icon {
  display: inline-flex;
  width: 30px;
  height: 30px;
  flex: none;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background: var(--secondary);
  color: var(--muted-foreground);
}

.feature-row__icon--accent {
  background: var(--accent);
  color: var(--accent-foreground);
}

.feature-row__icon :deep(.iconify) {
  width: 14px;
  height: 14px;
}

.feature-row__copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 3px;
}

.feature-row__copy strong {
  font-size: 13px;
  font-weight: 600;
  line-height: 19px;
}

.feature-row__copy small {
  color: var(--muted-foreground);
  font-size: 11px;
  line-height: 16px;
}

.feature-row__action {
  display: inline-flex;
  min-height: 24px;
  flex: none;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 5px 8px;
  color: var(--secondary-foreground);
  font-size: 10px;
  font-weight: 600;
  line-height: 14px;
}

.feature-row__action--primary {
  border-color: var(--primary);
  background: var(--primary);
  color: var(--primary-foreground);
}

.feature-row__action:hover {
  border-color: var(--ring);
}

.feature-row__action :deep(.iconify) {
  width: 11px;
  height: 11px;
}

@media (max-width: 639px) {
  .foundation {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding-top: 20px;
  }

  .foundation__intro {
    gap: 4px;
  }

  .foundation__intro h2 {
    font-size: 17px;
    line-height: 25px;
  }

  .foundation__intro p {
    line-height: 19px;
  }

  .feature-row {
    min-height: 55px;
  }

  .feature-row__copy small {
    display: none;
  }
}
</style>
