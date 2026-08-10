import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config'

// AI modified: keep every install icon reproducible from one vector brand source.
export default defineConfig({
  headLinkOptions: {
    preset: '2023',
  },
  images: ['public/favicon.svg'],
  preset: {
    ...minimal2023Preset,
    apple: {
      ...minimal2023Preset.apple,
      padding: 0,
      resizeOptions: {
        background: '#18181b',
        fit: 'contain',
      },
    },
    maskable: {
      ...minimal2023Preset.maskable,
      padding: 0,
      resizeOptions: {
        background: '#18181b',
        fit: 'contain',
      },
    },
    transparent: {
      ...minimal2023Preset.transparent,
      padding: 0,
    },
  },
})
