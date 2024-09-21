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

import { RuntimeError } from '@/src/index'

import { HttpStatus, ErrorType } from '@/src/index'
import type { BaseErrorInterface } from '@/src/errors/BaseError'

describe('[UNIT TEST] - src/errors/RuntimeError.ts', () => {
    const errorMsg = 'test'

    it('should create new ResourceNotFoundError without error argument', () => {
        const runtimeError: BaseErrorInterface = new RuntimeError(errorMsg, new Error(errorMsg))
        expect(runtimeError).toBeInstanceOf(RuntimeError)
        expect(runtimeError.name).toBe(ErrorType.RUNTIME)
        expect(runtimeError.message).toBe(errorMsg)
        expect(runtimeError.httpStatus).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
        expect(runtimeError.error).toBeInstanceOf(Error)
    })

    it('should create new ResourceNotFoundError without custom http status', () => {
        const runtimeError: BaseErrorInterface = new RuntimeError(
            errorMsg, new Error(errorMsg), HttpStatus.NOT_FOUND
        )

        expect(runtimeError).toBeInstanceOf(RuntimeError)
        expect(runtimeError.name).toBe(ErrorType.RUNTIME)
        expect(runtimeError.message).toBe(errorMsg)
        expect(runtimeError.httpStatus).toBe(HttpStatus.NOT_FOUND)
        expect(runtimeError.error).toBeInstanceOf(Error)
    })
})