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
import { ErrorType } from '@/src/index'

import {
    default as BaseError,
    type IBaseError
} from '@/src/errors/BaseError'

import CoreError from '@/src/errors/CoreError'

describe('[UNIT TEST] - src/errors/BaseError.ts', () => {
    const errorMsg = 'test'
    const errorMsgOrig = 'test original'
    const error = new Error(errorMsgOrig)

    it('should be instance of CoreError and Error', () => {
        const baseError: IBaseError = new BaseError(errorMsg)
        expect(baseError).toBeInstanceOf(BaseError)
        expect(baseError).toBeInstanceOf(Error)
        expect(baseError).toBeInstanceOf(CoreError)
    })

    it('should have correct default properties', () => {
        const baseError: IBaseError = new BaseError(errorMsg)
    
        expect(baseError.name).toBe(ErrorType.BASE)
        expect(baseError.httpStatus).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(baseError.message).toBe(errorMsg)
    })
    
    it('should create new Base Error without error argument', () => {
        const baseError: IBaseError = new BaseError(errorMsg)
        expect(baseError.error).toBeUndefined()
    })

    it('should create new Base Error with error argument', () => {
        const baseError: IBaseError = new BaseError(errorMsg, error)
        expect(baseError.error).toBe(error)
    })
})