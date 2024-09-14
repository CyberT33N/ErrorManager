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
import { ResourceNotFoundError, ErrorDataInterface } from '../../../../src/index'


describe('[UNIT TEST] - src/errors/ResourceNotFoundError.ts', () => {
    const errorMsg = 'test'
    const errorData = { test: 'test' }
        
    it('should create new ResourceNotFoundError without error argument', () => {
        const resourceNotFoundError: ErrorDataInterface = new ResourceNotFoundError(errorMsg, errorData)
        expect(resourceNotFoundError).toBeInstanceOf(ResourceNotFoundError)
        expect(resourceNotFoundError.name).toBe('ResourceNotFoundError')
        expect(resourceNotFoundError.title).toBe(errorMsg)
        expect(resourceNotFoundError.httpStatus).toBe(404)
        expect(resourceNotFoundError.error).toBeUndefined()

        const { data } = resourceNotFoundError
        expect(data).toBe(errorData)
    })

    it('should create new ResourceNotFoundError with error argument', () => {
        const e = new Error(errorMsg)

        const resourceNotFoundError: ErrorDataInterface = new ResourceNotFoundError(errorMsg, errorData, e)
        expect(resourceNotFoundError).toBeInstanceOf(ResourceNotFoundError)
        expect(resourceNotFoundError.name).toBe('ResourceNotFoundError')
        expect(resourceNotFoundError.title).toBe(errorMsg)
        expect(resourceNotFoundError.httpStatus).toBe(404)
        expect(resourceNotFoundError.error).toBe(e)

        const { data } = resourceNotFoundError
        expect(data).toBe(errorData)
    })
})