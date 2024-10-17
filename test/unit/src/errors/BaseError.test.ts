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
import { ErrorType } from '@/src/index'

import {
    default as BaseError,
    type IBaseError
} from '@/src/errors/BaseError'

import CoreError from '@/src/errors/CoreError'

/**
 * @description Tests for the BaseError class from the src/errors/BaseError.ts module.
 * This suite verifies the behavior and properties of the BaseError class.
 */
describe('[UNIT TEST] - src/errors/BaseError.ts', () => {
    // 🔧 Error message for testing purposes
    const errorMsg = 'test'
    // 🔧 Original error message for the error instance
    const errorMsgOrig = 'test original'
    // 🔧 Create a new error instance with the original message
    const error = new Error(errorMsgOrig)

    /**
     * @test {BaseError}
     * @description Verifies that the created BaseError instance is of type 
     * BaseError, Error, and CoreError.
     */
    it('should be instance of CoreError and Error', () => {
        // 🛠️ Creating a new instance of BaseError with a test message
        const baseError: IBaseError = new BaseError(errorMsg)
        // ✅ Check if baseError is an instance of BaseError
        expect(baseError).toBeInstanceOf(BaseError)
        // ✅ Check if baseError is an instance of Error
        expect(baseError).toBeInstanceOf(Error)
        // ✅ Check if baseError is an instance of CoreError
        expect(baseError).toBeInstanceOf(CoreError)
    })

    /**
     * @test {BaseError}
     * @description Validates the default properties of the BaseError instance.
     */
    it('should have correct default properties', () => {
        // 🛠️ Creating a new instance of BaseError with a test message
        const baseError: IBaseError = new BaseError(errorMsg)

        // ✅ Validate the name property
        expect(baseError.name).toBe(ErrorType.BASE)
        // ✅ Validate the HTTP status property
        expect(baseError.httpStatus).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
        // ✅ Validate the message property
        expect(baseError.message).toBe(errorMsg)
    })
    
    /**
     * @test {BaseError}
     * @description Tests the creation of BaseError without an error argument.
     */
    it('should create new Base Error without error argument', () => {
        // 🛠️ Creating a new BaseError instance without an error argument
        const baseError: IBaseError = new BaseError(errorMsg)
        // ✅ Validate that the error property is undefined
        expect(baseError.error).toBeUndefined()
    })

    /**
     * @test {BaseError}
     * @description Tests the creation of BaseError with an error argument.
     */
    it('should create new Base Error with error argument', () => {
        // 🛠️ Creating a new BaseError instance with an error argument
        const baseError: IBaseError = new BaseError(errorMsg, error)
        // ✅ Validate that the error property matches the passed error
        expect(baseError.error).toBe(error)
    })
})
