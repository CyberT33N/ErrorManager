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

import { describe, it, expect, expectTypeOf } from 'vitest'

import { ValidationError } from '@/src/index'

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import type { IValidationError } from '@/src/errors/ValidationError'

describe('[UNIT TEST] - src/errors/ValidationError.ts', () => {
    const errorMsg = 'test'
    const errorMsgOrig = 'test original'
    const errorData = { test: 'test' }
    const error = new Error(errorMsgOrig)

    it('should create new ValidationError without error argument', () => {
        const validationError: IValidationError = new ValidationError(errorMsg, errorData)
        
        expectTypeOf(validationError).toEqualTypeOf<IValidationError>()

        expect(validationError).toBeInstanceOf(ValidationError)
        expect(validationError.name).toBe(ErrorType.VALIDATION)
        expect(validationError.message).toBe(errorMsg)
        expect(validationError.httpStatus).toBe(StatusCodes.BAD_REQUEST)
        expect(validationError.error).toBeUndefined()
        expect(validationError.stack).toBeDefined()
        expect(validationError.timestamp).toBeDefined()
        expect(validationError.environment).toBe(process.env.npm_lifecycle_event)

        const { data } = validationError
        expect(data).toEqual(errorData)
    })

    it('should create new ValidationError without custom http status', () => {
        const validationError: IValidationError = new ValidationError(errorMsg, errorData, error)

        expectTypeOf(validationError).toEqualTypeOf<IValidationError>()

        expect(validationError).toBeInstanceOf(ValidationError)
        expect(validationError.name).toBe(ErrorType.VALIDATION)
        expect(validationError.message).toBe(errorMsg)
        expect(validationError.httpStatus).toBe(StatusCodes.BAD_REQUEST)
        expect(validationError.error).toBe(error)
        expect(validationError.stack).toBeDefined()
        expect(validationError.timestamp).toBeDefined()
        expect(validationError.environment).toBe(process.env.npm_lifecycle_event)

        const { data } = validationError
        expect(data).toEqual(errorData)
    })
})