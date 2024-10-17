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
import { StatusCodes } from 'http-status-codes'
import { ErrorType, ValidationError } from '@/src/index'
import type { IValidationError } from '@/src/errors/ValidationError'
import CoreError from '@/src/errors/CoreError'

/**
 * 🧪 Test suite for ValidationError class.
 * @description This suite tests the functionality of the ValidationError class.
 */
describe('[UNIT TEST] - src/errors/ValidationError.ts', () => {
    /**
   * 🔧 Set up test variables.
   */
    const errorMsg = 'test'
    const errorMsgOrig = 'test original'
    const errorData = { test: 'test' }
    const error = new Error(errorMsgOrig)

    /**
   * 🧬 Test case: Verify instance types.
   * @description Ensures that ValidationError is an instance of correct classes.
   */
    it('should be instance of Error and ValidationError', () => {
        const validationError: IValidationError = new ValidationError(errorMsg, errorData)
        expect(validationError).toBeInstanceOf(ValidationError)
        expect(validationError).toBeInstanceOf(Error)
        expect(validationError).toBeInstanceOf(CoreError)
    })

    /**
   * 🏷️ Test case: Verify default properties.
   * @description Checks if ValidationError has correct default property values.
   */
    it('should have correct default properties', () => {
        const validationError: IValidationError = new ValidationError(errorMsg, errorData)
        expect(validationError.name).toBe(ErrorType.VALIDATION)
        expect(validationError.httpStatus).toBe(StatusCodes.BAD_REQUEST)
        expect(validationError.message).toBe(errorMsg)
        const { data } = validationError
        expect(data).toEqual(errorData)
    })

    /**
   * 🚫 Test case: Create ValidationError without error argument.
   * @description Ensures that ValidationError can be created without an error argument.
   */
    it('should create new ValidationError without error argument', () => {
        const validationError: IValidationError = new ValidationError(errorMsg, errorData)
        expect(validationError.error).toBeUndefined()
    })

    /**
   * ✅ Test case: Create ValidationError with error argument.
   * @description Verifies that ValidationError can be created with an error argument.
   */
    it('should create new ValidationError with error argument', () => {
        const validationError: IValidationError = new ValidationError(errorMsg, errorData, error)
        expect(validationError.error).toBe(error)
    })
})