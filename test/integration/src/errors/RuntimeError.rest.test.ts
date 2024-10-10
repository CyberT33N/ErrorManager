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

import axios, { AxiosError } from 'axios'
import { describe, it, expect, assert } from 'vitest'

import type { IRuntimeError } from '@/src/errors/RuntimeError'

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import { ServerDetails, ErrorDetails } from '@/test/integration/pretestAll'

describe('[INTEGRATION] - src/errors/RuntimeError', () => {
    const { BASE_URL } = ServerDetails
    const { errorMessage, errorMessageOriginal } = ErrorDetails

    it('should return 403 with RuntimeError details', async() => {
        try {
            await axios.get(`${BASE_URL}/runtime-error`)
            assert.fail('This line should not be reached')
        } catch (err) {
            if (err instanceof AxiosError) {
                expect(err.status).to.equal(StatusCodes.FORBIDDEN)

                const data = err.response?.data as IRuntimeError

                expect(data.message).to.equal(errorMessage)
                expect(data.environment).to.equal(process.env.npm_lifecycle_event)
                expect(data.name).to.equal(ErrorType.RUNTIME)
                expect(data.error).to.equal(`Error: ${errorMessageOriginal}`)
                expect(data.httpStatus).to.equal(StatusCodes.FORBIDDEN)
                expect(data.timestamp).toBeDefined()

                expect(data.stack).toBeDefined()

                return
            }

            assert.fail('This line should not be reached')
        }
    })
})