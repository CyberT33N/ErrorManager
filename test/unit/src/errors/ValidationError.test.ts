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

// ==== VITEST ====
import { describe, it, expect } from 'vitest'

// ==== CODE ====
import { ValidationError, ErrorDataInterface } from '../../../../src/errors/index'

describe('[UNIT TEST] - src/errors/ValidationError.ts', () => {
    const errorMsg = 'test'
    const errorData = { test: 'test' }

    it('should create new ValidationError without error argument', () => {
        const validationError: ErrorDataInterface = new ValidationError(errorMsg, errorData)
        expect(validationError).toBeInstanceOf(ValidationError)
        expect(validationError.name).toBe('ValidationError')
        expect(validationError.title).toBe(errorMsg)
        expect(validationError.httpStatus).toBe(400)
        expect(validationError.e).toBeUndefined()

        const { data } = validationError
        expect(data).toEqual(errorData)
    })

    it('should create new ValidationError without custom http status', () => {
        const testError = new Error(errorMsg)

        const validationError: ErrorDataInterface = new ValidationError(errorMsg, errorData, testError)
        expect(validationError).toBeInstanceOf(ValidationError)
        expect(validationError.name).toBe('ValidationError')
        expect(validationError.title).toBe(errorMsg)
        expect(validationError.httpStatus).toBe(400)
        expect(validationError.e).toBe(testError)

        const { data } = validationError
        expect(data).toEqual(errorData)
    })
})