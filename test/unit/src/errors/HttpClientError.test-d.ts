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
import type { ICoreError } from '@/src/errors/CoreError'

/**
 * 🧪 Describes the type tests for HttpClientError in the src/errors directory.
 */
describe('[TYPE TEST] - src/errors/HttpClientError.ts', () => {
    const errorMsg = 'test'

    /**
     * 📄 Interface for testing Axios error data structure.
     * 
     * @interface IAxiosErrorData_Test
     * @property {string | undefined} url - The URL associated with the error, if available.
     * @property {string | undefined} method - The HTTP method used, if available.
     * @property {unknown} payload - The payload sent with the request.
     * @property {AxiosResponseHeaders | undefined} headers - The headers of the response, if available.
     * @property {unknown} responseData - The data received in the response.
     * @property {string} errorMessage - A descriptive error message.
     */
    interface IAxiosErrorData_Test {
        url: string | undefined
        method: string | undefined
        payload: unknown
        headers: AxiosResponseHeaders | undefined;
        responseData: unknown
        errorMessage: string
    }

    /**
     * 📄 Interface for testing HTTP client error structure.
     * 
     * @interface IHttpClientError_Test
     * @extends {ICoreError}
     * @property {IAxiosErrorData} data - Data specific to the Axios error.
     * @property {ErrorType.HTTP_CLIENT} name - Name of the error type.
     * @property {StatusCodes} httpStatus - HTTP status code associated with the error.
     * @property {AxiosError} error - The Axios error object.
     */
    interface IHttpClientError_Test extends ICoreError {
        data: IAxiosErrorData
        name: ErrorType.HTTP_CLIENT
        httpStatus: StatusCodes
        error: AxiosError
    }

    /**
     * 🧪 Group for testing interface types.
     */
    describe('[INTERFACES]', () => {
        it('🔍 should verify IAxiosErrorData interface types', () => {
            expectTypeOf<IAxiosErrorData>().toEqualTypeOf<IAxiosErrorData_Test>()
        })

        it('🔍 should verify IHttpClientError interface types', () => {
            expectTypeOf<IHttpClientError>().toEqualTypeOf<IHttpClientError_Test>()
        })
    })

    /**
     * 🧪 Group for testing the HttpClientError class.
     */
    describe('[CLASS]', () => {
        /**
         * 🏗️ Group for testing the constructor of the HttpClientError class.
         */
        describe('[CONSTRUCTOR]', () => {
            it('🔍 should correctly handle constructor parameters types', () => {
                expectTypeOf(HttpClientError).toBeConstructibleWith(errorMsg, {} as AxiosError)
            })
        })

        /**
         * 🏗️ Group for testing instance methods and properties of HttpClientError.
         */
        describe('[INSTANCE]', () => {
            it('🔍 should verify instance type', () => {
                const httpClientError: IHttpClientError = new HttpClientError(
                    errorMsg, {} as AxiosError
                )

                expectTypeOf(httpClientError).toEqualTypeOf<IHttpClientError_Test>()
            })
        })
    })
})
