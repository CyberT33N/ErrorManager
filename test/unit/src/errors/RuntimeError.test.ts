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

import { describe, it, expect, expectTypeOf } from 'vitest'

import { RuntimeError } from '@/src/index'

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import type { RuntimeErrorInterface } from '@/src/errors/RuntimeError'

describe('[UNIT TEST] - src/errors/RuntimeError.ts', () => {
    const errorMsg = 'test'
    const errorMsgOrig = 'test original'
    const error = new Error(errorMsgOrig)

    it('should create new RuntimeError without error argument', () => {
        const runtimeError: RuntimeErrorInterface = new RuntimeError(
            errorMsg, StatusCodes.NOT_FOUND
        )

        expectTypeOf(runtimeError).toEqualTypeOf<RuntimeErrorInterface>()

        expect(runtimeError.error).toBeUndefined()

        expect(runtimeError).toBeInstanceOf(RuntimeError)
        expect(runtimeError.name).toBe(ErrorType.RUNTIME)
        expect(runtimeError.message).toBe(errorMsg)
        expect(runtimeError.httpStatus).toBe(StatusCodes.NOT_FOUND)
        expect(runtimeError.stack).toBeDefined()
        expect(runtimeError.timestamp).toBeDefined()
        expect(runtimeError.environment).toBe(process.env.npm_lifecycle_event)
    })

    it('should create new RuntimeError with error argument', () => {
        const runtimeError: RuntimeErrorInterface = new RuntimeError(
            errorMsg, StatusCodes.NOT_FOUND, error
        )

        expectTypeOf(runtimeError).toEqualTypeOf<RuntimeErrorInterface>()

        expect(runtimeError.error).toBeInstanceOf(Error)
        expect(runtimeError.error).toBe(error)

        expect(runtimeError).toBeInstanceOf(RuntimeError)
        expect(runtimeError.name).toBe(ErrorType.RUNTIME)
        expect(runtimeError.message).toBe(errorMsg)
        expect(runtimeError.httpStatus).toBe(StatusCodes.NOT_FOUND)
        expect(runtimeError.stack).toBeDefined()
        expect(runtimeError.timestamp).toBeDefined()
        expect(runtimeError.environment).toBe(process.env.npm_lifecycle_event)
    })

    it('should create new RuntimeError without custom http status', () => {
        const runtimeError: RuntimeErrorInterface = new RuntimeError(
            errorMsg
        )

        expectTypeOf(runtimeError).toEqualTypeOf<RuntimeErrorInterface>()

        expect(runtimeError).toBeInstanceOf(RuntimeError)
        expect(runtimeError.name).toBe(ErrorType.RUNTIME)
        expect(runtimeError.message).toBe(errorMsg)
        expect(runtimeError.httpStatus).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(runtimeError.error).toBeUndefined()
        expect(runtimeError.stack).toBeDefined()
        expect(runtimeError.timestamp).toBeDefined()
        expect(runtimeError.environment).toBe(process.env.npm_lifecycle_event)
    })
})