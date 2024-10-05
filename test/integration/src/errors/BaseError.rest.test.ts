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
import { describe, it, expect, expectTypeOf, assert } from 'vitest'

import type { IBaseError } from '@/src/errors/BaseError'

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import { ServerDetails, ErrorDetails } from '@/test/integration/pretestAll'

describe('[INTEGRATION] - src/errors/BaseError', () => {
    const { BASE_URL } = ServerDetails
    const { errorMessage, errorMessageOriginal } = ErrorDetails

    it('should return 500 with BaseError details - error passed', async() => {
        try {
            await axios.get(`${BASE_URL}/base-error?error=true`)
            assert.fail('This line should not be reached')
        } catch (err) {
            if (err instanceof AxiosError) {
                expect(err.status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)

                const data: IBaseError = err.response?.data
                expectTypeOf(data).toEqualTypeOf<IBaseError>()

                expect(data.message).to.equal(errorMessage)
                expect(data.environment).to.equal(process.env.npm_lifecycle_event)
                expect(data.name).to.equal(ErrorType.BASE)
                expect(data.error).to.equal(`Error: ${errorMessageOriginal}`)
                expect(data.httpStatus).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)
                expect(data.timestamp).toBeDefined()
                expect(data.stack).toBeDefined()
            
                return
            }

            assert.fail('This line should not be reached')
        }
    })

    it('should return 500 with BaseError details - no error passed', async() => {
        try {
            await axios.get(`${BASE_URL}/base-error`)
            assert.fail('This line should not be reached')
        } catch (err) {
            if (err instanceof AxiosError) {
                expect(err.status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)

                const data: IBaseError = err.response?.data
                expectTypeOf(data).toEqualTypeOf<IBaseError>()

                expect(data.message).to.equal(errorMessage)
                expect(data.environment).to.equal(process.env.npm_lifecycle_event)
                expect(data.name).to.equal(ErrorType.BASE)
                expect(data.httpStatus).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)
                expect(data.error).toBeUndefined()
                expect(data.timestamp).toBeDefined()
                expect(data.stack).toBeDefined()

                return
            }

            assert.fail('This line should not be reached')
        }
    })
})