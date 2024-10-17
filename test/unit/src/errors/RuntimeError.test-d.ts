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
    default as RuntimeError,
    type IRuntimeError
} from '@/src/errors/RuntimeError'
import type { ICoreError } from '@/src/errors/CoreError'

/**
 * 🧪 Test suite for RuntimeError class.
 * @description This suite tests the type definitions and functionality of the RuntimeError class.
 */
describe('[TYPE TEST] - src/errors/RuntimeError.ts', () => {
    /**
   * 🔧 Set up test variables.
   */
    const errorMsg = 'test'
    const errorMsgOrig = 'test original'
    const error = new Error(errorMsgOrig)

  /**
   * 📝 Define a test interface to detect future changes.
   * @description This interface extends ICoreError and defines specific properties for RuntimeError.
   */
  interface IRuntimeError_Test extends ICoreError {
    name: ErrorType.RUNTIME
    httpStatus: StatusCodes.INTERNAL_SERVER_ERROR
  }

  /**
   * 🧬 Test suite for interfaces.
   * @description Verifies the structure of the IRuntimeError interface.
   */
  describe('[INTERFACES]', () => {
      /**
     * ✅ Test case: Verify IRuntimeError interface type.
     * @description Ensures that IRuntimeError matches the expected structure.
     */
      it('should verify IRuntimeError interface type', () => {
          expectTypeOf<IRuntimeError>().toEqualTypeOf<IRuntimeError_Test>()
      })
  })

  /**
   * 🏗️ Test suite for RuntimeError class.
   * @description Tests the constructor and instance types of RuntimeError.
   */
  describe('[CLASS]', () => {
      /**
     * 🛠️ Test suite for constructor.
     * @description Verifies the constructor's parameter handling.
     */
      describe('[CONSTRUCTOR]', () => {
          /**
         * ✅ Test case: Verify constructor parameter types.
         * @description Ensures that the constructor accepts the correct parameter types.
         */
          it('should correctly handle constructor parameters types', () => {
              expectTypeOf(RuntimeError).toBeConstructibleWith(errorMsg)
              expectTypeOf(RuntimeError).toBeConstructibleWith(
                  errorMsg, StatusCodes.NOT_FOUND
              )
              expectTypeOf(RuntimeError).toBeConstructibleWith(errorMsg, StatusCodes.NOT_FOUND, error)
          })
      })

      /**
     * 📊 Test suite for instance types.
     * @description Verifies the types of RuntimeError instances.
     */
      describe('[INSTANCE]', () => {
          /**
         * ✅ Test case: Verify instance type without error.
         * @description Ensures that the instance type is correct when created without an error.
         */
          it('should verify instance type without error', () => {
              const runtimeError: IRuntimeError = new RuntimeError(errorMsg)
              expectTypeOf(runtimeError).toEqualTypeOf<IRuntimeError_Test>()
          })

          /**
         * ✅ Test case: Verify instance type with error.
         * @description Ensures that the instance type is correct when created with an error.
         */
          it('should verify instance type with error', () => {
              const runtimeError: IRuntimeError = new RuntimeError(
                  errorMsg, undefined, error
              )
              expectTypeOf(runtimeError).toEqualTypeOf<IRuntimeError_Test>()
          })

          /**
         * ✅ Test case: Verify instance type with custom HTTP status.
         * @description Ensures that the instance type is correct when created with a custom HTTP status.
         */
          it('should verify instance type with custom http status', () => {
              const runtimeError: IRuntimeError = new RuntimeError(
                  errorMsg, StatusCodes.NOT_FOUND
              )
              expectTypeOf(runtimeError).toEqualTypeOf<IRuntimeError_Test>()
          })
      })
  })
})