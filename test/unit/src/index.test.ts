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

import { describe, it, expect } from 'vitest'

import {
    BaseError,
    ValidationError,
    RuntimeError,
    ResourceNotFoundError,
    HttpClientError,
    errorMiddleware
} from '@/src/index'

describe('[UNIT TEST] - src/index.ts', () => {
    it('should have errorMiddleware function', () => {
        expect(errorMiddleware).toBeDefined()
    })

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