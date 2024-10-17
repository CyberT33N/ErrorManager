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

import type { IResourceNotFoundError } from '@/src/errors/ResourceNotFoundError'

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import { ServerDetails, ErrorDetails, ErrorData } from '@/test/integration/pretestAll'

/**
 * @description Integration tests for handling Resource Not Found errors.
 * This module tests the error handling for a resource that does not exist.
 */
describe('[INTEGRATION] - src/errors/ResourceNotFoundError', () => {
    // 🚀 Base URL for API calls
    const { BASE_URL } = ServerDetails
    // 📝 Error message details
    const { errorMessage, errorMessageOriginal } = ErrorDetails
    // 📊 Example error data
    const errorData = ErrorData.exampleOne

    /**
     * @test
     * @description Should return 404 with ResourceNotFoundError details when an error occurs.
     */
    it('should return 404 with ResourceNotFoundError details - with error', async() => {
        try {
            // 🔗 Attempt to fetch a resource that is not found
            await axios.get(`${BASE_URL}/resource-not-found?error=true`)
            // ❌ Fail if this line is reached, indicating a successful request
            assert.fail('This line should not be reached')
        } catch (err) {
            // 🔍 Check if the error is an AxiosError
            if (err instanceof AxiosError) {
                // ✅ Validate that the error status is 404
                expect(err.status).to.equal(StatusCodes.NOT_FOUND)

                // 📦 Extract data from the error response
                const data = err.response?.data as IResourceNotFoundError

                // ✅ Validate that the error response matches expected details
                expect(data.message).to.equal(errorMessage)
                expect(data.environment).to.equal(process.env.npm_lifecycle_event)
                expect(data.name).to.equal(ErrorType.RESOURCE_NOT_FOUND)
                expect(data.error).to.equal(`Error: ${errorMessageOriginal}`)
                expect(data.httpStatus).to.equal(StatusCodes.NOT_FOUND)

                // ✅ Ensure timestamp and stack trace are defined
                expect(data.timestamp).toBeDefined()
                expect(data.stack).toBeDefined()

                // ✅ Validate that the returned data matches expected error data
                expect(data.data).to.be.deep.equal(errorData)

                return
            }

            // ❌ Fail if the error is not an AxiosError
            assert.fail('This line should not be reached')
        }
    })

    /**
     * @test
     * @description Should return 404 with ResourceNotFoundError details when no error occurs.
     */
    it('should return 404 with ResourceNotFoundError details - without error', async() => {
        try {
            // 🔗 Attempt to fetch a resource that is not found
            await axios.get(`${BASE_URL}/resource-not-found`)
            // ❌ Fail if this line is reached, indicating a successful request
            assert.fail('This line should not be reached')
        } catch (err) {
            // 🔍 Check if the error is an AxiosError
            if (err instanceof AxiosError) {
                // ✅ Validate that the error status is 404
                expect(err.status).to.equal(StatusCodes.NOT_FOUND)

                // 📦 Extract data from the error response
                const data = err.response?.data as IResourceNotFoundError

                // ✅ Validate that the error response matches expected details
                expect(data.message).to.equal(errorMessage)
                expect(data.environment).to.equal(process.env.npm_lifecycle_event)
                expect(data.name).to.equal(ErrorType.RESOURCE_NOT_FOUND)

                // ✅ Ensure stack trace and timestamp are defined
                expect(data.stack).toBeDefined()
                expect(data.timestamp).toBeDefined()
                // 🆗 Ensure error is undefined when no error occurs
                expect(data.error).toBeUndefined()

                // ✅ Validate that the returned data matches expected error data
                expect(data.data).to.be.deep.equal(errorData)

                return
            }

            // ❌ Fail if the error is not an AxiosError
            assert.fail('This line should not be reached')
        }
    })
})
