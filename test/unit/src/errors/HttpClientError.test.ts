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
import { describe, it, expect, expectTypeOf, beforeAll, afterAll } from 'vitest'

import express from 'express'
import 'express-async-errors'

import { Server } from 'http'

import errorMiddleware from '@/src/middleware'

import { HttpClientError } from '@/src/index'

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import type { HttpClientErrorInterface } from '@/src/errors/HttpClientError'

describe('[UNIT TEST] - src/errors/HttpClientError.ts', () => {
    const errorMsg = 'test'

    describe('[FALLBACK]', () => {
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
        
        it('should create new Http Client Error and use fallback for status code', async() => {
            const httpClientError: HttpClientErrorInterface = new HttpClientError(
                errorMsg, axiosError
            )

            expectTypeOf(httpClientError).toEqualTypeOf<HttpClientErrorInterface>()

            expect(httpClientError).toBeInstanceOf(HttpClientError)
            expect(httpClientError.name).toBe(ErrorType.HTTP_CLIENT)
            expect(httpClientError.message).toBe(errorMsg)
            expect(httpClientError.httpStatus).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
            expect(httpClientError?.error?.message).toBe(axiosError.message)
            expect(httpClientError.stack).toBeDefined()
            expect(httpClientError.timestamp).toBeDefined()
            expect(httpClientError.environment).toBe(process.env.npm_lifecycle_event)

            const { data } = httpClientError
            expect(data.errorMessage).toBe(axiosError.message)
            expect(data.headers).toBe(axiosError?.config?.headers)
            expect(data.method).toBe(axiosError?.config?.method)
            expect(data.payload).toBe(axiosError?.config?.data)
            expect(data.responseData).toBe(axiosError?.response?.data)
            expect(data.url).toBe(axiosError?.config?.url)
        })
    })

    describe('[FOUND]', () => {
        let server: Server

        const PORT = 3871
        const url = `http://localhost:${PORT}/found`

        beforeAll(async() => {
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

        it('should create new HttpClientError with axios error argument', async() => {
            try {
                await axios.get(url)
                throw new Error('HttpClient Error Test - This should not be called')
            } catch (err: unknown) {
                const axiosError = err as AxiosError

                const httpClientError: HttpClientErrorInterface = new HttpClientError(
                    errorMsg, axiosError
                )

                expectTypeOf(httpClientError).toEqualTypeOf<HttpClientErrorInterface>()

                expect(httpClientError).toBeInstanceOf(HttpClientError)
                expect(httpClientError.name).toBe(ErrorType.HTTP_CLIENT)
                expect(httpClientError.message).toBe(errorMsg)
                expect(httpClientError.httpStatus).toBe(axiosError?.response?.status)
                expect(httpClientError?.error).toBe(axiosError)
                expect(httpClientError.stack).toBeDefined()
                expect(httpClientError.timestamp).toBeDefined()
                expect(httpClientError.environment).toBe(process.env.npm_lifecycle_event)

                const { data } = httpClientError
                expect(data.errorMessage).toBe(axiosError.message)
                expect(data.headers).toBe(axiosError?.config?.headers)
                expect(data.method).toBe(axiosError?.config?.method)
                expect(data.payload).toBe(axiosError?.config?.data)
                expect(data.responseData).toBe(axiosError?.response?.data)
                expect(data.url).toBe(axiosError?.config?.url)
            }
        })
    })

    describe('[ENOTFOUND]', () => {
        const host = 'localhost.not.found'
        const url = `http://${host}:1337/notFound`
            
        it('should create new Http Client Error with error argument - ENOTFOUND', async() => {
            try {
                await axios.get(url)
                throw new Error('HttpClient Error Test - This should not be called')
            } catch (err: unknown) {
                const axiosError = err as AxiosError
                const httpClientError: HttpClientErrorInterface = new HttpClientError(errorMsg, axiosError)

                expectTypeOf(httpClientError).toEqualTypeOf<HttpClientErrorInterface>()

                expect(httpClientError).toBeInstanceOf(HttpClientError)
                expect(httpClientError.name).toBe(ErrorType.HTTP_CLIENT)
                expect(httpClientError.message).toBe(errorMsg)
                expect(httpClientError.httpStatus).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
                expect(httpClientError?.error).toBe(axiosError)
                expect(httpClientError?.error?.message).toBe(`getaddrinfo ENOTFOUND ${host}`)
                expect(httpClientError.stack).toBeDefined()
                expect(httpClientError.timestamp).toBeDefined()
                expect(httpClientError.environment).toBe(process.env.npm_lifecycle_event)

                const { data } = httpClientError
                expect(data.errorMessage).toBeDefined()
                expect(data.headers).toBeDefined()
                expect(data.method).to.be.equal('get')
                expect(data.responseData).toBeUndefined()
                expect(data.url).toBe(url)
            }
        })
    })
})