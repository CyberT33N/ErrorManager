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
    const { errorMessage } = ErrorDetails

    it('should throw a normal javascript error instead of custom error', async() => {
        try {
            await axios.get(`${BASE_URL}/normal-error`)
            throw new Error('Middleware Error Test - This should not be called')
        } catch (e: unknown) {
            const { response } = e as AxiosError
            expect(response?.status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)

            const data = response?.data as ErrorResponseSanitizedInterface

            expect(data).to.include({
                environment: process.env.npm_lifecycle_event,
                name: ErrorType.DEFAULT,
                message: errorMessage
            })

            expect(data.timestamp).toBeDefined()
            expect(data.error).toBeUndefined()
        }
    })
})