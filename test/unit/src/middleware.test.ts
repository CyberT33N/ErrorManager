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
    ValidationError, type IValidationError,
    ErrorType
} from '@/src/index'

import {
    default as errorMiddleware,
    SanitizedMessage,
    type IErrorResponseSanitized
} from '@/src/middleware'

import type { Request, Response, NextFunction } from 'express'

import { StatusCodes } from 'http-status-codes'

describe('[UNIT TEST] - src/middleware.ts', () => {
    describe('[ENUM]', () => {
        it('should test types of SanitizedMessage enum', () => {
            expect(SanitizedMessage.DEFAULT).toBe('[SANITIZED]')
        })
    })

    describe('[CODE]', () => {
        let jsonStub: sinon.SinonStub
        let statusStub: sinon.SinonStub

        const errMsg = 'Test error'
        const errMsgOriginal = 'Test error original'
        const errData  = { data: 'test' }    
        const error: Error = new Error(errMsgOriginal)
        const validationErr: IValidationError = new ValidationError(errMsg, errData, error)

        beforeEach(() => {
            jsonStub = sinon.stub()

            statusStub = sinon.stub().callsFake(() => ({
                json: jsonStub
            }))
        })

        afterEach(() => {
            jsonStub.reset()
            statusStub.reset()
        })

        describe('[RESPONSE]', () => {
            describe('[NOT SANITIZED]', () => {
                // Will be reseted in the pretestEach.ts
                beforeEach(() => {
                    vi.stubEnv('npm_lifecycle_event', 'test')
                })

                it('should handle ValidationError and send a not sanitized JSON response because of NLE', () => {
                    const req = {} as Request
                    const res = { status: statusStub } as unknown as Response
                    const next = {} as NextFunction

                    const expectedResponse: IErrorResponseSanitized = {
                        name: ErrorType.VALIDATION,
                        environment: process.env.npm_lifecycle_event!,
                        timestamp: sinon.match.string as unknown as string,
                        message: errMsg,
                        httpStatus: StatusCodes.BAD_REQUEST,
                        error: `Error: ${errMsgOriginal}` as unknown as string,
                        data: errData,
                        stack: sinon.match.string as unknown as string
                    }

                    errorMiddleware(validationErr, req, res, next)

                    expect(statusStub.calledOnceWithExactly(StatusCodes.BAD_REQUEST)).toBe(true)
                    expect(jsonStub.calledOnceWithExactly(expectedResponse)).toBe(true)
                })
            })

            describe('[SANITIZED]', () => {
                // Will be reseted in the pretestEach.ts
                beforeEach(() => {
                    vi.stubEnv('npm_lifecycle_event', 'start')
                })

                it('should handle errors and send a sanitized JSON response because of NLE', () => {
                    const req = {} as Request
                    const res = { status: statusStub } as unknown as Response
                    const next = {} as NextFunction

                    const expectedResponse: IErrorResponseSanitized = {
                        name: ErrorType.VALIDATION,
                        environment: process.env.npm_lifecycle_event!,
                        timestamp: sinon.match.string as unknown as string,
                        message: errMsg,
                        httpStatus: StatusCodes.BAD_REQUEST,
                        error: SanitizedMessage.DEFAULT,
                        data: SanitizedMessage.DEFAULT,
                        stack: SanitizedMessage.DEFAULT
                    }

                    errorMiddleware(validationErr, req, res, next)

                    expect(statusStub.calledOnceWithExactly(StatusCodes.BAD_REQUEST)).toBe(true)
                    expect(jsonStub.calledOnceWithExactly(expectedResponse)).toBe(true)
                })
            })
        })
    })
})