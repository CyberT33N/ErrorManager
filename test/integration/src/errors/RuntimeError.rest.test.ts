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

import type { ErrorDataInterface } from '@/src/index'

import { HttpStatus, ErrorType } from '@/src/index'
import { ServerDetails, ErrorDetails } from '@/test/integration/pretestAll'

describe('[INTEGRATION] - src/errors/RuntimeError', () => {
    const { BASE_URL } = ServerDetails
    const { errorMessage } = ErrorDetails

    it('should return 500 with RuntimeError details', async() => {
        try {
            await axios.get(`${BASE_URL}/runtime-error`)
            throw new Error('Runtime Error Test - This should not be called')
        } catch (e: unknown) {
            const { response } = e as AxiosError

            expect(response?.status).to.equal(HttpStatus.INTERNAL_SERVER_ERROR)

            const data = response?.data as ErrorDataInterface

            expect(data).to.include({
                message: errorMessage,
                environment: process.env.npm_lifecycle_event,
                name: ErrorType.RUNTIME,
                error: `Error: ${errorMessage}`
            })
        }
    })
})