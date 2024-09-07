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
import sinon from 'sinon'

// ==== INTERNAL DEPENDENCIES ====
import { ValidationError } from '../../../src/index'

// ==== EXTERNAL INTERFACE ====
import { Request, Response, NextFunction } from 'express'

// ==== VITEST ====
import { describe, it, expect, beforeEach } from 'vitest'

// ==== CODE ====
import errorMiddleware from '../../../src/middleware'

describe('[UNIT] - src/middleware.ts', () => {
    const errMsg = 'Test error'
    const errData = { data: 'test' }    
    const err = new ValidationError(errMsg, errData)
     
    describe('[NOT SANITIZED]', () => {
        it('should handle errors and send a not sanitized JSON response because of NLE', () => {
            const req = {} as Request

            const expectedResponse = {
                name: undefined,
                environment: undefined,
                timestamp: sinon.match.string,
                title: undefined,
                error: 'Error: Test error',
                data: undefined,
                stack: sinon.match.string
            }

            const jsonStub = sinon.stub().resolves(expectedResponse)

            const statusStub = sinon.stub().callsFake(() => ({
                json: jsonStub
            })) as sinon.SinonStub

            const res = {
                status: statusStub
            } as Response
     
            const next = {} as NextFunction

            errorMiddleware(err, req, res, next)

            expect(statusStub.calledOnce).toBe(true)

            const expectedArg = {
                name: 'ValidationError',
                environment: process.env.npm_lifecycle_event,
                timestamp: sinon.match.string,
                title: 'Test error',
                data: errData,
                stack: undefined
            }

            expect(jsonStub.calledOnceWithExactly(expectedArg)).toBe(true)
        })
    })

    describe('[SbeforeEachANITIZED]', () => {
        beforeEach(() => {
            process.env.npm_lifecycle_event = 'start'
        })

        it('should handle errors and send a sanitized JSON response because of NLE', () => {
            const req = {} as Request
     
            const expectedResponse = {
                name: undefined,
                environment: 'start',
                timestamp: sinon.match.string,
                title: undefined,
                error: null,
                data: null,
                stack: null
            }
     
            const jsonStub = sinon.stub().resolves(expectedResponse)
     
            const statusStub = sinon.stub().callsFake(() => ({
                json: jsonStub
            }))
     
            const res = {
                status: statusStub
            } as Response
      
            const next = {} as NextFunction
     
            errorMiddleware(err, req, res, next)
     
            expect(statusStub.calledOnce).toBe(true)
     
            const expectedArg = {
                name: 'ValidationError',
                environment: 'start',
                timestamp: sinon.match.string,
                title: 'Test error',
                data: errData,
                stack: undefined
            }
     
            expect(jsonStub.calledOnceWithExactly(expectedArg)).toBe(true)
        })
    })
})