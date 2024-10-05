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

import type { IResourceNotFoundError } from '@/src/errors/ResourceNotFoundError'

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '@/src/index'
import { ServerDetails, ErrorDetails, ErrorData } from '@/test/integration/pretestAll'

describe('[INTEGRATION] - src/errors/ResourceNotFoundError', () => {
    const { BASE_URL } = ServerDetails
    const { errorMessage, errorMessageOriginal } = ErrorDetails
    const errorData = ErrorData.exampleOne

    it('should return 404 with ResourceNotFoundError details - with error', async() => {
        try {
            await axios.get(`${BASE_URL}/resource-not-found?error=true`)
            assert.fail('This line should not be reached')
        } catch (err) {
            if (err instanceof AxiosError) {
                expect(err.status).to.equal(StatusCodes.NOT_FOUND)

                const data: IResourceNotFoundError = err.response?.data
                expectTypeOf(data).toEqualTypeOf<IResourceNotFoundError>()

                expect(data.message).to.equal(errorMessage)
                expect(data.environment).to.equal(process.env.npm_lifecycle_event)
                expect(data.name).to.equal(ErrorType.RESOURCE_NOT_FOUND)
                expect(data.error).to.equal(`Error: ${errorMessageOriginal}`)
                expect(data.httpStatus).to.equal(StatusCodes.NOT_FOUND)

                expect(data.timestamp).toBeDefined()
                expect(data.stack).toBeDefined()

                expect(data.data).to.be.deep.equal(errorData)

                return
            }

            assert.fail('This line should not be reached')
        }
    })

    it('should return 404 with ResourceNotFoundError details - without error', async() => {
        try {
            await axios.get(`${BASE_URL}/resource-not-found`)
            assert.fail('This line should not be reached')
        } catch (err) {
            if (err instanceof AxiosError) {
                expect(err.status).to.equal(StatusCodes.NOT_FOUND)

                const data: IResourceNotFoundError = err.response?.data
                expectTypeOf(data).toEqualTypeOf<IResourceNotFoundError>()

                expect(data.message).to.equal(errorMessage)
                expect(data.environment).to.equal(process.env.npm_lifecycle_event)
                expect(data.name).to.equal(ErrorType.RESOURCE_NOT_FOUND)

                expect(data.stack).toBeDefined()
                expect(data.timestamp).toBeDefined()
                expect(data.error).toBeUndefined()

                expect(data.data).to.be.deep.equal(errorData)

                return
            }

            assert.fail('This line should not be reached')
        }
    })
})