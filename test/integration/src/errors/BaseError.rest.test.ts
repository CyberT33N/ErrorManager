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

import type { BaseErrorInterface } from '@/src/errors/BaseError'

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import { ServerDetails, ErrorDetails } from '@/test/integration/pretestAll'

describe('[INTEGRATION] - src/errors/BaseError', () => {
    const { BASE_URL } = ServerDetails
    const { errorMessage, errorMessageOriginal } = ErrorDetails

    it('should return 500 with BaseError details - error passed', async() => {
        try {
            await axios.get(`${BASE_URL}/base-error?error=true`)
            throw new Error('Base Error Test - This should not be called')
        } catch (e: unknown) {
            const { response } = e as AxiosError
            expect(response?.status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)

            const data = response?.data as BaseErrorInterface
            expectTypeOf(data).toEqualTypeOf<BaseErrorInterface>()

            expect(data.message).to.equal(errorMessage)
            expect(data.environment).to.equal(process.env.npm_lifecycle_event)
            expect(data.name).to.equal(ErrorType.BASE)
            expect(data.error).to.equal(`Error: ${errorMessageOriginal}`)
            expect(data.httpStatus).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)
            expect(data.timestamp).toBeDefined()
            expect(data.stack).toBeDefined()
        }
    })

    it('should return 500 with BaseError details - no error passed', async() => {
        try {
            await axios.get(`${BASE_URL}/base-error`)
            throw new Error('Base Error Test - This should not be called')
        } catch (e: unknown) {
            const { response } = e as AxiosError
            expect(response?.status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)

            const data = response?.data as BaseErrorInterface
            expectTypeOf(data).toEqualTypeOf<BaseErrorInterface>()

            expect(data.message).to.equal(errorMessage)
            expect(data.environment).to.equal(process.env.npm_lifecycle_event)
            expect(data.name).to.equal(ErrorType.BASE)
            expect(data.httpStatus).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)
            expect(data.error).toBeUndefined()
            expect(data.timestamp).toBeDefined()
            expect(data.stack).toBeDefined()
        }
    })
})