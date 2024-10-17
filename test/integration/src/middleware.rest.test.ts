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

import type { IErrorResponseSanitized } from '@/src/middleware'
import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import { ServerDetails, ErrorDetails } from '@/test/integration/pretestAll'

/**
 * @description Integration tests for the middleware functionality.
 */
describe('[INTEGRATION] - src/middleware.ts', () => {
    const { BASE_URL } = ServerDetails
    const { errorMessageOriginal } = ErrorDetails

    /**
     * @description Tests that a normal JavaScript error is thrown instead of a custom error.
     */
    it('should throw a normal javascript error instead of custom error', async() => {
        try {
            // 🛰️ Make a GET request to the endpoint that simulates a normal error.
            await axios.get(`${BASE_URL}/normal-error`)
            // ❌ Fail the test if the request succeeds (unexpected behavior).
            assert.fail('This line should not be reached')
        } catch (err) {
            // 🔍 Check if the caught error is an AxiosError.
            if (err instanceof AxiosError) {
                // ✔️ Verify the error message matches the expected failure.
                expect(err.message).to.equal('Request failed with status code 500')
                // ✔️ Check if the status code is INTERNAL_SERVER_ERROR.
                expect(err.status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)

                // 📦 Extract and validate the error response data.
                const data = err.response?.data as IErrorResponseSanitized

                // ✔️ Assert that the environment variable is correctly set.
                expect(data.environment).to.equal(process.env.npm_lifecycle_event)
                // ✔️ Check that the error type is DEFAULT.
                expect(data.name).to.equal(ErrorType.DEFAULT)
                // ✔️ Validate the original error message.
                expect(data.message).to.equal(errorMessageOriginal)

                // ✔️ Ensure that the stack trace is defined.
                expect(data.stack).toBeDefined()
                // ✔️ Ensure that the timestamp is defined.
                expect(data.timestamp).toBeDefined()

                // ✔️ Assert that no error or HTTP status are returned in the response.
                expect(data.error).toBeUndefined()
                expect(data.httpStatus).toBeUndefined()

                return
            }

            // ❌ Fail the test if an unexpected error type is thrown.
            assert.fail('This line should not be reached')
        }
    })
})
