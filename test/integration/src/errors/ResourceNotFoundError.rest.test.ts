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
import { ServerDetails, ErrorDetails, ErrorData } from '@/test/integration/pretestAll'

describe('[INTEGRATION] - src/errors/ResourceNotFoundError', () => {
    const { BASE_URL } = ServerDetails
    const { errorMessage } = ErrorDetails
    const errorData = ErrorData.exampleOne

    it('should return 404 with ResourceNotFoundError details - with error', async() => {
        try {
            await axios.get(`${BASE_URL}/resource-not-found?error=true`)
            throw new Error('Resource Error Test - This should not be called')
        } catch (e: unknown) {
            const { response } = e as AxiosError

            expect(response?.status).to.equal(HttpStatus.NOT_FOUND)

            const data = response?.data as ErrorDataInterface

            expect(data).to.include({
                message: errorMessage,
                environment: process.env.npm_lifecycle_event,
                name: ErrorType.RESOURCE_NOT_FOUND,
                error: `Error: ${errorMessage}`
            })

            expect(data.data).to.be.deep.equal(errorData)
        }
    })

    it('should return 404 with ResourceNotFoundError details - without error', async() => {
        try {
            await axios.get(`${BASE_URL}/resource-not-found`)
            throw new Error('Resource Error Test - This should not be called')
        } catch (e: unknown) {
            const { response } = e as AxiosError

            expect(response?.status).to.equal(HttpStatus.NOT_FOUND)

            const data = response?.data as ErrorDataInterface

            expect(data).to.include({
                message: errorMessage,
                environment: process.env.npm_lifecycle_event,
                name: ErrorType.RESOURCE_NOT_FOUND
            })

            expect(data).to.not.include({
                error: `Error: ${errorMessage}`
            })

            expect(data.data).to.be.deep.equal(errorData)
        }
    })
})