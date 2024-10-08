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

import { ResourceNotFoundError, ErrorType } from '@/src/index'
import type { IResourceNotFoundError } from '@/src/errors/ResourceNotFoundError'
import CoreError from '@/src/errors/CoreError'

describe('[UNIT TEST] - src/errors/ResourceNotFoundError.ts', () => {
    const errorMsg = 'test'
    const errorMsgOrig = 'test original'
    const errorData = { test: 'test' }
    const error = new Error(errorMsgOrig)
        
    it('should be instance of CoreError and Error', () => {
        const resourceNotFoundError: IResourceNotFoundError = new ResourceNotFoundError(errorMsg, errorData)

        expect(resourceNotFoundError).toBeInstanceOf(ResourceNotFoundError)
        expect(resourceNotFoundError).toBeInstanceOf(Error)
        expect(resourceNotFoundError).toBeInstanceOf(CoreError)
    })

    it('should have correct default properties', () => {
        const resourceNotFoundError: IResourceNotFoundError = new ResourceNotFoundError(errorMsg, errorData)
        
        expect(resourceNotFoundError.name).toBe(ErrorType.RESOURCE_NOT_FOUND)
        expect(resourceNotFoundError.httpStatus).toBe(StatusCodes.NOT_FOUND)
        expect(resourceNotFoundError.message).toBe(errorMsg)

        const { data } = resourceNotFoundError
        expect(data).toBe(errorData)
    })

    it('should create new ResourceNotFoundError without error argument', () => {
        const resourceNotFoundError: IResourceNotFoundError = new ResourceNotFoundError(errorMsg, errorData)

        expect(resourceNotFoundError.error).toBeUndefined()
    })

    it('should create new ResourceNotFoundError with error argument', () => {
        const resourceNotFoundError: IResourceNotFoundError = new ResourceNotFoundError(
            errorMsg, errorData, error
        )

        expect(resourceNotFoundError.error).toBe(error)
    })
})