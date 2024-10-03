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
    default as BaseError,
    type IBaseError
} from '@/src/errors/BaseError'

import type { ICoreError} from '@/src/errors/CoreError'

describe('[TYPE TEST] - src/errors/BaseError.ts', () => {
    const errorMsg = 'test'
    const errorMsgOrig = 'test original'
    const error = new Error(errorMsgOrig)
    
    // We create a copy of the interface to detect changes in the future
    // No need to create a copy of ICoreError because it got its own tests
    interface IBaseError_Test extends ICoreError {
        name: ErrorType.BASE
        httpStatus: StatusCodes.INTERNAL_SERVER_ERROR
    }

    describe('[INTERFACES]', () => {
        it('should verify IBaseError interface types', () => {
            expectTypeOf<IBaseError>().toEqualTypeOf<IBaseError_Test>()
        })
    })

    describe('[CLASS]', () => {
        describe('[CONSTRUCTOR]', () => {
            it('should correctly handle constructor parameters types', () => {
                expectTypeOf(BaseError).toBeConstructibleWith(errorMsg)
                expectTypeOf(BaseError).toBeConstructibleWith(errorMsg, error)
            })
        })

        describe('[INSTANCE]', () => {
            it('should verify instance type without error', () => {
                const baseError: IBaseError = new BaseError(errorMsg)
                expectTypeOf(baseError).toEqualTypeOf<IBaseError_Test>()
            })

            it('should verify instance type with error', () => {
                const baseError: IBaseError = new BaseError(errorMsg, error)
                expectTypeOf(baseError).toEqualTypeOf<IBaseError_Test>()
            })
        })
    })
})