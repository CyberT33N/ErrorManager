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
import type {
    IBaseError,
    IValidationError,
    IRuntimeError,
    IResourceNotFoundError,
    IHttpClientError,
    IAxiosErrorData,
    IErrorResponseSanitized
} from '@/src/index'

/**
 * 🧪 Test suite for type definitions in src/index.ts.
 * @description This suite tests the presence and correctness of type definitions exported from index.ts.
 */
describe('[TYPE TEST] - src/index.ts', () => {
    /**
   * 🧬 Test suite for interfaces.
   * @description Verifies the presence of all exported interfaces.
   */
    describe('[INTERFACES]', () => {
    /**
     * 🛠️ Test suite for middleware-related interfaces.
     * @description Checks the presence of middleware-specific interfaces.
     */
        describe('[MIDDLEWARE]', () => {
            /**
             * ✅ Test case: Verify IErrorResponseSanitized interface.
             * @description Ensures that the IErrorResponseSanitized interface is defined and exported.
             */
            it('should have the interface IErrorResponseSanitized', () => {
                expectTypeOf<IErrorResponseSanitized>().not.toBeUndefined()
            })
        })

        /**
         * 🏗️ Test suite for error class interfaces.
         * @description Checks the presence of interfaces related to error classes.
         */
        describe('[ERROR CLASSES]', () => {
            /**
             * ✅ Test case: Verify IBaseError interface.
             * @description Ensures that the IBaseError interface is defined and exported.
             */
            it('should have the interface IBaseError', () => {
                expectTypeOf<IBaseError>().not.toBeUndefined()
            })

            /**
             * ✅ Test case: Verify IValidationError interface.
             * @description Ensures that the IValidationError interface is defined and exported.
             */
            it('should have the interface IValidationError', () => {
                expectTypeOf<IValidationError>().not.toBeUndefined()
            })

            /**
             * ✅ Test case: Verify IRuntimeError interface.
             * @description Ensures that the IRuntimeError interface is defined and exported.
             */
            it('should have the interface IRuntimeError', () => {
                expectTypeOf<IRuntimeError>().not.toBeUndefined()
            })

            /**
             * ✅ Test case: Verify IResourceNotFoundError interface.
             * @description Ensures that the IResourceNotFoundError interface is defined and exported.
             */
            it('should have the interface IResourceNotFoundError', () => {
                expectTypeOf<IResourceNotFoundError>().not.toBeUndefined()
            })

            /**
             * ✅ Test case: Verify IHttpClientError interface.
             * @description Ensures that the IHttpClientError interface is defined and exported.
             */
            it('should have the interface IHttpClientError', () => {
                expectTypeOf<IHttpClientError>().not.toBeUndefined()
            })

            /**
             * ✅ Test case: Verify IAxiosErrorData interface.
             * @description Ensures that the IAxiosErrorData interface is defined and exported.
             */
            it('should have the interface IAxiosErrorData', () => {
                expectTypeOf<IAxiosErrorData>().not.toBeUndefined()
            })
        })
    })
})