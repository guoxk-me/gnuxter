import { expect, test } from '@nuxt/test-utils/playwright'

test('example e2e test', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })
  // AI modified: keep the starter smoke test aligned with the product title.
  await expect(page).toHaveTitle('Gnuxter | Gnuxter')
})
