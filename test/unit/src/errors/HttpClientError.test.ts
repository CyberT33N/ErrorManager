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

// ==== DEPENDENCIES ====
import axios, { AxiosError } from 'axios'

// ==== VITEST ====
import { describe, it, expect } from 'vitest'

// ==== CODE ====
import {
    HttpClientError, HttpClientErrorDataInterface,
    HttpStatus
} from '@/src/index'

describe('[UNIT TEST] - src/errors/HttpClientError.ts', () => {
    const errorMsg = 'test'

    describe('[DEFAULT ERROR]', () => {
        const error = new Error(errorMsg)

        it('should create new Http Client Error with normal not axios error argument', async() => {
            const httpClientError: HttpClientErrorDataInterface = new HttpClientError(
                errorMsg, error as AxiosError
            )

            expect(httpClientError).toBeInstanceOf(HttpClientError)
            expect(httpClientError.name).toBe('HttpClientError')
            expect(httpClientError.title).toBe(errorMsg)
            expect(httpClientError.httpStatus).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
            expect(httpClientError.error).toBeUndefined()

            const { data } = httpClientError

            expect(data.error).toBe(error)
            expect(data.errorMessage).toBe(errorMsg)
            expect(data.headers).toBeUndefined()
            expect(data.method).toBeUndefined()
            expect(data.payload).toBeUndefined()
            expect(data.responseData).toBeUndefined()
            expect(data.url).toBeUndefined()
        })
    })

    describe('[INVALID AXIOS ERROR]', () => {
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
            const httpClientError: HttpClientErrorDataInterface = new HttpClientError(
                errorMsg, axiosError as AxiosError
            )

            expect(httpClientError).toBeInstanceOf(HttpClientError)
            expect(httpClientError.name).toBe('HttpClientError')
            expect(httpClientError.title).toBe(errorMsg)
            expect(httpClientError.httpStatus).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
            expect(httpClientError.error).toBeUndefined()

            const { data } = httpClientError

            expect(data.error).toBeDefined()
            expect(data.errorMessage).toBe(axiosError.message)
            expect(data.headers).toBe(axiosError?.config?.headers)
            expect(data.method).toBe(axiosError?.config?.method)
            expect(data.payload).toBe(axiosError?.config?.data)
            expect(data.responseData).toBe(axiosError?.response?.data)
            expect(data.url).toBe(axiosError?.config?.url)
        })
    })

    describe('[FOUND]', () => {
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
                status: 403,
                statusText: 'OK',
                headers: {},
                config: {},
                data: {
                    message: 'Hello World!'
                }
            }
        } as AxiosError
        
        it('should create new Http Client Error without error argument', async() => {
            const httpClientError: HttpClientErrorDataInterface = new HttpClientError(
                errorMsg, axiosError as AxiosError
            )

            expect(httpClientError).toBeInstanceOf(HttpClientError)
            expect(httpClientError.name).toBe('HttpClientError')
            expect(httpClientError.title).toBe(errorMsg)
            expect(httpClientError.httpStatus).toBe(axiosError?.response?.status)
            expect(httpClientError.error).toBeUndefined()

            const { data } = httpClientError

            expect(data.error).toBeDefined()
            expect(data.errorMessage).toBe(axiosError.message)
            expect(data.headers).toBe(axiosError?.config?.headers)
            expect(data.method).toBe(axiosError?.config?.method)
            expect(data.payload).toBe(axiosError?.config?.data)
            expect(data.responseData).toBe(axiosError?.response?.data)
            expect(data.url).toBe(axiosError?.config?.url)
        })
    })

    describe('[ENOTFOUND]', () => {
        const host = 'localhost.not.found'
        const url = `http://${host}:1337/notFound`
            
        it('should create new Http Client Error with error argument', async() => {
            try {
                await axios.get(url)
                throw new Error('HttpClient Error Test - This should not be called')
            } catch (e: unknown) {
                const httpClientError: HttpClientErrorDataInterface = new HttpClientError(errorMsg, e as AxiosError)
                expect(httpClientError).toBeInstanceOf(HttpClientError)
                expect(httpClientError.name).toBe('HttpClientError')
                expect(httpClientError.title).toBe(errorMsg)
                expect(httpClientError.httpStatus).toBe(500)
                expect(httpClientError.error).toBeUndefined()

                const { data } = httpClientError

                expect(data.error.message).toBe(`getaddrinfo ENOTFOUND ${host}`)
                expect(data.errorMessage).toBeDefined()
                expect(data.headers).toBeDefined()
                expect(data.method).to.be.equal('get')
                expect(data.responseData).toBeUndefined()
                expect(data.url).toBe(url)
            }
        })
    })
})