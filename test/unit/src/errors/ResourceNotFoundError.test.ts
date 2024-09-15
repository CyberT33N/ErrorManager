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

// ==== ENUM ====
import { HttpStatus, ErrorType } from '@/src/index'

// ==== INTERFACE ====
import { ErrorDataInterface } from '@/src/index'

// ==== CODE ====
import { ResourceNotFoundError } from '@/src/index'

describe('[UNIT TEST] - src/errors/ResourceNotFoundError.ts', () => {
    const errorMsg = 'test'
    const errorData = { test: 'test' }
        
    it('should create new ResourceNotFoundError without error argument', () => {
        const resourceNotFoundError: ErrorDataInterface = new ResourceNotFoundError(errorMsg, errorData)
        expect(resourceNotFoundError).toBeInstanceOf(ResourceNotFoundError)
        expect(resourceNotFoundError.name).toBe(ErrorType.RESOURCE_NOT_FOUND)
        expect(resourceNotFoundError.title).toBe(errorMsg)
        expect(resourceNotFoundError.httpStatus).toBe(HttpStatus.NOT_FOUND)
        expect(resourceNotFoundError.error).toBeUndefined()

        const { data } = resourceNotFoundError
        expect(data).toBe(errorData)
    })

    it('should create new ResourceNotFoundError with error argument', () => {
        const e = new Error(errorMsg)

        const resourceNotFoundError: ErrorDataInterface = new ResourceNotFoundError(errorMsg, errorData, e)
        expect(resourceNotFoundError).toBeInstanceOf(ResourceNotFoundError)
        expect(resourceNotFoundError.name).toBe(ErrorType.RESOURCE_NOT_FOUND)
        expect(resourceNotFoundError.title).toBe(errorMsg)
        expect(resourceNotFoundError.httpStatus).toBe(HttpStatus.NOT_FOUND)
        expect(resourceNotFoundError.error).toBe(e)

        const { data } = resourceNotFoundError
        expect(data).toBe(errorData)
    })
})