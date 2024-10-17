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

import type { IRuntimeError } from '@/src/errors/RuntimeError'

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import { ServerDetails, ErrorDetails } from '@/test/integration/pretestAll'

/**
 * @description Integration tests for the RuntimeError handling.
 * This module tests the behavior of RuntimeError when a runtime error occurs.
 */
describe('[INTEGRATION] - src/errors/RuntimeError', () => {
    // 🌐 Base URL for the server from ServerDetails.
    const { BASE_URL } = ServerDetails
    
    // 📝 Error messages from ErrorDetails for comparison in tests.
    const { errorMessage, errorMessageOriginal } = ErrorDetails

    /**
     * @function should return 403 with RuntimeError details
     * @description Tests that a request to the runtime error endpoint returns
     * a 403 status code along with the expected RuntimeError details.
     */
    it('should return 403 with RuntimeError details', async() => {
        try {
            // 📡 Attempt to make a GET request to the runtime error endpoint.
            await axios.get(`${BASE_URL}/runtime-error`)
            
            // ❌ This line should not be reached; fail the test if it is.
            assert.fail('This line should not be reached')
        } catch (err) {
            // 🔍 Check if the caught error is an AxiosError instance.
            if (err instanceof AxiosError) {
                // ✅ Expect the error status to be 403 Forbidden.
                expect(err.status).to.equal(StatusCodes.FORBIDDEN)

                // 📊 Extract the response data as IRuntimeError.
                const data = err.response?.data as IRuntimeError

                // 🎯 Validate the structure and contents of the error response.
                expect(data.message).to.equal(errorMessage)
                expect(data.environment).to.equal(process.env.npm_lifecycle_event)
                expect(data.name).to.equal(ErrorType.RUNTIME)
                expect(data.error).to.equal(`Error: ${errorMessageOriginal}`)
                expect(data.httpStatus).to.equal(StatusCodes.FORBIDDEN)
                expect(data.timestamp).toBeDefined()

                // 🗂️ Ensure the stack trace is defined.
                expect(data.stack).toBeDefined()

                return
            }

            // ❌ Fail the test if the error is not an AxiosError.
            assert.fail('This line should not be reached')
        }
    })
})
