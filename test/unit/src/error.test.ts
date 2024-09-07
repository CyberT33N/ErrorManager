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

// ==== DEPENDENCIES ====
import axios from 'axios'

// ==== VITEST ====
import { describe, it, beforeAll, afterAll, expect } from 'vitest'

// ==== CODE ====
import errors from '../../../src/errors'

const {
    BaseError,
    ValidationError,
    RunTimeError,
    ResourceNotFoundError,
    HttpClientError
} = errors

describe('[UNIT TEST] - src/errors.ts', () => {
    describe('[ValidationError()]', () => {
        it('ValidationError should extend BaseError with additional data', () => {
            const errorMsg = 'test'
            const data = { field: 'value' }
            const validationError = new ValidationError(errorMsg, data)
   
            expect(validationError).toBeInstanceOf(ValidationError)
            expect(validationError).toBeInstanceOf(BaseError)
            expect(validationError.name).toBe('ValidationError')
            expect(validationError.title).toBe(errorMsg)
            expect(validationError.httpStatus).toBe(400)
            expect(validationError.data).toEqual(data)
        })
    })
   
    describe('[ResourceNotFoundError()]', () => {
        it('ResourceNotFoundError should extend BaseError with 404 status', () => {
            const errorMsg = 'test'
            const data = { resource: 'user' }
            const error = new ResourceNotFoundError(errorMsg, data)
   
            expect(error).toBeInstanceOf(ResourceNotFoundError)
            expect(error).toBeInstanceOf(BaseError)
            expect(error.name).toBe('ResourceNotFoundError')
            expect(error.title).toBe(errorMsg)
            expect(error.httpStatus).toBe(404)
            expect(error.data).toEqual(data)
        })
    })

    describe('[HttpClientError()]', () => {
        it('HttpClientError should handle axios-like errors', () => {
            let error

            const errorMsg = 'test'
          
            try {
                axios.get('http://local.not.found:1337')
                expect(false).toBe(true)
            } catch (e: any) {
                error = new HttpClientError(errorMsg, e)
                expect(error).toBeInstanceOf(HttpClientError)
                expect(error).toBeInstanceOf(BaseError)
                expect(error.name).toBe('HttpClientError')
                expect(error.httpStatus).toBe(400)
            }
   
            const test ='gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg'
        })
    })

    describe('[RunTimeError()]', () => {
        it('RunTimeError should allow custom HTTP status', () => {
            const errorMsg = 'test'
            const error = new RunTimeError(errorMsg, new Error('Oops'), 503)
   
            expect(error).toBeInstanceOf(RunTimeError)
            expect(error).toBeInstanceOf(BaseError)
            expect(error.name).toBe('RunTimeError')
            expect(error.title).toBe(errorMsg)
            expect(error.httpStatus).toBe(503)
        })
    })
})