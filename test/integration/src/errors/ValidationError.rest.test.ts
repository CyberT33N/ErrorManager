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

import type { IValidationError } from '@/src/errors/ValidationError'

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import { ServerDetails, ErrorDetails, ErrorData } from '@/test/integration/pretestAll'

/**
 * @description Integration tests for validation error handling in the application.
 */
describe('[INTEGRATION] - src/errors/ValidationError', () => {
    const { BASE_URL } = ServerDetails
    const { errorMessage, errorMessageOriginal } = ErrorDetails
    const errorData = ErrorData.exampleOne

    /**
     * @description Tests if the API returns a 400 status code with validation error details 
     * when an error is passed in the query parameters.
     */
    it('should return 400 with ValidationError details - error passed', async() => {
        try {
            // 🚀 Sending GET request to the validation error endpoint with error=true
            await axios.get(`${BASE_URL}/validation-error?error=true`)
            assert.fail('This line should not be reached')
        } catch (err) {
            // 🔍 Checking if the caught error is an AxiosError instance
            if (err instanceof AxiosError) {
                // ✅ Expecting the status code to be BAD_REQUEST (400)
                expect(err.status).to.equal(StatusCodes.BAD_REQUEST)

                // 🛠️ Extracting the response data as IValidationError type
                const data = err.response?.data as IValidationError

                // 📜 Validating the response data fields
                expect(data.message).to.equal(errorMessage)
                expect(data.environment).to.equal(process.env.npm_lifecycle_event)
                expect(data.name).to.equal(ErrorType.VALIDATION)
                expect(data.error).to.equal(`Error: ${errorMessageOriginal}`)
                expect(data.httpStatus).to.equal(StatusCodes.BAD_REQUEST)
                expect(data.timestamp).toBeDefined()
                expect(data.stack).toBeDefined()
                expect(data.data).to.be.deep.equal(errorData)

                return
            }

            // ❌ Failing the assertion if the error is not an AxiosError
            assert.fail('This line should not be reached')
        }
    })

    /**
     * @description Tests if the API returns a 400 status code with validation error details 
     * when no error is passed in the query parameters.
     */
    it('should return 400 with ValidationError details - no error passed', async() => {
        try {
            // 🚀 Sending GET request to the validation error endpoint without any query parameters
            await axios.get(`${BASE_URL}/validation-error`)
            assert.fail('This line should not be reached')
        } catch (err) {
            // 🔍 Checking if the caught error is an AxiosError instance
            if (err instanceof AxiosError) {
                // ✅ Expecting the status code to be BAD_REQUEST (400)
                expect(err.status).to.equal(StatusCodes.BAD_REQUEST)

                // 🛠️ Extracting the response data as IValidationError type
                const data = err.response?.data as IValidationError

                // 📜 Validating the response data fields
                expect(data.message).to.equal(errorMessage)
                expect(data.environment).to.equal(process.env.npm_lifecycle_event)
                expect(data.name).to.equal(ErrorType.VALIDATION)

                expect(data.timestamp).toBeDefined()
                expect(data.stack).toBeDefined()
                expect(data.error).toBeUndefined()
                expect(data.data).to.be.deep.equal(errorData)

                return
            }

            // ❌ Failing the assertion if the error is not an AxiosError
            assert.fail('This line should not be reached')
        }
    })
})
