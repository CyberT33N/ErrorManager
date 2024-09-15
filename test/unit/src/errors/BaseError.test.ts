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

// ==== ENUM ====
import { HttpStatus, ErrorType } from '@/src/index'

// ==== INTERFACE ====
import { BaseErrorInterface } from '@/src/index'

// ==== CODE ====
import { BaseError } from '@/src/index'

describe('[UNIT TEST] - src/errors/BaseError.ts', () => {
    const errorMsg = 'test'
            
    it('should create new Base Error without error argument', () => {
        const baseError: BaseErrorInterface = new BaseError(errorMsg)
 
        expect(baseError).toBeInstanceOf(BaseError)
        expect(baseError.name).toBe(ErrorType.BASE)
        expect(baseError.title).toBe(errorMsg)
        expect(baseError.httpStatus).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
        expect(baseError.error).toBeUndefined()
    })

    it('should create new Base Error with error argument', () => {
        const e = new Error(errorMsg)
        const baseError: BaseErrorInterface = new BaseError(errorMsg, e)
 
        expect(baseError).toBeInstanceOf(BaseError)
        expect(baseError.name).toBe(ErrorType.BASE)
        expect(baseError.title).toBe(errorMsg)
        expect(baseError.httpStatus).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
        expect(baseError.error).toBe(e)
    })
})