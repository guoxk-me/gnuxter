import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { mockServer } from '../mocks/server'

const serviceStatusSchema = z.object({
  service: z.string(),
  status: z.literal('available'),
})

describe('external API mock infrastructure', () => {
  it('intercepts a test-owned external service contract', async () => {
    mockServer.use(
      http.get('https://services.gnuxter.test/status', () => {
        return HttpResponse.json({
          service: 'example',
          status: 'available',
        })
      }),
    )

    const response = await fetch('https://services.gnuxter.test/status')
    const serviceStatus = serviceStatusSchema.parse(await response.json())

    expect(response.ok).toBe(true)
    expect(serviceStatus).toEqual({
      service: 'example',
      status: 'available',
    })
  })
})
