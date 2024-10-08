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
    
    errorMiddleware,

    StatusCodes, ErrorType, SanitizedMessage
} from '@/src/index'

describe('[UNIT TEST] - src/index.ts', () => {
    describe('[ENUM]', () => {
        enum ErrorType_Test {
            DEFAULT = 'Error',
            BASE = 'BaseError',
            VALIDATION = 'ValidationError',
            RUNTIME = 'RuntimeError',
            RESOURCE_NOT_FOUND = 'ResourceNotFoundError',
            HTTP_CLIENT = 'HttpClientError'
        }

        it('should have StatusCodes enum', () => {
            expect(StatusCodes).toBeDefined()
        })

        it('should have ErrorType enum', () => {
            expect(ErrorType).toEqual(ErrorType_Test)
        })

        it('should have SanitizedMessage enum', () => {
            expect(SanitizedMessage).toBeDefined()
        })
    })

    describe('[CODE]', () => {
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
})