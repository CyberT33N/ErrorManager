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

// ==== ENUM ====
import { HttpStatus, ErrorType } from '@/src/index'

// ==== DEPENDENCIES ====
import sinon from 'sinon'

// ==== INTERNAL DEPENDENCIES ====
import { ValidationError } from '@/src/index'

// ==== EXTERNAL INTERFACE ====
import { Request, Response, NextFunction } from 'express'

// ==== VITEST ====
import { describe, it, expect, beforeEach, afterEach } from 'vitest'

// ==== CODE ====
import errorMiddleware from '@/src/middleware'

describe('[UNIT] - src/middleware.ts', () => {
    let jsonStub: sinon.SinonStub
    let statusStub: sinon.SinonStub

    const errMsg = 'Test error'
    const errData = { data: 'test' }    
    const error = new Error(errMsg)
    const err = new ValidationError(errMsg, errData, error)

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

    describe('[NOT SANITIZED]', () => {
        beforeEach(() => {
            process.env.npm_lifecycle_event = 'test'
        })

        it('should handle ValidationError and send a not sanitized JSON response because of NLE', () => {
            const req = {} as Request
            const res = { status: statusStub } as unknown as Response
            const next = {} as NextFunction

            const expectedResponse = {
                name: ErrorType.VALIDATION,
                environment: process.env.npm_lifecycle_event,
                timestamp: sinon.match.string,
                title: errMsg,
                error: `Error: ${errMsg}`,
                data: errData,
                stack: sinon.match.string
            }

            errorMiddleware(err, req, res, next)

            expect(statusStub.calledOnceWithExactly(HttpStatus.BAD_REQUEST)).toBe(true)
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

            const expectedResponse = {
                name: ErrorType.VALIDATION,
                environment: process.env.npm_lifecycle_event,
                timestamp: sinon.match.string,
                title: errMsg,
                error: null,
                data: null,
                stack: null
            }

            errorMiddleware(err, req, res, next)

            expect(statusStub.calledOnceWithExactly(HttpStatus.BAD_REQUEST)).toBe(true)
            expect(jsonStub.calledOnceWithExactly(expectedResponse)).toBe(true)
        })
    })
})