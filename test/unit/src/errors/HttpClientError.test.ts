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
import { HttpClientError, HttpClientErrorDataInterface } from '../../../../src/index'

describe('[UNIT TEST] - src/errors/HttpClientError.ts', () => {
    const errorMsg = 'test'
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
            expect(httpClientError.e).toBeUndefined()

            const { data } = httpClientError

            expect(data.config).toBeDefined()
            expect(data.e.message).toBe(`getaddrinfo ENOTFOUND ${host}`)
            expect(data.errorMessage).toBeDefined()
            expect(data.headers).toBeUndefined()
            expect(data.method).to.be.equal('get')
            expect(data.responseData).toBeUndefined()
            expect(data.url).toBe(url)
        }
    })
})