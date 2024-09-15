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
import { ServerDetails, ErrorDetails, ErrorData } from '../../pretestAll.d'
const { BASE_URL } = ServerDetails
const { errorTitle, errorMessage } = ErrorDetails
const errorData = ErrorData.exampleOne

// ==== INTERFACES ====
import { ErrorDataInterface } from '@/src/index'
 
describe('[INTEGRATION] - src/errors/ResourceNotFoundError', () => {
    it('should return 404 with ResourceNotFoundError details - with error', async() => {
        try {
            await axios.get(`${BASE_URL}/resource-not-found?error=true`)
            throw new Error('Resource Error Test - This should not be called')
        } catch (e: unknown) {
            const { response } = e as AxiosError

            expect(response?.status).to.equal(404)

            const data = response?.data as ErrorDataInterface

            expect(data).to.include({
                title: errorTitle,
                environment: process.env.npm_lifecycle_event,
                name: 'ResourceNotFoundError',
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

            expect(response?.status).to.equal(404)

            const data = response?.data as ErrorDataInterface

            expect(data).to.include({
                title: errorTitle,
                environment: process.env.npm_lifecycle_event,
                name: 'ResourceNotFoundError'
            })

            expect(data).to.not.include({
                error: `Error: ${errorMessage}`
            })

            expect(data.data).to.be.deep.equal(errorData)
        }
    })
})