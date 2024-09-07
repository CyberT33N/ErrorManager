/*
███████████████████████████████████████████████████████████████████████████████
██******************** PRESENTED BY t33n Software ***************************██
██                                                                           ██
██                  ████████╗██████╗ ██████╗ ███╗   ██╗                      ██
██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ==== VITEST ====
import { describe, it, expect } from 'vitest'

// ==== CODE ====
import {
    BaseError,
    ValidationError,
    RuntimeError,
    ResourceNotFoundError,
    HttpClientError
} from '../../../src/index'

describe('[UNIT TEST] - src/index.ts', () => {
    it('should have BaseError class', () => {
        expect(BaseError).toBeDefined()
    })

    it('should have ValidationError class', () => {
        expect(ValidationError).toBeDefined()
    })

    it('should have RuntimeError class', () => {
        expect(RuntimeError).toBeDefined()
    })

    it('should have ResourceNotFoundError class', () => {
        expect(ResourceNotFoundError).toBeDefined()
    })

    it('should have HttpClientError class', () => {
        expect(HttpClientError).toBeDefined()
    })
})