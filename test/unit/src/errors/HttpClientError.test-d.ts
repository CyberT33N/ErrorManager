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

import type { AxiosError, AxiosResponseHeaders } from 'axios'
 
import { describe, it, expectTypeOf } from 'vitest'

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
 
import {
    default as HttpClientError,
    type IHttpClientError,
    type IAxiosErrorData
} from '@/src/errors/HttpClientError'
 
import type { ICoreError} from '@/src/errors/CoreError'

describe('[TYPE TEST] - src/errors/HttpClientError.ts', () => {
    const errorMsg = 'test'

    // We create a copy of the interface to detect changes in the future
    interface IAxiosErrorData_Test {
        url: string | undefined
        method: string | undefined
        payload: unknown
        headers: AxiosResponseHeaders  | undefined;
        responseData: unknown
        errorMessage: string
    }
    
    // No need to create a copy of ICoreError because it got its own tests
    interface IHttpClientError_Test extends ICoreError {
        data: IAxiosErrorData
        name: ErrorType.HTTP_CLIENT
        httpStatus: StatusCodes
        error: AxiosError
    }

    describe('[INTERFACES]', () => {
        it('should verify IAxiosErrorData interface types', () => {
            expectTypeOf<IAxiosErrorData>().toEqualTypeOf<IAxiosErrorData_Test>()
        })

        it('should verify IHttpClientError interface types', () => {
            expectTypeOf<IHttpClientError>().toEqualTypeOf<IHttpClientError_Test>()
        })
    })

    describe('[CLASS]', () => {
        describe('[CONSTRUCTOR]', () => {
            it('should correctly handle constructor parameters types', () => {
                expectTypeOf(HttpClientError).toBeConstructibleWith(errorMsg, {} as AxiosError)
            })
        })

        describe('[INSTANCE]', () => {
            it('should verify instance type', () => {
                const httpClientError: IHttpClientError = new HttpClientError(
                    errorMsg, {} as AxiosError
                )

                expectTypeOf(httpClientError).toEqualTypeOf<IHttpClientError_Test>()
            })
        })
    })
})