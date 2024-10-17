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
import { ErrorType, RuntimeError } from '@/src/index'
import type { IRuntimeError } from '@/src/errors/RuntimeError'
import CoreError from '@/src/errors/CoreError'

/**
 * 🧪 Test suite for RuntimeError class.
 * @description This suite tests the functionality of the RuntimeError class.
 */
describe('[UNIT TEST] - src/errors/RuntimeError.ts', () => {
    /**
   * 🔧 Set up test variables.
   */
    const errorMsg = 'test'
    const errorMsgOrig = 'test original'
    const error = new Error(errorMsgOrig)

    /**
   * 🧬 Test case: Verify instance types.
   * @description Ensures that RuntimeError is an instance of correct classes.
   */
    it('should be instance of CoreError and Error', () => {
        const runtimeError: IRuntimeError = new RuntimeError(errorMsg)
        expect(runtimeError).toBeInstanceOf(RuntimeError)
        expect(runtimeError).toBeInstanceOf(Error)
        expect(runtimeError).toBeInstanceOf(CoreError)
    })

    /**
   * 🏷️ Test case: Verify default properties.
   * @description Checks if RuntimeError has correct default property values.
   */
    it('should have correct default properties', () => {
        const runtimeError: IRuntimeError = new RuntimeError(errorMsg)
        expect(runtimeError.name).toBe(ErrorType.RUNTIME)
        expect(runtimeError.httpStatus).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(runtimeError.message).toBe(errorMsg)
    })

    /**
   * 🚫 Test case: Create RuntimeError without error argument.
   * @description Ensures that RuntimeError can be created without an error argument.
   */
    it('should create new RuntimeError without error argument', () => {
        const runtimeError: IRuntimeError = new RuntimeError(errorMsg)
        expect(runtimeError.error).toBeUndefined()
    })

    /**
   * ✅ Test case: Create RuntimeError with error argument.
   * @description Verifies that RuntimeError can be created with an error argument.
   */
    it('should create new RuntimeError with error argument', () => {
        const runtimeError: IRuntimeError = new RuntimeError(
            errorMsg, StatusCodes.NOT_FOUND, error
        )
        expect(runtimeError.error).toBe(error)
    })

    /**
   * 🔧 Test case: Create RuntimeError with custom HTTP status.
   * @description Ensures that RuntimeError can be created with a custom HTTP status.
   */
    it('should create new RuntimeError with custom http status', () => {
        const runtimeError: IRuntimeError = new RuntimeError(
            errorMsg, StatusCodes.NOT_FOUND
        )
        expect(runtimeError.httpStatus).toBe(StatusCodes.NOT_FOUND)
    })
})