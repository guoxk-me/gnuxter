import { expect, test } from '@nuxt/test-utils/playwright'

test('example e2e test', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })
  // AI modified: keep the starter smoke test aligned with the product title.
  await expect(page).toHaveTitle('Gnuxter | Gnuxter')
})

test('persists the selected color mode across reloads', async ({ page, goto }) => {
  // AI modified: fix the system preference so the theme persistence assertion is deterministic.
  await page.emulateMedia({ colorScheme: 'light' })
  await goto('/', { waitUntil: 'hydration' })

  await page.getByRole('button', { name: 'Switch to dark mode' }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)

  await page.reload({ waitUntil: 'domcontentloaded' })
  await expect(page.locator('html')).toHaveClass(/dark/)
})

test('serves the frontend security header baseline without CSRF middleware', async ({ goto }) => {
  // AI modified: verify the deployed response instead of only asserting config shape.
  const response = await goto('/', { waitUntil: 'domcontentloaded' })
  if (!response)
    throw new Error('Expected the home page to return an HTTP response')

  const headers = response.headers()
  expect(headers['content-security-policy']).toContain('default-src \'self\'')
  expect(headers['content-security-policy']).toContain('frame-ancestors \'none\'')
  expect(headers['x-content-type-options']).toBe('nosniff')
  expect(headers['x-frame-options']).toBe('DENY')
  expect(headers['x-powered-by']).toBeUndefined()
  expect(headers['set-cookie'] ?? '').not.toContain('csrf=')
})
