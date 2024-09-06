// ==== DEPENDENCIES ====
import express from 'express'
import 'express-async-errors'

import axios from 'axios'

import { Server } from 'http'

// ==== VITEST ====
import { describe, it, beforeAll, afterAll, expect } from 'vitest'

// ==== CODE ====
import errorMiddleware from '../../src/middleware'
import errors from '../../src/errors'

const {
     BaseError,
     ValidationError,
     RunTimeError,
     ResourceNotFoundError,
     HttpClientError
} = errors

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
          app.get('/base-error', (req, res) => {
               if (req.query.error) {
                   throw new BaseError(errorTitle, new Error(errorMessage))
               } else {
                   throw new BaseError(errorTitle)
               }
          })

          // Sample route to trigger ValidationError
          app.get('/validation-error', (req, res) => {
               if (req.query.error) {
                   throw new ValidationError(errorTitle, errorData, new Error(errorMessage))
               } else {
                    throw new ValidationError(errorTitle, errorData)
               }
          })

          // Sample route to trigger HttpClientError
          app.get('/httpclient-error', async (req, res) => {
               try {
                    await axios.get(`${BASE_URL}/notFound`)
               } catch (e: any) {
                    throw new HttpClientError(errorTitle, e)
               }
          })
          
          // Sample route to trigger ResourceNotFoundError
          app.get('/resource-not-found', (req, res) => {
               if (req.query.error) {
                   throw new ResourceNotFoundError(errorTitle, errorData, new Error(errorMessage))
               } else {
                   throw new ResourceNotFoundError(errorTitle, errorData)
               }
          })
          
          // Sample route to trigger RunTimeError
          app.get('/runtime-error', (req, res) => {
               throw new RunTimeError(errorTitle, new Error(errorMessage))
          })
          afterAll
          // Middleware should be the last of all..
          app.use(errorMiddleware)

          server = app.listen(port)
          console.log(`Server is running on port ${port}`)
     })

     afterAll(() => {
          server.close()
     })

     describe('GET /base-error', () => {
          it('should return 500 with BaseError details - error passed', async () => {
               try {
                    await axios.get(`${BASE_URL}/base-error?error=true`)
                    throw new Error('Base Error Test - This should not be called')
               } catch (e: any) {
                    const { response } = e
                    expect(response.status).to.equal(500)

                    expect(response.data).to.include({
                         title: errorTitle,
                         environment: process.env.npm_lifecycle_event,
                         name: 'BaseError',
                         error: `Error: ${errorMessage}`
                    })

                    expect(response.data.data).to.be.undefined
               }
          })

          it('should return 500 with BaseError details - no error passed', async () => {
               try {
                    await axios.get(`${BASE_URL}/base-error`)
                    throw new Error('Base Error Test - This should not be called')
               } catch (e: any) {
                    const { response } = e
                    expect(response.status).to.equal(500)

                    expect(response.data).to.include({
                         title: errorTitle,
                         environment: process.env.npm_lifecycle_event,
                         name: 'BaseError',
                    })

                    expect(response.data.error).to.be.undefined
               }
          })
     })

     describe('GET /httpclient-error', () => {
          it('should return 404 with HttpClientError details', async () => {
               try {
                    await axios.get(`${BASE_URL}/httpclient-error`)
                    throw new Error('HttpClient Error Test - This should not be called')
               } catch (e: any) {
                    const { response } = e
                    expect(response.status).to.equal(404)
                    expect(response.data).to.include({
                         title: errorTitle,
                         environment: process.env.npm_lifecycle_event,
                         name: 'HttpClientError'
                    })

                    expect(response.data.data.additional).to.exist
                    expect(response.data.data.config).to.exist
                    expect(response.data.data.e).to.exist
                    expect(response.data.data.errorMessage).to.exist
                    expect(response.data.data.headers).to.exist
                    expect(response.data.data.method).to.be.equal('get')
                    expect(response.data.data.responseData).to.exist
                    expect(response.data.data.url).to.exist
               }
          })
     })

     describe('GET /validation-error', () => {
          it('should return 400 with ValidationError details - error passed', async () => {
               try {
                    await axios.get(`${BASE_URL}/validation-error?error=true`)
                    throw new Error('Validation Error Test - This should not be called')
               } catch (e: any) {
                    const { response } = e
                    expect(response.status).to.equal(400)
                    expect(response.data).to.include({
                         title: errorTitle,
                         environment: process.env.npm_lifecycle_event,
                         name: 'ValidationError',
                         error: `Error: ${errorMessage}`
                    })

                    expect(response.data.data).to.be.deep.equal(errorData)
               }
          })

          it('should return 400 with ValidationError details - no error passed', async () => {
               try {
                    await axios.get(`${BASE_URL}/validation-error`)
                    throw new Error('Validation Error Test - This should not be called')
               } catch (e: any) {
                    const { response } = e
                    expect(response.status).to.equal(400)
                    expect(response.data).to.include({
                         title: errorTitle,
                         environment: process.env.npm_lifecycle_event,
                         name: 'ValidationError'
                    })

                    expect(response.data.error).to.be.undefined
                    expect(response.data.data).to.be.deep.equal(errorData)
               }
          })
     })

     describe('GET /resource-not-found', () => {
          it('should return 404 with ResourceNotFoundError details - with error', async () => {
               try {
                    await axios.get(`${BASE_URL}/resource-not-found?error=true`)
                    throw new Error('Resource Error Test - This should not be called')
               } catch (e: any) {
                    const { response } = e

                    expect(response.status).to.equal(404)

                    expect(response.data).to.include({
                         title: errorTitle,
                         environment: process.env.npm_lifecycle_event,
                         name: 'ResourceNotFoundError',
                         error: `Error: ${errorMessage}`,
                    })

                    expect(response.data.data).to.be.deep.equal(errorData)
               }
          })

          it('should return 404 with ResourceNotFoundError details - without error', async () => {
               try {
                    await axios.get(`${BASE_URL}/resource-not-found`)
                    throw new Error('Resource Error Test - This should not be called')
               } catch (e: any) {
                    const { response } = e

                    expect(response.status).to.equal(404)

                    expect(response.data).to.include({
                         title: errorTitle,
                         environment: process.env.npm_lifecycle_event,
                         name: 'ResourceNotFoundError'
                    })

                    expect(response.data.error).to.be.undefined
                    expect(response.data.data).to.be.deep.equal(errorData)
               }
          })
     })

     describe('GET /runtime-error', () => {
          it('should return 500 with RunTimeError details', async () => {
               try {
                    await axios.get(`${BASE_URL}/runtime-error`)
                    throw new Error('Runtime Error Test - This should not be called')
               } catch (e: any) {
                    const { response } = e
                    expect(response.status).to.equal(500)

                    expect(response.data).to.include({
                         title: errorTitle,
                         environment: process.env.npm_lifecycle_event,
                         name: 'RunTimeError',
                         error: `Error: ${errorMessage}`,
                    })

                    expect(response.data.data).to.be.undefined
               }
          })
     })
})