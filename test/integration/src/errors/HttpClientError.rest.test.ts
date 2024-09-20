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

import type { HttpClientErrorDataInterface } from '@/src/errors/HttpClientError'
 
import { HttpStatus, ErrorType } from '@/src/index'
import { ServerDetails, ErrorDetails } from '@/test/integration/pretestAll'

describe('[INTEGRATION] - src/errors/HttpClientError', () => {
    const { BASE_URL } = ServerDetails
    const { errorTitle } = ErrorDetails

    it('should return 404 with HttpClientError details', async() => {
        try {
            await axios.get(`${BASE_URL}/httpclient-error`)
            throw new Error('HttpClient Error Test - This should not be called')
        } catch (e: unknown) {
            const { response } = e as AxiosError
            
            expect(response?.status).to.equal(HttpStatus.NOT_FOUND)

            const data = response?.data as HttpClientErrorDataInterface

            expect(data).to.include({
                title: errorTitle,
                environment: process.env.npm_lifecycle_event,
                name: ErrorType.HTTP_CLIENT,
                error: 'AxiosError: Request failed with status code 404'
            })

            expect(data.data.errorMessage).toBeDefined()
            expect(data.data.headers).toBeDefined()
            expect(data.data.method).to.be.equal('get')
            expect(data.data.responseData).toBeDefined()
            expect(data.data.url).toBe(BASE_URL + '/notFound')
        }
    })
})