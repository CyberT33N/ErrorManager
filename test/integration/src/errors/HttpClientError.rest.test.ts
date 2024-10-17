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
import { describe, it, expect, assert } from 'vitest'

import type { IHttpClientError } from '@/src/errors/HttpClientError'

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import { ServerDetails, ErrorDetails } from '@/test/integration/pretestAll'

/**
 * @description Test suite for the `HttpClientError` handling in the error module.
 * This suite verifies that the `HttpClientError` behaves correctly under various conditions.
 */
describe('[INTEGRATION] - src/errors/HttpClientError', () => {
    const { BASE_URL } = ServerDetails
    const { errorMessage } = ErrorDetails

    /**
     * @test {HttpClientError}
     * @description Should return a 404 status code with the appropriate error details
     * when a request to the `httpclient-error` endpoint is made.
     */
    it('should return 404 with HttpClientError details', async() => {
        try {
            // 📦 Make a GET request to the `httpclient-error` endpoint
            await axios.get(`${BASE_URL}/httpclient-error`)
            // 🚫 Fail the test if no error is thrown
            assert.fail('This line should not be reached')
        } catch (err) {
            // 🔍 Check if the caught error is an AxiosError instance
            if (err instanceof AxiosError) {
                // ✅ Verify that the error status is 404 (Not Found)
                expect(err.status).to.equal(StatusCodes.NOT_FOUND)

                // 📜 Extract the error data from the response
                const data = err.response?.data as IHttpClientError

                // 📝 Validate the error message and details
                expect(data.message).toBe(errorMessage)
                expect(data.environment).toBe(process.env.npm_lifecycle_event)
                expect(data.name).toBe(ErrorType.HTTP_CLIENT)
                expect(data.error).toBe('AxiosError: Request failed with status code 404')
                expect(data.httpStatus).toBe(StatusCodes.NOT_FOUND)
                expect(data.timestamp).toBeDefined()
                expect(data.stack).toBeDefined()

                // 🔧 Validate additional error data details
                expect(data.data.errorMessage).toBeDefined()
                expect(data.data.headers).toBeDefined()
                expect(data.data.method).to.be.equal('get')
                expect(data.data.responseData).toBeDefined()
                expect(data.data.url).toBe(BASE_URL + '/notFound')

                return
            }

            // 🚫 Fail the test if the error is not an AxiosError
            assert.fail('This line should not be reached')
        }
    })
})
