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

import type { IBaseError } from '@/src/errors/BaseError'

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import { ServerDetails, ErrorDetails } from '@/test/integration/pretestAll'

/**
 * @description This module contains integration tests for the BaseError handling.
 */
describe('[INTEGRATION] - src/errors/BaseError', () => {
    const { BASE_URL } = ServerDetails
    const { errorMessage, errorMessageOriginal } = ErrorDetails

    /**
     * @test
     * @description Tests that the BaseError details are correctly returned when an error is passed.
     */
    it('should return 500 with BaseError details - error passed', async() => {
        try {
            // 📡 Sending GET request to trigger BaseError
            await axios.get(`${BASE_URL}/base-error?error=true`)
            // ❌ Failing the test if no error is thrown
            assert.fail('This line should not be reached')
        } catch (err) {
            // 🔍 Checking if the caught error is an instance of AxiosError
            if (err instanceof AxiosError) {
                // ✅ Asserting that the error status is 500 (Internal Server Error)
                expect(err.status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)

                // 📄 Extracting error data from the response
                const data = err.response?.data as IBaseError
                // ✅ Validating the error message returned
                expect(data.message).to.equal(errorMessage)
                // ✅ Validating the environment variable is set correctly
                expect(data.environment).to.equal(process.env.npm_lifecycle_event)
                // ✅ Validating the error name matches the expected ErrorType
                expect(data.name).to.equal(ErrorType.BASE)
                // ✅ Validating the error string returned
                expect(data.error).to.equal(`Error: ${errorMessageOriginal}`)
                // ✅ Validating the HTTP status code returned
                expect(data.httpStatus).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)
                // ✅ Ensuring the timestamp is defined
                expect(data.timestamp).toBeDefined()
                // ✅ Ensuring the stack trace is defined
                expect(data.stack).toBeDefined()

                return
            }

            // ❌ Failing the test if the error type is not AxiosError
            assert.fail('This line should not be reached')
        }
    })

    /**
     * @test
     * @description Tests that the BaseError details are correctly returned when no error is passed.
     */
    it('should return 500 with BaseError details - no error passed', async() => {
        try {
            // 📡 Sending GET request to retrieve BaseError without error flag
            await axios.get(`${BASE_URL}/base-error`)
            // ❌ Failing the test if no error is thrown
            assert.fail('This line should not be reached')
        } catch (err) {
            // 🔍 Checking if the caught error is an instance of AxiosError
            if (err instanceof AxiosError) {
                // ✅ Asserting that the error status is 500 (Internal Server Error)
                expect(err.status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)

                // 📄 Extracting error data from the response
                const data = err.response?.data as IBaseError
                // ✅ Validating the error message returned
                expect(data.message).to.equal(errorMessage)
                // ✅ Validating the environment variable is set correctly
                expect(data.environment).to.equal(process.env.npm_lifecycle_event)
                // ✅ Validating the error name matches the expected ErrorType
                expect(data.name).to.equal(ErrorType.BASE)
                // ✅ Validating that no error string is returned
                expect(data.error).toBeUndefined()
                // ✅ Ensuring the timestamp is defined
                expect(data.timestamp).toBeDefined()
                // ✅ Ensuring the stack trace is defined
                expect(data.stack).toBeDefined()

                return
            }

            // ❌ Failing the test if the error type is not AxiosError
            assert.fail('This line should not be reached')
        }
    })
})
