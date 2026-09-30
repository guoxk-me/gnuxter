import { afterAll, afterEach, beforeAll } from 'vitest'
import { mockServer } from '../mocks/server'

// AI modified: reject accidental real requests and isolate handlers between test cases.
beforeAll(() => mockServer.listen({ onUnhandledRequest: 'error' }))
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())
