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

import { ServerDetails } from '@/test/integration/pretestAll.d'
const { BASE_URL } = ServerDetails

// ==== INTERFACES ====
import { BaseErrorInterface } from '@/src/index'
 
describe('[INTEGRATION] - src/middleware.ts', () => {
    it('should throw a normal error', async() => {
        try {
            await axios.get(`${BASE_URL}/normal-error`)
            throw new Error('Middleware Error Test - This should not be called')
        } catch (e: unknown) {
            const { response } = e as AxiosError
            expect(response?.status).to.equal(HttpStatus.INTERNAL_SERVER_ERROR)

            const data = response?.data as BaseErrorInterface

            expect(data).to.include({
                environment: process.env.npm_lifecycle_event,
                name: ErrorType.DEFAULT
            })

            expect(data.title).toBeUndefined()
            expect(data.error).toBeUndefined()
        }
    })
})