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
    default as ResourceNotFoundError,
    type IResourceNotFoundError
} from '@/src/errors/ResourceNotFoundError'
import type { ICoreError} from '@/src/errors/CoreError'

/**
 * 🧪 Test suite for ResourceNotFoundError class and related types.
 */
describe('[TYPE TEST] - src/errors/ResourceNotFoundError.ts', () => {
    /**
     * 🔤 Sample error message for testing.
     */
    const errorMsg = 'test'

    /**
     * 🔤 Original error message for testing.
     */
    const errorMsgOrig = 'test original'

    /**
     * 📊 Sample error data for testing.
     */
    const errorData = { test: 'test' }

    /**
     * ❌ Sample Error instance for testing.
     */
    const error = new Error(errorMsgOrig)
     
    /**
     * 📝 Interface copy for future change detection.
     * Note: No need to create a copy of ICoreError as it has its own tests.
     * @interface IResourceNotFoundError_Test
     * @extends {ICoreError}
     */
    interface IResourceNotFoundError_Test extends ICoreError {
        name: ErrorType.RESOURCE_NOT_FOUND
        httpStatus: StatusCodes.NOT_FOUND
    }

    /**
     * 🧪 Test suite for interface verification.
     */
    describe('[INTERFACES]', () => {
        /**
         * ✅ Verify IResourceNotFoundError interface type.
         */
        it('should verify IResourceNotFoundError interface type', () => {
            expectTypeOf<IResourceNotFoundError>().toEqualTypeOf<IResourceNotFoundError_Test>()
        })
    })

    /**
     * 🧪 Test suite for ResourceNotFoundError class.
     */
    describe('[CLASS]', () => {
        /**
         * 🧪 Test suite for constructor.
         */
        describe('[CONSTRUCTOR]', () => {
            /**
             * ✅ Verify constructor parameter types.
             */
            it('should correctly handle constructor parameters types', () => {
                expectTypeOf(ResourceNotFoundError).toBeConstructibleWith(errorMsg, errorData)
                expectTypeOf(ResourceNotFoundError).toBeConstructibleWith(errorMsg, errorData, error)
            })
        })

        /**
         * 🧪 Test suite for class instances.
         */
        describe('[INSTANCE]', () => {
            /**
             * ✅ Verify instance type without error.
             */
            it('should verify instance type without error', () => {
                const resourceNotFoundError: IResourceNotFoundError = new ResourceNotFoundError(
                    errorMsg, errorData
                )
                expectTypeOf(resourceNotFoundError).toEqualTypeOf<IResourceNotFoundError_Test>()
            })

            /**
             * ✅ Verify instance type with error.
             */
            it('should verify instance type with error', () => {
                const resourceNotFoundError: IResourceNotFoundError = new ResourceNotFoundError(
                    errorMsg, errorData, error
                )
     
                expectTypeOf(resourceNotFoundError).toEqualTypeOf<IResourceNotFoundError_Test>()
            })
        })
    })
})