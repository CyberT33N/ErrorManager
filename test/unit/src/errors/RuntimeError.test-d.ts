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
    default as RuntimeError,
    type IRuntimeError
} from '@/src/errors/RuntimeError'

import type { ICoreError} from '@/src/errors/CoreError'

describe('[TYPE TEST] - src/errors/RuntimeError.ts', () => {
    const errorMsg = 'test'
    const errorMsgOrig = 'test original'
    const error = new Error(errorMsgOrig)
     
    // We create a copy of the interface to detect changes in the future
    // No need to create a copy of ICoreError because it got its own tests
    interface IRuntimeError_Test extends ICoreError {
        name: ErrorType.RUNTIME
        httpStatus: StatusCodes.INTERNAL_SERVER_ERROR
    }

    describe('[INTERFACES]', () => {
        it('should verify IRuntimeError interface type', () => {
            expectTypeOf<IRuntimeError>().toEqualTypeOf<IRuntimeError_Test>()
        })
    })

    describe('[CLASS]', () => {
        describe('[CONSTRUCTOR]', () => {
            it('should correctly handle constructor parameters types', () => {
                expectTypeOf(RuntimeError).toBeConstructibleWith(errorMsg)

                expectTypeOf(RuntimeError).toBeConstructibleWith(
                    errorMsg, StatusCodes.NOT_FOUND
                )

                expectTypeOf(RuntimeError).toBeConstructibleWith(errorMsg, StatusCodes.NOT_FOUND, error)
            })
        })

        describe('[INSTANCE]', () => {
            it('should verify instance type without error', () => {
                const runtimeError: IRuntimeError = new RuntimeError(errorMsg)
                expectTypeOf(runtimeError).toEqualTypeOf<IRuntimeError_Test>()
            })

            it('should verify instance type with error', () => {
                const runtimeError: IRuntimeError = new RuntimeError(
                    errorMsg, undefined, error
                )
     
                expectTypeOf(runtimeError).toEqualTypeOf<IRuntimeError_Test>()
            })

            it('should verify instance type with custom http status', () => {
                const runtimeError: IRuntimeError = new RuntimeError(
                    errorMsg, StatusCodes.NOT_FOUND
                )
     
                expectTypeOf(runtimeError).toEqualTypeOf<IRuntimeError_Test>()
            })
        })
    })
})