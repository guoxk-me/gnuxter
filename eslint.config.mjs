// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

// AI modified: compose Antfu's conventions with Nuxt's project-aware rules.
export default withNuxt(
  antfu({
    type: 'app',
    typescript: true,
    vue: true,
    pnpm: true,
  }),
)
