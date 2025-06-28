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

import { describe, it, expectTypeOf } from 'vitest'
import { StatusCodes } from 'http-status-codes'
import {
    default as CoreError,
    type ICoreError
} from '@/src/errors/CoreError'

/**
 * 📝 Represents the structure of the core error interface for testing.
 * 
 * @interface ICoreError_Test
 * @extends {Error}
 * @property {Error} [error] - The original error, if any.
 * @property {object} [data] - Additional data related to the error.
 * @property {StatusCodes} [httpStatus] - The HTTP status code associated with the error.
 * @property {string} environment - The environment where the error occurred (e.g., 'development').
 * @property {string} timestamp - The timestamp when the error was created.
 */
export interface ICoreError_Test extends Error {
    error?: Error
    data?: Record<string, unknown>
    httpStatus?: StatusCodes
    environment: string
    timestamp: string
}

/**
 * 🔍 Unit tests for the CoreError class and its related interfaces.
 */
describe('[TYPE TEST] - src/errors/CoreError.ts', () => {
    const errorMsg = 'test'
    const errorMsgOrig = 'test original'
    const error = new Error(errorMsgOrig)

    /**
     * 🧩 Group tests related to the ICoreError interface.
     */
    describe('[INTERFACES]', () => {
        it('should verify ICoreError interface types', () => {
            expectTypeOf<ICoreError>().toEqualTypeOf<ICoreError_Test>()
        })
    })

    /**
     * 🏗️ Group tests related to the CoreError class.
     */
    describe('[CLASS]', () => {
        /**
         * 🔧 Group tests related to the constructor of the CoreError class.
         */
        describe('[CONSTRUCTOR]', () => {
            it('should correctly handle constructor parameters types', () => {
                expectTypeOf(CoreError).toBeConstructibleWith(errorMsg)
                expectTypeOf(CoreError).toBeConstructibleWith(errorMsg, error)
            })
        })

        /**
         * 👤 Group tests related to instances of the CoreError class.
         */
        describe('[INSTANCE]', () => {
            it('should verify instance type without error', () => {
                const coreError: ICoreError = new CoreError(errorMsg)
                expectTypeOf(coreError).toEqualTypeOf<ICoreError_Test>()
            })

            it('should verify instance type with error', () => {
                const coreError: ICoreError = new CoreError(errorMsg, error)
                expectTypeOf(coreError).toEqualTypeOf<ICoreError_Test>()
            })
        })
    })
})
