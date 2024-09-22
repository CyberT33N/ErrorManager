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

import axios, { type AxiosError } from 'axios'
import { describe, it, expect, expectTypeOf } from 'vitest'

import type { ValidationErrorInterface } from '@/src/errors/ValidationError'

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import { ServerDetails, ErrorDetails, ErrorData } from '@/test/integration/pretestAll'

describe('[INTEGRATION] - src/errors/ValidationError', () => {
    const { BASE_URL } = ServerDetails
    const { errorMessage, errorMessageOriginal } = ErrorDetails
    const errorData = ErrorData.exampleOne

    it('should return 400 with ValidationError details - error passed', async() => {
        try {
            await axios.get(`${BASE_URL}/validation-error?error=true`)
            throw new Error('Validation Error Test - This should not be called')
        } catch (e: unknown) {
            const { response } = e as AxiosError

            expect(response?.status).to.equal(StatusCodes.BAD_REQUEST)

            const data = response?.data as ValidationErrorInterface
            expectTypeOf(data).toEqualTypeOf<ValidationErrorInterface>()

            expect(data.message).to.equal(errorMessage)
            expect(data.environment).to.equal(process.env.npm_lifecycle_event)
            expect(data.name).to.equal(ErrorType.VALIDATION)
            expect(data.error).to.equal(`Error: ${errorMessageOriginal}`)
            expect(data.httpStatus).to.equal(StatusCodes.BAD_REQUEST)
            expect(data.timestamp).toBeDefined()
            expect(data.stack).toBeDefined()
            expect(data.data).to.be.deep.equal(errorData)
        }
    })

    it('should return 400 with ValidationError details - no error passed', async() => {
        try {
            await axios.get(`${BASE_URL}/validation-error`)
            throw new Error('Validation Error Test - This should not be called')
        } catch (e: unknown) {
            const { response } = e as AxiosError

            expect(response?.status).to.equal(StatusCodes.BAD_REQUEST)

            const data = response?.data as ValidationErrorInterface
            expectTypeOf(data).toEqualTypeOf<ValidationErrorInterface>()

            expect(data.message).to.equal(errorMessage)
            expect(data.environment).to.equal(process.env.npm_lifecycle_event)
            expect(data.name).to.equal(ErrorType.VALIDATION)

            expect(data.timestamp).toBeDefined()
            expect(data.stack).toBeDefined()
            expect(data.error).toBeUndefined()
            expect(data.data).to.be.deep.equal(errorData)
        }
    })
})