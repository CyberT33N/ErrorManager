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
import { BaseError, BaseErrorInterface } from '../../../../src/index'

describe('[UNIT TEST] - src/errors/BaseError.ts', () => {
    const errorMsg = 'test'
            
    it('should create new Base Error without error argument', () => {
        const baseError: BaseErrorInterface = new BaseError(errorMsg)
 
        expect(baseError).toBeInstanceOf(BaseError)
        expect(baseError.name).toBe('BaseError')
        expect(baseError.title).toBe(errorMsg)
        expect(baseError.httpStatus).toBe(500)
        expect(baseError.e).toBeUndefined()
    })

    it('should create new Base Error with error argument', () => {
        const e = new Error(errorMsg)
        const baseError: BaseErrorInterface = new BaseError(errorMsg, e)
 
        expect(baseError).toBeInstanceOf(BaseError)
        expect(baseError.name).toBe('BaseError')
        expect(baseError.title).toBe(errorMsg)
        expect(baseError.httpStatus).toBe(500)
        expect(baseError.e).toBe(e)
    })
})