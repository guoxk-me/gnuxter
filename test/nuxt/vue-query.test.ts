import { mountSuspended } from '@nuxt/test-utils/runtime'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'

const VueQueryProbe = defineComponent({
  setup() {
    const queryClient = useQueryClient()
    const defaultStaleTime = queryClient.getDefaultOptions().queries?.staleTime
    const { data: serviceStatus, status: queryStatus } = useQuery({
      queryKey: ['vue-query-integration'],
      queryFn: async () => ({ status: 'available' as const }),
    })

    return {
      defaultStaleTime,
      queryStatus,
      serviceStatus,
    }
  },
  template: `
    <output data-testid="query-status">{{ queryStatus }}</output>
    <output data-testid="query-data">{{ serviceStatus?.status }}</output>
    <output data-testid="stale-time">{{ defaultStaleTime }}</output>
  `,
})

describe('vue Query Nuxt integration', () => {
  it('provides a configured QueryClient and resolves a query', async () => {
    const component = await mountSuspended(VueQueryProbe)

    await vi.waitFor(() => {
      expect(component.get('[data-testid="query-status"]').text()).toBe('success')
      expect(component.get('[data-testid="query-data"]').text()).toBe('available')
    })
    expect(component.get('[data-testid="stale-time"]').text()).toBe('5000')
  })
})
