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
import { RuntimeError, BaseErrorInterface } from '../../../../src/index'

describe('[UNIT TEST] - src/errors/RuntimeError.ts', () => {
    const errorMsg = 'test'

    it('should create new ResourceNotFoundError without error argument', () => {
        const runtimeError: BaseErrorInterface = new RuntimeError(errorMsg, new Error(errorMsg))
        expect(runtimeError).toBeInstanceOf(RuntimeError)
        expect(runtimeError.name).toBe('RuntimeError')
        expect(runtimeError.title).toBe(errorMsg)
        expect(runtimeError.httpStatus).toBe(500)
        expect(runtimeError.error).toBeInstanceOf(Error)
    })

    it('should create new ResourceNotFoundError without custom http status', () => {
        const runtimeError: BaseErrorInterface = new RuntimeError(errorMsg, new Error(errorMsg), 404)
        expect(runtimeError).toBeInstanceOf(RuntimeError)
        expect(runtimeError.name).toBe('RuntimeError')
        expect(runtimeError.title).toBe(errorMsg)
        expect(runtimeError.httpStatus).toBe(404)
        expect(runtimeError.error).toBeInstanceOf(Error)
    })
})