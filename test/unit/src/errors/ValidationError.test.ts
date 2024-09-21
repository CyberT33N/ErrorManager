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

import { ValidationError } from '@/src/index'

import { HttpStatus, ErrorType } from '@/src/index'
import type { ErrorDataInterface } from '@/src/index'

describe('[UNIT TEST] - src/errors/ValidationError.ts', () => {
    const errorMsg = 'test'
    const errorData = { test: 'test' }

    it('should create new ValidationError without error argument', () => {
        const validationError: ErrorDataInterface = new ValidationError(errorMsg, errorData)
        expect(validationError).toBeInstanceOf(ValidationError)
        expect(validationError.name).toBe(ErrorType.VALIDATION)
        expect(validationError.message).toBe(errorMsg)
        expect(validationError.httpStatus).toBe(HttpStatus.BAD_REQUEST)
        expect(validationError.error).toBeUndefined()

        const { data } = validationError
        expect(data).toEqual(errorData)
    })

    it('should create new ValidationError without custom http status', () => {
        const testError = new Error(errorMsg)

        const validationError: ErrorDataInterface = new ValidationError(errorMsg, errorData, testError)
        expect(validationError).toBeInstanceOf(ValidationError)
        expect(validationError.name).toBe(ErrorType.VALIDATION)
        expect(validationError.message).toBe(errorMsg)
        expect(validationError.httpStatus).toBe(HttpStatus.BAD_REQUEST)
        expect(validationError.error).toBe(testError)

        const { data } = validationError
        expect(data).toEqual(errorData)
    })
})