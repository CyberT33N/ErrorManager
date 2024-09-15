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

// ==== DEPENDENCIES ====
import axios, { AxiosError } from 'axios'

// ==== VITEST ====
import { describe, it, expect } from 'vitest'

// ==== ENUM ====
import { HttpStatus, ErrorType } from '@/src/index'

import { ServerDetails, ErrorDetails } from '@/test/integration/pretestAll.d'
const { BASE_URL } = ServerDetails
const { errorTitle, errorMessage } = ErrorDetails

// ==== INTERFACES ====
import { ErrorDataInterface } from '@/src/index'
 
describe('[INTEGRATION] - src/errors/RuntimeError', () => {
    it('should return 500 with RuntimeError details', async() => {
        try {
            await axios.get(`${BASE_URL}/runtime-error`)
            throw new Error('Runtime Error Test - This should not be called')
        } catch (e: unknown) {
            const { response } = e as AxiosError

            expect(response?.status).to.equal(HttpStatus.INTERNAL_SERVER_ERROR)

            const data = response?.data as ErrorDataInterface

            expect(data).to.include({
                title: errorTitle,
                environment: process.env.npm_lifecycle_event,
                name: ErrorType.RUNTIME,
                error: `Error: ${errorMessage}`
            })
        }
    })
})