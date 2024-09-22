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
import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { ValidationError } from '@/src/index'
import errorMiddleware from '@/src/middleware'

import type { CoreErrorInterface } from '@/src/errors/CoreError'
import type { ErrorResponseSanitizedInterface } from '@/src/middleware'
import type { Request, Response, NextFunction } from 'express'

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import { SanitizedMessage } from '@/src/middleware'

describe('[UNIT] - src/middleware.ts', () => {
    let jsonStub: sinon.SinonStub
    let statusStub: sinon.SinonStub

    const errMsg = 'Test error'
    const errMsgOriginal = 'Test error original'
    const errData  = { data: 'test' }    
    const error: Error = new Error(errMsgOriginal)
    const validationErr: CoreErrorInterface = new ValidationError(errMsg, errData, error)

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
            beforeEach(() => {
                process.env.npm_lifecycle_event = 'test'
            })

            it('should handle ValidationError and send a not sanitized JSON response because of NLE', () => {
                const req = {} as Request
                const res = { status: statusStub } as unknown as Response
                const next = {} as NextFunction

                const expectedResponse: ErrorResponseSanitizedInterface = {
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
            beforeEach(() => {
                process.env.npm_lifecycle_event = 'start'
            })

            it('should handle errors and send a sanitized JSON response because of NLE', () => {
                const req = {} as Request
                const res = { status: statusStub } as unknown as Response
                const next = {} as NextFunction

                const expectedResponse: ErrorResponseSanitizedInterface = {
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