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

import axios, { AxiosError } from 'axios'
import {
    describe, it, expect, beforeAll, afterAll, assert
} from 'vitest'
import express from 'express'
import 'express-async-errors'
import { Server } from 'http'
import errorMiddleware from '@/src/middleware'
import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import {
    default as HttpClientError,
    type IHttpClientError
} from '@/src/errors/HttpClientError'
import { default as CoreError } from '@/src/errors/CoreError'

/**
 * @description Unit tests for the `HttpClientError` class.
 */
describe('[UNIT TEST] - src/errors/HttpClientError.ts', () => {
    const errorMsg = 'test'

    /**
     * @description Verify that `HttpClientError` is an instance of `CoreError`.
     */
    it('should be instance of CoreError', () => {
        // 🌟 Create an instance of HttpClientError for testing
        const httpClientError: IHttpClientError = new HttpClientError(errorMsg, {} as AxiosError)

        // ✔️ Check that the instance is of Error type
        expect(httpClientError).toBeInstanceOf(Error)
        // ✔️ Check that the instance is of CoreError type
        expect(httpClientError).toBeInstanceOf(CoreError)
        // ✔️ Check that the instance is of HttpClientError type
        expect(httpClientError).toBeInstanceOf(HttpClientError)
    })

    /**
     * @description Ensure the default properties are set correctly.
     */
    it('should have correct default properties and use fallback for status code', () => {
        // 🔄 Simulate invalid Axios Error without status for testing fallback
        const axiosError = {
            code: 'ERR_BAD_REQUEST',
            config: {
                url: 'http://localhost:1337/found',
                method: 'post',
                headers: {
                    Accept: 'application/json, text/plain, */*'
                },
                data: {
                    name: 'test'
                }
            },
            message: 'Request failed',
            request: {},
            response: {
                statusText: 'OK',
                headers: {},
                config: {},
                data: {
                    message: 'Hello World!'
                }
            }
        } as AxiosError

        // ✏️ Create HttpClientError instance with simulated Axios error
        const httpClientError: IHttpClientError = new HttpClientError(errorMsg, axiosError)

        // ✔️ Check the error name
        expect(httpClientError.name).toBe(ErrorType.HTTP_CLIENT)
        // ✔️ Check the HTTP status
        expect(httpClientError.httpStatus).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
        // ✔️ Check the error message
        expect(httpClientError.message).toBe(errorMsg)
        // ✔️ Verify the stored error
        expect(httpClientError.error).toEqual(axiosError)

        const { data } = httpClientError
        // ✔️ Verify data properties
        expect(data.errorMessage).toBe(axiosError.message)
        expect(data.headers).toBe(axiosError?.config?.headers)
        expect(data.method).toBe(axiosError?.config?.method)
        expect(data.payload).toBe(axiosError?.config?.data)
        expect(data.responseData).toBe(axiosError?.response?.data)
        expect(data.url).toBe(axiosError?.config?.url)
    })

    describe('[ORIGINAL AXIOS ERROR]', () => {
        let server: Server

        const PORT = 3871
        const url = `http://localhost:${PORT}/found`

        /**
         * @description Setup server and endpoint for testing.
         */
        beforeAll(() => {
            const app = express()

            // 🛠️ Define endpoint that throws an error
            app.get('/found', () => {
                throw new Error(errorMsg)
            })

            // 🛡️ Use error middleware for handling errors
            app.use(errorMiddleware)

            // 🎧 Start server
            server = app.listen(PORT)
            console.log(`Server is running on port ${PORT}`)
        })

        /**
         * @description Close the server after tests complete.
         */
        afterAll(() => {
            server.close()
        })

        /**
         * @description Create new HttpClientError with the original Axios error.
         */
        it('should create new HttpClientError with original axios error', async() => {
            try {
                // 🌐 Attempt to fetch the URL
                await axios.get(url)
                assert.fail('This line should not be reached')
            } catch (err) {
                // 🔍 Check if error is an instance of AxiosError
                if (err instanceof AxiosError) {
                    // ✏️ Create HttpClientError with the caught error
                    const httpClientError: IHttpClientError = new HttpClientError(
                        errorMsg, err
                    )

                    // ✔️ Verify HTTP status from the original error
                    expect(httpClientError.httpStatus).toBe(err?.response?.status)
                    // ✔️ Check stored Axios error
                    expect(httpClientError?.error).toBe(err)

                    const { data } = httpClientError
                    // ✔️ Verify data properties
                    expect(data.errorMessage).toBe(err.message)
                    expect(data.headers).toBe(err?.config?.headers)
                    expect(data.method).toBe(err?.config?.method)
                    expect(data.payload).toBe(err?.config?.data)
                    expect(data.responseData).toBe(err?.response?.data)
                    expect(data.url).toBe(err?.config?.url)

                    return
                }

                // ❌ Fail the test if not an instance of Error
                assert.fail('Error should be instance of Error')
            }
        })
    })
})
