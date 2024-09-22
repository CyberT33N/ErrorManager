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

import type { ErrorResponseSanitizedInterface } from '@/src/middleware'

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import { ServerDetails, ErrorDetails } from '@/test/integration/pretestAll'

describe('[INTEGRATION] - src/middleware.ts', () => {
    const { BASE_URL } = ServerDetails
    const { errorMessageOriginal } = ErrorDetails

    it('should throw a normal javascript error instead of custom error', async() => {
        try {
            await axios.get(`${BASE_URL}/normal-error`)
            throw new Error('Middleware Error Test - This should not be called')
        } catch (e: unknown) {
            const { response } = e as AxiosError
            expect(response?.status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)

            const data = response?.data as ErrorResponseSanitizedInterface

            expect(data.environment).to.equal(process.env.npm_lifecycle_event)
            expect(data.name).to.equal(ErrorType.DEFAULT)
            expect(data.message).to.equal(errorMessageOriginal)

            expect(data.stack).toBeDefined()
            expect(data.timestamp).toBeDefined()

            expect(data.error).toBeUndefined()
            expect(data.httpStatus).toBeUndefined()
        }
    })
})