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

import { BaseError } from '@/src/index'

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import type { IBaseError } from '@/src/errors/BaseError'

describe('[UNIT TEST] - src/errors/BaseError.ts', () => {
    const errorMsg = 'test'
    const errorMsgOrig = 'test original'
    const error = new Error(errorMsgOrig)
            
    it('should create new Base Error without error argument', () => {
        const baseError: IBaseError = new BaseError(errorMsg)
        expectTypeOf(baseError).toEqualTypeOf<IBaseError>()

        expect(baseError).toBeInstanceOf(BaseError)
        expect(baseError.name).toBe(ErrorType.BASE)
        expect(baseError.message).toBe(errorMsg)
        expect(baseError.httpStatus).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(baseError.error).toBeUndefined()
        expect(baseError.timestamp).toBeDefined()
        expect(baseError.environment).toBe(process.env.npm_lifecycle_event)
        expect(baseError.stack).toBeDefined()
    })

    it('should create new Base Error with error argument', () => {
        const baseError: IBaseError = new BaseError(errorMsg, error)
        expectTypeOf(baseError).toEqualTypeOf<IBaseError>()

        expect(baseError).toBeInstanceOf(BaseError)
        expect(baseError.name).toBe(ErrorType.BASE)
        expect(baseError.message).toBe(errorMsg)
        expect(baseError.httpStatus).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(baseError.error).toBe(error)
        expect(baseError.timestamp).toBeDefined()
        expect(baseError.environment).toBe(process.env.npm_lifecycle_event)
        expect(baseError.stack).toBeDefined()
    })
})