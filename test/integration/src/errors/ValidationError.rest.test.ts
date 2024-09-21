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
import { describe, it, expect } from 'vitest'

import type { CoreErrorInterface } from '@/src/errors/CoreError'

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import { ServerDetails, ErrorDetails, ErrorData } from '@/test/integration/pretestAll'

describe('[INTEGRATION] - src/errors/ValidationError', () => {
    const { BASE_URL } = ServerDetails
    const { errorMessage } = ErrorDetails
    const errorData = ErrorData.exampleOne

    it('should return 400 with ValidationError details - error passed', async() => {
        try {
            await axios.get(`${BASE_URL}/validation-error?error=true`)
            throw new Error('Validation Error Test - This should not be called')
        } catch (e: unknown) {
            const { response } = e as AxiosError

            expect(response?.status).to.equal(StatusCodes.BAD_REQUEST)

            const data = response?.data as CoreErrorInterface

            expect(data).to.include({
                message: errorMessage,
                environment: process.env.npm_lifecycle_event,
                name: ErrorType.VALIDATION,
                error: `Error: ${errorMessage}`
            })

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

            const data = response?.data as CoreErrorInterface

            expect(data).to.include({
                message: errorMessage,
                environment: process.env.npm_lifecycle_event,
                name: ErrorType.VALIDATION
            })

            expect(data).to.not.include({
                error: `Error: ${errorMessage}`
            })

            expect(data.data).to.be.deep.equal(errorData)
        }
    })
})