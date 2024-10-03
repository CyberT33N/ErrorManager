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

import type { ICoreError} from '@/src/errors/CoreError'

describe('[TYPE TEST] - src/errors/ValidationError.ts', () => {
    const errorMsg = 'test'
    const errorMsgOrig = 'test original'
    const errorData = { test: 'test' }
    const error = new Error(errorMsgOrig)
    
    // We create a copy of the interface to detect changes in the future
    // No need to create a copy of ICoreError because it got its own tests
    interface IValidationError_Test extends ICoreError {
        name: ErrorType.VALIDATION
        httpStatus: StatusCodes.BAD_REQUEST
    }

    describe('[INTERFACES]', () => {
        it('should verify IValidationError interface types', () => {
            expectTypeOf<IValidationError>().toEqualTypeOf<IValidationError_Test>()
        })
    })

    describe('[CLASS]', () => {
        describe('[CONSTRUCTOR]', () => {
            it('should correctly handle constructor parameters types', () => {
                expectTypeOf(ValidationError).toBeConstructibleWith(errorMsg, errorData)
                expectTypeOf(ValidationError).toBeConstructibleWith(errorMsg, errorData, error)
            })
        })

        describe('[INSTANCE]', () => {
            it('should verify instance type without error', () => {
                const validationError: IValidationError = new ValidationError(errorMsg, errorData)
                expectTypeOf(validationError).toEqualTypeOf<IValidationError_Test>()
            })

            it('should verify instance type with error', () => {
                const validationError: IValidationError = new ValidationError(
                    errorMsg,  errorData, error
                )

                expectTypeOf(validationError).toEqualTypeOf<IValidationError_Test>()
            })
        })
    })
})