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

import { describe, it, expectTypeOf } from 'vitest'

import type { 
    IBaseError,
    IValidationError,
    IRuntimeError,
    IResourceNotFoundError,
    IHttpClientError,
    IAxiosErrorData,

    IErrorResponseSanitized
} from '@/src/index'

describe('[TYPE TEST] - src/index.ts', () => {
    describe('[INTERFACES]', () => {
        describe('[MIDDLEWARE]', () => {
            it('should have the interface IErrorResponseSanitized', () => {
                expectTypeOf<IErrorResponseSanitized>().not.toBeUndefined()
            })
        })

        describe('[ERROR CLASSES]', () => {
            it('should have the interface IBaseError', () => {
                expectTypeOf<IBaseError>().not.toBeUndefined()
            })

            it('should have the interface IValidationError', () => {
                expectTypeOf<IValidationError>().not.toBeUndefined()
            })

            it('should have the interface IRuntimeError', () => {
                expectTypeOf<IRuntimeError>().not.toBeUndefined()
            })

            it('should have the interface IResourceNotFoundError', () => {
                expectTypeOf<IResourceNotFoundError>().not.toBeUndefined()
            })

            it('should have the interface IHttpClientError', () => {
                expectTypeOf<IHttpClientError>().not.toBeUndefined()
            })

            it('should have the interface IAxiosErrorData', () => {
                expectTypeOf<IAxiosErrorData>().not.toBeUndefined()
            })
        })
    })
})