import { setupServer } from 'msw/node'

// AI modified: keep shared infrastructure handler-free so each test owns its API contract.
export const mockServer = setupServer()
