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

/**
 * 🧪 Test suite for ResourceNotFoundError class.
 * @description This suite tests the functionality of the ResourceNotFoundError class.
 */
describe('[UNIT TEST] - src/errors/ResourceNotFoundError.ts', () => {
    /**
     * 🔧 Set up test variables.
     */
    const errorMsg = 'test'
    const errorMsgOrig = 'test original'
    const errorData = { test: 'test' }
    const error = new Error(errorMsgOrig)
        
    /**
     * 🧬 Test case: Verify instance types.
     * @description Ensures that ResourceNotFoundError is an instance of correct classes.
     */
    it('should be instance of CoreError and Error', () => {
        const resourceNotFoundError: IResourceNotFoundError = new ResourceNotFoundError(errorMsg, errorData)
        expect(resourceNotFoundError).toBeInstanceOf(ResourceNotFoundError)
        expect(resourceNotFoundError).toBeInstanceOf(Error)
        expect(resourceNotFoundError).toBeInstanceOf(CoreError)
    })

    /**
     * 🏷️ Test case: Verify default properties.
     * @description Checks if ResourceNotFoundError has correct default property values.
     */
    it('should have correct default properties', () => {
        const resourceNotFoundError: IResourceNotFoundError = new ResourceNotFoundError(errorMsg, errorData)
        
        expect(resourceNotFoundError.name).toBe(ErrorType.RESOURCE_NOT_FOUND)
        expect(resourceNotFoundError.httpStatus).toBe(StatusCodes.NOT_FOUND)
        expect(resourceNotFoundError.message).toBe(errorMsg)
        const { data } = resourceNotFoundError
        expect(data).toBe(errorData)
    })

    /**
     * 🚫 Test case: Create ResourceNotFoundError without error argument.
     * @description Ensures that ResourceNotFoundError can be created without an error argument.
     */
    it('should create new ResourceNotFoundError without error argument', () => {
        const resourceNotFoundError: IResourceNotFoundError = new ResourceNotFoundError(errorMsg, errorData)
        expect(resourceNotFoundError.error).toBeUndefined()
    })

    /**
     * ✅ Test case: Create ResourceNotFoundError with error argument.
     * @description Verifies that ResourceNotFoundError can be created with an error argument.
     */
    it('should create new ResourceNotFoundError with error argument', () => {
        const resourceNotFoundError: IResourceNotFoundError = new ResourceNotFoundError(
            errorMsg, errorData, error
        )
        expect(resourceNotFoundError.error).toBe(error)
    })
})