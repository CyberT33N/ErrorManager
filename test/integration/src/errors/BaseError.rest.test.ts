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

import type { BaseErrorInterface } from '@/src/errors/BaseError'

import { HttpStatus, ErrorType } from '@/src/index'
import { ServerDetails, ErrorDetails } from '@/test/integration/pretestAll'

describe('[INTEGRATION] - src/errors/BaseError', () => {
    const { BASE_URL } = ServerDetails
    const { errorTitle, errorMessage } = ErrorDetails

    it('should return 500 with BaseError details - error passed', async() => {
        try {
            await axios.get(`${BASE_URL}/base-error?error=true`)
            throw new Error('Base Error Test - This should not be called')
        } catch (e: unknown) {
            const { response } = e as AxiosError
            expect(response?.status).to.equal(HttpStatus.INTERNAL_SERVER_ERROR)

            const data = response?.data as BaseErrorInterface

            expect(data).to.include({
                title: errorTitle,
                environment: process.env.npm_lifecycle_event,
                name: ErrorType.BASE,
                error: `Error: ${errorMessage}`
            })
        }
    })

    it('should return 500 with BaseError details - no error passed', async() => {
        try {
            await axios.get(`${BASE_URL}/base-error`)
            throw new Error('Base Error Test - This should not be called')
        } catch (e: unknown) {
            const { response } = e as AxiosError
            expect(response?.status).to.equal(HttpStatus.INTERNAL_SERVER_ERROR)

            const data = response?.data as BaseErrorInterface

            expect(data).to.include({
                title: errorTitle,
                environment: process.env.npm_lifecycle_event,
                name: ErrorType.BASE
            })

            expect(data).to.not.include({
                error: `Error: ${errorMessage}`
            })
        }
    })
})