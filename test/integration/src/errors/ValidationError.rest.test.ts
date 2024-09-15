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
import { ServerDetails, ErrorDetails, ErrorData } from '@/test/integration/pretestAll.d'
const { BASE_URL } = ServerDetails
const { errorTitle, errorMessage } = ErrorDetails
const errorData = ErrorData.exampleOne

// ==== INTERFACES ====
import { ErrorDataInterface } from '@/src/index'
 
describe('[INTEGRATION] - src/errors/ValidationError', () => {
    it('should return 400 with ValidationError details - error passed', async() => {
        try {
            await axios.get(`${BASE_URL}/validation-error?error=true`)
            throw new Error('Validation Error Test - This should not be called')
        } catch (e: unknown) {
            const { response } = e as AxiosError

            expect(response?.status).to.equal(400)

            const data = response?.data as ErrorDataInterface

            expect(data).to.include({
                title: errorTitle,
                environment: process.env.npm_lifecycle_event,
                name: 'ValidationError',
                error: `Error: ${errorMessage}`
            })

            expect(data.data).to.be.deep.equal(errorData)
        }
    })

    it('should return 400 with ValidationError details - no error passed', async() => {
        try {
            await axios.get(`${BASE_URL}/validation-error`)
            throw new Error('Validation Error Test - This should not be called')
        } catch (e: unknown) {
            const { response } = e as AxiosError

            expect(response?.status).to.equal(400)

            const data = response?.data as ErrorDataInterface

            expect(data).to.include({
                title: errorTitle,
                environment: process.env.npm_lifecycle_event,
                name: 'ValidationError'
            })

            expect(data).to.not.include({
                error: `Error: ${errorMessage}`
            })

            expect(data.data).to.be.deep.equal(errorData)
        }
    })
})