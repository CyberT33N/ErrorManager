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

describe('[UNIT TEST] - src/errors/ValidationError.ts', () => {
    const errorMsg = 'test'
    const errorMsgOrig = 'test original'
    const errorData = { test: 'test' }
    const error = new Error(errorMsgOrig)

    it('should be instance of Error and ValidationError', () => {
        const validationError: IValidationError = new ValidationError(errorMsg, errorData)
        expect(validationError).toBeInstanceOf(ValidationError)
        expect(validationError).toBeInstanceOf(Error)
        expect(validationError).toBeInstanceOf(CoreError)
    })

    it('should have correct default properties', () => {
        const validationError: IValidationError = new ValidationError(errorMsg, errorData)
    
        expect(validationError.name).toBe(ErrorType.VALIDATION)
        expect(validationError.httpStatus).toBe(StatusCodes.BAD_REQUEST)
        expect(validationError.message).toBe(errorMsg)

        const { data } = validationError
        expect(data).toEqual(errorData)
    })

    it('should create new ValidationError without error argument', () => {
        const validationError: IValidationError = new ValidationError(errorMsg, errorData)
        expect(validationError.error).toBeUndefined()
    })

    it('should create new ValidationError without error argument', () => {
        const validationError: IValidationError = new ValidationError(errorMsg, errorData, error)
        expect(validationError.error).toBe(error)
    })
})