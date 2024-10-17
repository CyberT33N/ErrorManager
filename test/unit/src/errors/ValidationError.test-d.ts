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
    default as ValidationError,
    type IValidationError
} from '@/src/errors/ValidationError'
import type { ICoreError } from '@/src/errors/CoreError'

/**
 * 🧪 Test suite for ValidationError class.
 * @description This suite tests the type definitions and functionality of the ValidationError class.
 */
describe('[TYPE TEST] - src/errors/ValidationError.ts', () => {
    /**
   * 🔧 Set up test variables.
   */
    const errorMsg = 'test'
    const errorMsgOrig = 'test original'
    const errorData = { test: 'test' }
    const error = new Error(errorMsgOrig)

  /**
   * 📝 Define a test interface to detect future changes.
   * @description This interface extends ICoreError and defines specific properties for ValidationError.
   */
  interface IValidationError_Test extends ICoreError {
    name: ErrorType.VALIDATION
    httpStatus: StatusCodes.BAD_REQUEST
  }

  /**
   * 🧬 Test suite for interfaces.
   * @description Verifies the structure of the IValidationError interface.
   */
  describe('[INTERFACES]', () => {
      /**
     * ✅ Test case: Verify IValidationError interface types.
     * @description Ensures that IValidationError matches the expected structure.
     */
      it('should verify IValidationError interface types', () => {
          expectTypeOf<IValidationError>().toEqualTypeOf<IValidationError_Test>()
      })
  })

  /**
   * 🏗️ Test suite for ValidationError class.
   * @description Tests the constructor and instance types of ValidationError.
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
              expectTypeOf(ValidationError).toBeConstructibleWith(errorMsg, errorData)
              expectTypeOf(ValidationError).toBeConstructibleWith(errorMsg, errorData, error)
          })
      })

      /**
     * 📊 Test suite for instance types.
     * @description Verifies the types of ValidationError instances.
     */
      describe('[INSTANCE]', () => {
          /**
         * ✅ Test case: Verify instance type without error.
         * @description Ensures that the instance type is correct when created without an error.
         */
          it('should verify instance type without error', () => {
              const validationError: IValidationError = new ValidationError(errorMsg, errorData)
              expectTypeOf(validationError).toEqualTypeOf<IValidationError_Test>()
          })

          /**
         * ✅ Test case: Verify instance type with error.
         * @description Ensures that the instance type is correct when created with an error.
         */
          it('should verify instance type with error', () => {
              const validationError: IValidationError = new ValidationError(
                  errorMsg, errorData, error
              )
              expectTypeOf(validationError).toEqualTypeOf<IValidationError_Test>()
          })
      })
  })
})