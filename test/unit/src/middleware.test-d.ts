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

import {
    describe, it, expectTypeOf
} from 'vitest'

import type { ICoreError } from '@/src/errors/CoreError'

import {
    default as ErrorMiddleware,
    type IErrorResponseSanitized, type IErrorMiddleware,
    SanitizedMessage
} from '@/src/middleware'

import type { Request, Response, NextFunction } from 'express'

describe('[TYPE TEST] - src/middleware.ts', () => {
    interface IErrorResponseSanitized_Test extends Omit<
        ICoreError, 'error' | 'data'
    > {
        error: string | SanitizedMessage.DEFAULT | ICoreError['error']
        data: SanitizedMessage.DEFAULT | ICoreError['data']
        stack: SanitizedMessage.DEFAULT | ICoreError['stack']
    }

    type IErrorMiddleware_Test = (
        err: ICoreError,
        req: Request,
        res: Response,
        next: NextFunction
    ) => void

    describe('[FUNCTION]', () => {
        it('should verify function type', () => {
            expectTypeOf(ErrorMiddleware).toEqualTypeOf<IErrorMiddleware_Test>()
        })
    })

    describe('[INTERFACES]', () => {
        it('should test types of interface IErrorResponseSanitized', () => {
            expectTypeOf<IErrorResponseSanitized>().toEqualTypeOf<IErrorResponseSanitized_Test>()
        })

        it('[IErrorMiddleware]', () => {
            it('should test types of interface IErrorMiddleware', () => {
                expectTypeOf<IErrorMiddleware>().toEqualTypeOf<IErrorMiddleware_Test>()
            })

            it('should test parameters of interface IErrorMiddleware', () => {
                expectTypeOf<IErrorMiddleware>().parameters.toEqualTypeOf<[
                    ICoreError, Request, Response, NextFunction
                ]>()
            })

            it('should test return type of interface IErrorMiddleware', () => {
                expectTypeOf(ErrorMiddleware).returns.toBeVoid()
            })
        })
    })
})