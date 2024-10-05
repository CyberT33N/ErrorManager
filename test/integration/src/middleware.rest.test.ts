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
import { describe, it, expect, assert, expectTypeOf } from 'vitest'

import type { IErrorResponseSanitized } from '@/src/middleware'

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import { ServerDetails, ErrorDetails } from '@/test/integration/pretestAll'

describe('[INTEGRATION] - src/middleware.ts', () => {
    const { BASE_URL } = ServerDetails
    const { errorMessageOriginal } = ErrorDetails

    it('should throw a normal javascript error instead of custom error', async() => {
        try {
            await axios.get(`${BASE_URL}/normal-error`)
            assert.fail('This line should not be reached')
        } catch (err) {
            if (err instanceof AxiosError) {
                expect(err.message).to.equal('Request failed with status code 500')
                expect(err.status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)

                const data: IErrorResponseSanitized = err.response?.data
                expectTypeOf(data).toEqualTypeOf<IErrorResponseSanitized>()

                expect(data.environment).to.equal(process.env.npm_lifecycle_event)
                expect(data.name).to.equal(ErrorType.DEFAULT)
                expect(data.message).to.equal(errorMessageOriginal)

                expect(data.stack).toBeDefined()
                expect(data.timestamp).toBeDefined()

                expect(data.error).toBeUndefined()
                expect(data.httpStatus).toBeUndefined()

                return
            }

            assert.fail('This line should not be reached')
        }
    })
})