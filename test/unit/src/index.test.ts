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

/**
 * 🧪 Test suite for src/index.ts.
 * @description This suite tests the exports and functionality of the main index file.
 */
describe('[UNIT TEST] - src/index.ts', () => {
    /**
   * 🔢 Test suite for enums.
   * @description Verifies the presence and correctness of exported enums.
   */
    describe('[ENUM]', () => {
        /**
         * 📝 Define a test enum for ErrorType comparison.
         */
        enum ErrorType_Test {
        DEFAULT = 'Error',
        BASE = 'BaseError',
        VALIDATION = 'ValidationError',
        RUNTIME = 'RuntimeError',
        RESOURCE_NOT_FOUND = 'ResourceNotFoundError',
        HTTP_CLIENT = 'HttpClientError'
        }

        /**
         * ✅ Test case: Verify StatusCodes enum.
         * @description Ensures that the StatusCodes enum is defined and exported.
         */
        it('should have StatusCodes enum', () => {
            expect(StatusCodes).toBeDefined()
        })

        /**
         * ✅ Test case: Verify ErrorType enum.
         * @description Ensures that the ErrorType enum is defined and matches the test enum.
         */
        it('should have ErrorType enum', () => {
            expect(ErrorType).toEqual(ErrorType_Test)
        })

        /**
         * ✅ Test case: Verify SanitizedMessage enum.
         * @description Ensures that the SanitizedMessage enum is defined and exported.
         */
        it('should have SanitizedMessage enum', () => {
            expect(SanitizedMessage).toBeDefined()
        })
    })

    /**
   * 🧬 Test suite for exported code elements.
   * @description Verifies the presence of exported functions and classes.
   */
    describe('[CODE]', () => {
        /**
         * ✅ Test case: Verify errorMiddleware function.
         * @description Ensures that the errorMiddleware function is defined and exported.
         */
        it('should have errorMiddleware function', () => {
            expect(errorMiddleware).toBeDefined()
        })

        /**
         * ✅ Test case: Verify BaseError class.
         * @description Ensures that the BaseError class is defined and exported.
         */
        it('should have BaseError class', () => {
            expect(BaseError).toBeDefined()
        })

        /**
         * ✅ Test case: Verify ValidationError class.
         * @description Ensures that the ValidationError class is defined and exported.
         */
        it('should have ValidationError class', () => {
            expect(ValidationError).toBeDefined()
        })

        /**
         * ✅ Test case: Verify RuntimeError class.
         * @description Ensures that the RuntimeError class is defined and exported.
         */
        it('should have RuntimeError class', () => {
            expect(RuntimeError).toBeDefined()
        })

        /**
         * ✅ Test case: Verify ResourceNotFoundError class.
         * @description Ensures that the ResourceNotFoundError class is defined and exported.
         */
        it('should have ResourceNotFoundError class', () => {
            expect(ResourceNotFoundError).toBeDefined()
        })

        /**
         * ✅ Test case: Verify HttpClientError class.
         * @description Ensures that the HttpClientError class is defined and exported.
         */
        it('should have HttpClientError class', () => {
            expect(HttpClientError).toBeDefined()
        })
    })
})