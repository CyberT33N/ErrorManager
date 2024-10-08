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

import { ErrorType, RuntimeError } from '@/src/index'
import type { IRuntimeError } from '@/src/errors/RuntimeError'
import CoreError from '@/src/errors/CoreError'

describe('[UNIT TEST] - src/errors/RuntimeError.ts', () => {
    const errorMsg = 'test'
    const errorMsgOrig = 'test original'
    const error = new Error(errorMsgOrig)

    it('should be instance of CoreError and Error', () => {
        const runtimeError: IRuntimeError = new RuntimeError(errorMsg)
        expect(runtimeError).toBeInstanceOf(RuntimeError)
        expect(runtimeError).toBeInstanceOf(Error)
        expect(runtimeError).toBeInstanceOf(CoreError)
    })

    it('should have correct default properties', () => {
        const runtimeError: IRuntimeError = new RuntimeError(errorMsg)

        expect(runtimeError.name).toBe(ErrorType.RUNTIME)
        expect(runtimeError.httpStatus).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(runtimeError.message).toBe(errorMsg)
    })

    it('should create new RuntimeError without error argument', () => {
        const runtimeError: IRuntimeError = new RuntimeError(errorMsg)
        expect(runtimeError.error).toBeUndefined()
    })

    it('should create new RuntimeError with error argument', () => {
        const runtimeError: IRuntimeError = new RuntimeError(
            errorMsg, StatusCodes.NOT_FOUND, error
        )

        expect(runtimeError.error).toBe(error)
    })

    it('should create new RuntimeError with custom http status', () => {
        const runtimeError: IRuntimeError = new RuntimeError(
            errorMsg, StatusCodes.NOT_FOUND
        )

        expect(runtimeError.httpStatus).toBe(StatusCodes.NOT_FOUND)
    })
})