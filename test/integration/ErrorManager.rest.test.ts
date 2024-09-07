// ==== DEPENDENCIES ====
import express from 'express'
import 'express-async-errors'

import axios, { AxiosError } from 'axios'

import { Server } from 'http'

// ==== VITEST ====
import { describe, it, beforeAll, afterAll, expect } from 'vitest'

// ==== INTERFACES ====
import { ErrorDataInterface } from '../../src/errors/index'
import { HttpClientErrorDataInterface } from '../../src/errors/HttpClientError'

// ==== CODE ====
import errorMiddleware from '../../src/middleware'

import {
    BaseError,
    ValidationError,
    RunTimeError,
    ResourceNotFoundError,
    HttpClientError
}  from '../../src/errors/index'

describe('[INTEGRATION TESTS] - ErrorManager', () => {
    let server: Server

    const port = 3876
    const BASE_URL = `http://localhost:${port}`
    const errorTitle = 'Test title'
    const errorMessage = 'Test error'
    const errorData = { field: 'value' }

    beforeAll(() => {
        const app = express()

        // Sample route to trigger BaseError
        app.get('/base-error', req => {
            if (req.query.error) {
                throw new BaseError(errorTitle, new Error(errorMessage))
            } else {
                throw new BaseError(errorTitle)
            }
        })

        // Sample route to trigger ValidationError
        app.get('/validation-error', req => {
            if (req.query.error) {
                throw new ValidationError(errorTitle, errorData, new Error(errorMessage))
            } else {
                throw new ValidationError(errorTitle, errorData)
            }
        })

        // Sample route to trigger HttpClientError
        app.get('/httpclient-error', async() => {
            try {
                await axios.get(`${BASE_URL}/notFound`)
            } catch (e: unknown) {
                throw new HttpClientError(errorTitle, e as AxiosError)
            }
        })
          
        // Sample route to trigger ResourceNotFoundError
        app.get('/resource-not-found', req => {
            if (req.query.error) {
                throw new ResourceNotFoundError(errorTitle, errorData, new Error(errorMessage))
            } else {
                throw new ResourceNotFoundError(errorTitle, errorData)
            }
        })
          
        // Sample route to trigger RunTimeError
        app.get('/runtime-error', () => {
            throw new RunTimeError(errorTitle, new Error(errorMessage))
        })

        // Middleware should be the last of all..
        app.use(errorMiddleware)

        server = app.listen(port)
        console.log(`Server is running on port ${port}`)
    })

    afterAll(() => {
        server.close()
    })

    describe('GET /base-error', () => {
        it('should return 500 with BaseError details - error passed', async() => {
            try {
                await axios.get(`${BASE_URL}/base-error?error=true`)
                throw new Error('Base Error Test - This should not be called')
            } catch (e: unknown) {
                const { response } = e as AxiosError
                expect(response?.status).to.equal(500)

                expect(response?.data).to.include({
                    title: errorTitle,
                    environment: process.env.npm_lifecycle_event,
                    name: 'BaseError',
                    error: `Error: ${errorMessage}`
                })
            }
        })

        it('should return 500 with BaseError details - no error passed', async() => {
            try {
                await axios.get(`${BASE_URL}/base-error`)
                throw new Error('Base Error Test - This should not be called')
            } catch (e: unknown) {
                const { response } = e as AxiosError
                expect(response?.status).to.equal(500)

                expect(response?.data).to.include({
                    title: errorTitle,
                    environment: process.env.npm_lifecycle_event,
                    name: 'BaseError'
                })

                expect(response?.data).to.not.include({
                    error: `Error: ${errorMessage}`
                })
            }
        })
    })

    describe('GET /httpclient-error', () => {
        it('should return 404 with HttpClientError details', async() => {
            try {
                await axios.get(`${BASE_URL}/httpclient-error`)
                throw new Error('HttpClient Error Test - This should not be called')
            } catch (e: unknown) {
                const { response } = e as AxiosError
                
                expect(response?.status).to.equal(404)

                expect(response?.data).to.include({
                    title: errorTitle,
                    environment: process.env.npm_lifecycle_event,
                    name: 'HttpClientError'
                })

                const data = response?.data as HttpClientErrorDataInterface

                expect(data.data.config).toBeDefined()
                expect(data.data.e).toBeDefined()
                expect(data.data.errorMessage).toBeDefined()
                expect(data.data.headers).toBeDefined()
                expect(data.data.method).to.be.equal('get')
                expect(data.data.responseData).toBeDefined()
                expect(data.data.url).toBe(BASE_URL + '/notFound')
            }
        })
    })

    describe('GET /validation-error', () => {
        it('should return 400 with ValidationError details - error passed', async() => {
            try {
                await axios.get(`${BASE_URL}/validation-error?error=true`)
                throw new Error('Validation Error Test - This should not be called')
            } catch (e: unknown) {
                const { response } = e as AxiosError

                expect(response?.status).to.equal(400)

                expect(response?.data).to.include({
                    title: errorTitle,
                    environment: process.env.npm_lifecycle_event,
                    name: 'ValidationError',
                    error: `Error: ${errorMessage}`
                })

                const data = response?.data as ErrorDataInterface
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

                expect(response?.data).to.include({
                    title: errorTitle,
                    environment: process.env.npm_lifecycle_event,
                    name: 'ValidationError'
                })

                expect(response?.data).to.not.include({
                    error: `Error: ${errorMessage}`
                })

                const data = response?.data as ErrorDataInterface
                expect(data.data).to.be.deep.equal(errorData)
            }
        })
    })

    describe('GET /resource-not-found', () => {
        it('should return 404 with ResourceNotFoundError details - with error', async() => {
            try {
                await axios.get(`${BASE_URL}/resource-not-found?error=true`)
                throw new Error('Resource Error Test - This should not be called')
            } catch (e: unknown) {
                const { response } = e as AxiosError

                expect(response?.status).to.equal(404)

                expect(response?.data).to.include({
                    title: errorTitle,
                    environment: process.env.npm_lifecycle_event,
                    name: 'ResourceNotFoundError',
                    error: `Error: ${errorMessage}`
                })

                const data = response?.data as ErrorDataInterface
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

                expect(response?.data).to.include({
                    title: errorTitle,
                    environment: process.env.npm_lifecycle_event,
                    name: 'ResourceNotFoundError'
                })

                expect(response?.data).to.not.include({
                    error: `Error: ${errorMessage}`
                })

                const data = response?.data as ErrorDataInterface
                expect(data.data).to.be.deep.equal(errorData)
            }
        })
    })

    describe('GET /runtime-error', () => {
        it('should return 500 with RunTimeError details', async() => {
            try {
                await axios.get(`${BASE_URL}/runtime-error`)
                throw new Error('Runtime Error Test - This should not be called')
            } catch (e: unknown) {
                const { response } = e as AxiosError

                expect(response?.status).to.equal(500)

                expect(response?.data).to.include({
                    title: errorTitle,
                    environment: process.env.npm_lifecycle_event,
                    name: 'RunTimeError',
                    error: `Error: ${errorMessage}`
                })
            }
        })
    })
})