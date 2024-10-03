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

import { ResourceNotFoundError } from '@/src/index'

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import type { IResourceNotFoundError } from '@/src/errors/ResourceNotFoundError'

describe('[UNIT TEST] - src/errors/ResourceNotFoundError.ts', () => {
    const errorMsg = 'test'
    const errorMsgOrig = 'test original'
    const errorData = { test: 'test' }
    const error = new Error(errorMsgOrig)
        
    it('should create new ResourceNotFoundError without error argument', () => {
        const resourceNotFoundError: IResourceNotFoundError = new ResourceNotFoundError(errorMsg, errorData)
        expectTypeOf(resourceNotFoundError).toEqualTypeOf<IResourceNotFoundError>()

        expect(resourceNotFoundError).toBeInstanceOf(ResourceNotFoundError)
        expect(resourceNotFoundError.name).toBe(ErrorType.RESOURCE_NOT_FOUND)
        expect(resourceNotFoundError.message).toBe(errorMsg)
        expect(resourceNotFoundError.httpStatus).toBe(StatusCodes.NOT_FOUND)
        expect(resourceNotFoundError.error).toBeUndefined()
        expect(resourceNotFoundError.stack).toBeDefined()
        expect(resourceNotFoundError.timestamp).toBeDefined()
        expect(resourceNotFoundError.environment).toBe(process.env.npm_lifecycle_event)

        const { data } = resourceNotFoundError
        expect(data).toBe(errorData)
    })

    it('should create new ResourceNotFoundError with error argument', () => {
        const resourceNotFoundError: IResourceNotFoundError = new ResourceNotFoundError(
            errorMsg, errorData, error
        )

        expectTypeOf(resourceNotFoundError).toEqualTypeOf<IResourceNotFoundError>()

        expect(resourceNotFoundError).toBeInstanceOf(ResourceNotFoundError)
        expect(resourceNotFoundError.name).toBe(ErrorType.RESOURCE_NOT_FOUND)
        expect(resourceNotFoundError.message).toBe(errorMsg)
        expect(resourceNotFoundError.httpStatus).toBe(StatusCodes.NOT_FOUND)
        expect(resourceNotFoundError.error).toBe(error)
        expect(resourceNotFoundError.stack).toBeDefined()
        expect(resourceNotFoundError.timestamp).toBeDefined()
        expect(resourceNotFoundError.environment).toBe(process.env.npm_lifecycle_event)

        const { data } = resourceNotFoundError
        expect(data).toBe(errorData)
    })
})