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

import {
    default as CoreError,
    type ICoreError
} from '@/src/errors/CoreError'

// We create a copy of the interface to detect changes in the future
export interface ICoreError_Test extends Error {
    error?: Error
    data?: object
    httpStatus?: StatusCodes
    environment: string
    timestamp: string
}

describe('[TYPE TEST] - src/errors/CoreError.ts', () => {
    const errorMsg = 'test'
    const errorMsgOrig = 'test original'
    const error = new Error(errorMsgOrig)
    
    describe('[INTERFACES]', () => {
        it('should verify ICoreError interface types', () => {
            expectTypeOf<ICoreError>().toEqualTypeOf<ICoreError_Test>()
        })
    })

    describe('[CLASS]', () => {
        describe('[CONSTRUCTOR]', () => {
            it('should correctly handle constructor parameters types', () => {
                expectTypeOf(CoreError).toBeConstructibleWith(errorMsg)
                expectTypeOf(CoreError).toBeConstructibleWith(errorMsg, error)
            })
        })

        describe('[INSTANCE]', () => {
            it('should verify instance type without error', () => {
                const coreError: ICoreError = new CoreError(errorMsg)
                expectTypeOf(coreError).toEqualTypeOf<ICoreError_Test>()
            })

            it('should verify instance type with error', () => {
                const coreError: ICoreError = new CoreError(errorMsg, error)
                expectTypeOf(coreError).toEqualTypeOf<ICoreError_Test>()
            })
        })
    })
})