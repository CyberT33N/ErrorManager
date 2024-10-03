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
    default as ResourceNotFoundError,
    type IResourceNotFoundError
} from '@/src/errors/ResourceNotFoundError'

import type { ICoreError} from '@/src/errors/CoreError'

describe('[TYPE TEST] - src/errors/ResourceNotFoundError.ts', () => {
    const errorMsg = 'test'
    const errorMsgOrig = 'test original'
    const errorData = { test: 'test' }
    const error = new Error(errorMsgOrig)
     
    // We create a copy of the interface to detect changes in the future
    // No need to create a copy of ICoreError because it got its own tests
    interface IResourceNotFoundError_Test extends ICoreError {
        name: ErrorType.RESOURCE_NOT_FOUND
        httpStatus: StatusCodes.NOT_FOUND
    }

    describe('[INTERFACES]', () => {
        it('should verify IResourceNotFoundError interface type', () => {
            expectTypeOf<IResourceNotFoundError>().toEqualTypeOf<IResourceNotFoundError_Test>()
        })
    })

    describe('[CLASS]', () => {
        describe('[CONSTRUCTOR]', () => {
            it('should correctly handle constructor parameters types', () => {
                expectTypeOf(ResourceNotFoundError).toBeConstructibleWith(errorMsg, errorData)
                expectTypeOf(ResourceNotFoundError).toBeConstructibleWith(errorMsg, errorData, error)
            })
        })

        describe('[INSTANCE]', () => {
            it('should verify instance type without error', () => {
                const resourceNotFoundError: IResourceNotFoundError = new ResourceNotFoundError(
                    errorMsg, errorData
                )

                expectTypeOf(resourceNotFoundError).toEqualTypeOf<IResourceNotFoundError_Test>()
            })

            it('should verify instance type with error', () => {
                const resourceNotFoundError: IResourceNotFoundError = new ResourceNotFoundError(
                    errorMsg, errorData, error
                )
     
                expectTypeOf(resourceNotFoundError).toEqualTypeOf<IResourceNotFoundError_Test>()
            })
        })
    })
})