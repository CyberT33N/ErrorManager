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

/**
 * 🧪 Test suite for src/middleware.ts
 */
describe('[TYPE TEST] - src/middleware.ts', () => {
    /**
     * 📋 Interface extending ICoreError with sanitized properties
     * @interface IErrorResponseSanitized_Test
     * @extends {Omit<ICoreError, 'error' | 'data'>}
     */
    interface IErrorResponseSanitized_Test extends Omit<
        ICoreError, 'error' | 'data'
    > {
        /** @property {string | SanitizedMessage.DEFAULT | ICoreError['error']} error - Sanitized error message */
        error: string | SanitizedMessage.DEFAULT | ICoreError['error']
        /** @property {SanitizedMessage.DEFAULT | ICoreError['data']} data - Sanitized error data */
        data: SanitizedMessage.DEFAULT | ICoreError['data']
        /** @property {SanitizedMessage.DEFAULT | ICoreError['stack']} stack - Sanitized error stack */
        stack: SanitizedMessage.DEFAULT | ICoreError['stack']
    }

    /**
     * 🔧 Type definition for the error middleware function
     * @typedef {Function} IErrorMiddleware_Test
     * @param {ICoreError} err - The error object
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {NextFunction} next - Express next function
     * @returns {void}
     */
    type IErrorMiddleware_Test = (
        err: ICoreError,
        req: Request,
        res: Response,
        next: NextFunction
    ) => void

    /**
     * 🧪 Test suite for function types
     */
    describe('[FUNCTION]', () => {
        /**
         * 🔍 Verify the type of ErrorMiddleware function
         */
        it('should verify function type', () => {
            expectTypeOf(ErrorMiddleware).toEqualTypeOf<IErrorMiddleware_Test>()
        })
    })

    /**
     * 🧪 Test suite for interface types
     * @namespace InterfaceTests
     */
    describe('[INTERFACES]', () => {
        /**
         * 🔍 Test the types of interface IErrorResponseSanitized
         */
        it('should test types of interface IErrorResponseSanitized', () => {
            expectTypeOf<IErrorResponseSanitized>().toEqualTypeOf<IErrorResponseSanitized_Test>()
        })

        /**
         * 🧪 Test suite for IErrorMiddleware interface
         */
        it('[IErrorMiddleware]', () => {
            /**
             * 🔍 Test the types of interface IErrorMiddleware
             */
            it('should test types of interface IErrorMiddleware', () => {
                expectTypeOf<IErrorMiddleware>().toEqualTypeOf<IErrorMiddleware_Test>()
            })

            /**
             * 🔍 Test the parameters of interface IErrorMiddleware
             */
            it('should test parameters of interface IErrorMiddleware', () => {
                expectTypeOf<IErrorMiddleware>().parameters.toEqualTypeOf<[
                    ICoreError, Request, Response, NextFunction
                ]>()
            })

            /**
             * 🔍 Test the return type of interface IErrorMiddleware
             */
            it('should test return type of interface IErrorMiddleware', () => {
                expectTypeOf(ErrorMiddleware).returns.toBeVoid()
            })
        })
    })
})