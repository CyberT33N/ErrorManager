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

describe('[UNIT TEST] - src/errors/HttpClientError.ts', () => {
    const errorMsg = 'test'

    it('should be instance of CoreError', () => {
        const httpClientError: IHttpClientError = new HttpClientError(errorMsg, {} as AxiosError)
        expect(httpClientError).toBeInstanceOf(Error)
        expect(httpClientError).toBeInstanceOf(CoreError)
        expect(httpClientError).toBeInstanceOf(HttpClientError)
    })

    it('should have correct default properties and use fallback for status code', () => {
        // Simulate invalid Axios Error without status for testing fallback
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

        const httpClientError: IHttpClientError = new HttpClientError(errorMsg, axiosError)

        expect(httpClientError.name).toBe(ErrorType.HTTP_CLIENT)
        expect(httpClientError.httpStatus).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(httpClientError.message).toBe(errorMsg)
        expect(httpClientError.error).toEqual(axiosError)
    
        const { data } = httpClientError
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

        beforeAll(() => {
            const app = express()

            app.get('/found', () => {
                throw new Error(errorMsg)
            })

            app.use(errorMiddleware)

            server = app.listen(PORT)
            console.log(`Server is running on port ${PORT}`)
        })

        afterAll(() => {
            server.close()
        })

        it('should create new HttpClientError with original axios error', async() => {
            try {
                await axios.get(url)
                assert.fail('This line should not be reached')
            } catch (err) {
                if (err instanceof AxiosError) {
                    const httpClientError: IHttpClientError = new HttpClientError(
                        errorMsg, err
                    )

                    expect(httpClientError.httpStatus).toBe(err?.response?.status)
                    expect(httpClientError?.error).toBe(err)

                    const { data } = httpClientError
                    expect(data.errorMessage).toBe(err.message)
                    expect(data.headers).toBe(err?.config?.headers)
                    expect(data.method).toBe(err?.config?.method)
                    expect(data.payload).toBe(err?.config?.data)
                    expect(data.responseData).toBe(err?.response?.data)
                    expect(data.url).toBe(err?.config?.url)

                    return
                }

                assert.fail('Error should be instance of Error')
            }
        })
    })
})