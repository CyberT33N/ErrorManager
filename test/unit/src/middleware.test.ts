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

import sinon from 'sinon'

import {
    vi,
    describe, it, expect, beforeEach, afterEach
} from 'vitest'

import {
    ValidationError,
    ErrorType
} from '@/src/index'

import {
    default as errorMiddleware,
    SanitizedMessage,
    type IErrorResponseSanitized
} from '@/src/middleware'

import type { Request, Response, NextFunction } from 'express'

import { StatusCodes } from 'http-status-codes'

/**
 * 📦 Test suite for the middleware in src/middleware.ts
 */
describe('[UNIT TEST] - src/middleware.ts', () => {
    /**
     * 📋 Enum test suite for SanitizedMessage
     */
    describe('[ENUM]', () => {
        /**
         * 🧪 Test case for SanitizedMessage enum values
         */
        it('should test types of SanitizedMessage enum', () => {
            expect(SanitizedMessage.DEFAULT).toBe('[SANITIZED]')
        })
    })

    /**
     * ⚙️ Code test suite to validate error handling
     */
    describe('[CODE]', () => {
        let jsonStub: sinon.SinonStub // 🧪 JSON stub for response
        let statusStub: sinon.SinonStub // ⚙️ Status stub for response

        const errMsg = 'Test error' // ⚠️ Error message for testing
        const errMsgOriginal = 'Test error original' // ⚠️ Original error message
        const errData = { data: 'test' } // 📊 Additional error data
        const error: Error = new Error(errMsgOriginal) // 📥 New error instance
        const validationErr = new ValidationError(errMsg, errData, error) // 📭 Validation error

        /**
         * 🔄 Setup before each test case
         */
        beforeEach(() => {
            jsonStub = sinon.stub() // 🔄 Create a stub for JSON response

            statusStub = sinon.stub().callsFake(() => ({ // 🔄 Create a stub for status response
                json: jsonStub
            }))
        })

        /**
         * 🔁 Cleanup after each test case
         */
        afterEach(() => {
            jsonStub.reset() // 🔄 Reset JSON stub
            statusStub.reset() // 🔄 Reset status stub
        })

        /**
         * 🛡️ Response handling test suite
         */
        describe('[RESPONSE]', () => {
            /**
             * ❌ Test suite for handling non-sanitized responses
             */
            describe('[NOT SANITIZED]', () => {
                /**
                 * 🔄 Setup environment for non-sanitized testing
                 */
                beforeEach(() => {
                    vi.stubEnv('npm_lifecycle_event', 'test') // 🌍 Set environment variable for testing
                })

                /**
                 * 🧪 Test case for handling ValidationError with non-sanitized response
                 */
                it('should handle ValidationError and send a not sanitized JSON response because of NLE', () => {
                    const req = {} as Request // 📥 Mock request object
                    const res = { status: statusStub } as unknown as Response // 📤 Mock response object
                    const next = {} as NextFunction // 🔄 Mock next function

                    /**
                     * 🗂️ Expected response structure for non-sanitized error
                     */
                    const expectedResponse: IErrorResponseSanitized = {
                        name: ErrorType.VALIDATION, // ⚠️ Error type
                        environment: process.env.npm_lifecycle_event!, // 🌍 Environment variable
                        timestamp: sinon.match.string as unknown as string, // ⏰ Timestamp of error
                        message: errMsg, // ⚠️ Error message
                        httpStatus: StatusCodes.BAD_REQUEST, // ⚠️ HTTP status code
                        error: `Error: ${errMsgOriginal}` as unknown as string, // ⚠️ Original error message
                        data: errData, // 📊 Error data
                        stack: sinon.match.string as unknown as string // 🔄 Stack trace
                    }

                    errorMiddleware(validationErr, req, res, next) // 🔄 Execute middleware

                    // ✅ Validate status call
                    expect(statusStub.calledOnceWithExactly(StatusCodes.BAD_REQUEST)).toBe(true) 
                    // ✅ Validate JSON response
                    expect(jsonStub.calledOnceWithExactly(expectedResponse)).toBe(true)
                })
            })

            /**
             * ✅ Test suite for handling sanitized responses
             */
            describe('[SANITIZED]', () => {
                /**
                 * 🔄 Setup environment for sanitized testing
                 */
                beforeEach(() => {
                    vi.stubEnv('npm_lifecycle_event', 'start') // 🌍 Set environment variable for testing
                })

                /**
                 * 🧪 Test case for handling errors with sanitized response
                 */
                it('should handle errors and send a sanitized JSON response because of NLE', () => {
                    const req = {} as Request // 📥 Mock request object
                    const res = { status: statusStub } as unknown as Response // 📤 Mock response object
                    const next = {} as NextFunction // 🔄 Mock next function

                    /**
                     * 🗂️ Expected response structure for sanitized error
                     */
                    const expectedResponse: IErrorResponseSanitized = {
                        name: ErrorType.VALIDATION, // ⚠️ Error type
                        environment: process.env.npm_lifecycle_event!, // 🌍 Environment variable
                        timestamp: sinon.match.string as unknown as string, // ⏰ Timestamp of error
                        message: errMsg, // ⚠️ Error message
                        httpStatus: StatusCodes.BAD_REQUEST, // ⚠️ HTTP status code
                        error: SanitizedMessage.DEFAULT, // ✅ Sanitized error message
                        data: SanitizedMessage.DEFAULT, // ✅ Sanitized data
                        stack: SanitizedMessage.DEFAULT // ✅ Sanitized stack trace
                    }

                    errorMiddleware(validationErr, req, res, next) // 🔄 Execute middleware

                    // ✅ Validate status call
                    expect(statusStub.calledOnceWithExactly(StatusCodes.BAD_REQUEST)).toBe(true) 
                    // ✅ Validate JSON response
                    expect(jsonStub.calledOnceWithExactly(expectedResponse)).toBe(true)
                })
            })
        })
    })
})
