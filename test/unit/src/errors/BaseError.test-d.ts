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
import { ErrorType } from '@/src/index'
import {
    default as BaseError,
    type IBaseError
} from '@/src/errors/BaseError'
import type { ICoreError } from '@/src/errors/CoreError'

/**
 * Test suite for the BaseError class and IBaseError interface.
 */
describe('[TYPE TEST] - src/errors/BaseError.ts', () => {
    // 🎯 Error message for testing purposes
    const errorMsg = 'test'
    // 🎯 Original error message for creating an Error instance
    const errorMsgOrig = 'test original'
    // 🎯 Create a new Error object with the original message
    const error = new Error(errorMsgOrig)

    /**
     * Interface that extends ICoreError for testing purposes.
     * Used to verify that IBaseError aligns with expected types.
     * 
     * @interface IBaseError_Test
     * @extends {ICoreError}
     * @property {ErrorType.BASE} name - The name of the error type.
     * @property {StatusCodes.INTERNAL_SERVER_ERROR} httpStatus - The HTTP status code.
     */
    interface IBaseError_Test extends ICoreError {
        name: ErrorType.BASE
        httpStatus: StatusCodes.INTERNAL_SERVER_ERROR
    }

    describe('[INTERFACES]', () => {
        // 📝 Test to verify the types of the IBaseError interface
        it('should verify IBaseError interface types', () => {
            expectTypeOf<IBaseError>().toEqualTypeOf<IBaseError_Test>()
        })
    })

    describe('[CLASS]', () => {
        describe('[CONSTRUCTOR]', () => {
            // 🧪 Test to ensure constructor parameter types are handled correctly
            it('should correctly handle constructor parameters types', () => {
                expectTypeOf(BaseError).toBeConstructibleWith(errorMsg)
                expectTypeOf(BaseError).toBeConstructibleWith(errorMsg, error)
            })
        })

        describe('[INSTANCE]', () => {
            // ✅ Test to verify instance type without an error object
            it('should verify instance type without error', () => {
                const baseError: IBaseError = new BaseError(errorMsg)
                expectTypeOf(baseError).toEqualTypeOf<IBaseError_Test>()
            })

            // ✅ Test to verify instance type with an error object
            it('should verify instance type with error', () => {
                const baseError: IBaseError = new BaseError(errorMsg, error)
                expectTypeOf(baseError).toEqualTypeOf<IBaseError_Test>()
            })
        })
    })
})
