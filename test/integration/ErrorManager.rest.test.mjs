// ==== DEPENDENCIES ====
import express from 'express'
import { expect } from 'chai'
import { describe, it, before } from 'mocha'
import axios from 'axios'

// ==== ErrorManager() ====
import errorMiddleware from '../../dist/middleware.mjs'
import errors from '../../dist/errors.mjs'
const {
     BaseError, ValidationError, RuntimeError, ResourceNotFoundError
} = errors

describe('[INT TESTS] - ErrorManager.js', () => {
     const port = 3876
     const BASE_URL = `http://localhost:${port}`
     const errorTitle = 'Test title'
     const errorMessage = 'Test error'
     const errorData = { field: 'value' }

     before(async function () {
          const app = express()

          // Sample route to trigger BaseError
          app.get('/base-error', (req, res) => {
               throw new BaseError(errorTitle, new Error(errorMessage))
          })

          // Sample route to trigger BaseError
          app.get('/base-error-only-msg', (req, res) => {
               throw new BaseError(errorTitle)
          })
          
          // Sample route to trigger ValidationError
          app.get('/validation-error', (req, res) => {
               throw new ValidationError(errorTitle, new Error(errorMessage), errorData)
          })
          
          // Sample route to trigger ResourceNotFoundError
          app.get('/resource-not-found', (req, res) => {
               throw new ResourceNotFoundError(errorTitle, errorData, new Error(errorMessage))
          })
          
          // Sample route to trigger RuntimeError
          app.get('/runtime-error', (req, res) => {
               throw new RuntimeError(errorTitle, new Error(errorMessage))
          })
          
          // Middleware should be the last of all..
          app.use(errorMiddleware)

          this.server = app.listen(port)
          console.log(`Server is running on port ${port}`)
     })

     after(function() {
          this.server.close()
     })

     describe('GET /base-error', () => {
          it('should return 500 with BaseError details - error passed', async () => {
               try {
                    await axios.get(`${BASE_URL}/base-error`)
                    throw new Error('Base Error Test - This should not be called')
               } catch (e) {
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
                    await axios.get(`${BASE_URL}/base-error-only-msg`)
                    throw new Error('Base Error Test - This should not be called')
               } catch (e) {
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

     describe('GET /validation-error', () => {
          it('should return 400 with ValidationError details', async () => {
               try {
                    await axios.get(`${BASE_URL}/validation-error`)
                    throw new Error('Validation Error Test - This should not be called')
               } catch (error) {
                    const { response } = error
                    expect(response.status).to.equal(400)
                    expect(response.data).to.include({
                         title: errorTitle,
                         environment: process.env.npm_lifecycle_event,
                         name: 'ValidationError',
                         error: `Error: ${errorMessage}`,
                    })
                    expect(response.data.data).to.be.deep.equal(errorData)
               }
          })
     })

     describe('GET /resource-not-found', () => {
          it('should return 404 with ResourceNotFoundError details', async () => {
               try {
                    await axios.get(`${BASE_URL}/resource-not-found`)
                    throw new Error('Resource Error Test - This should not be called')
               } catch (error) {
                    const { response } = error

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
     })

     describe('GET /runtime-error', () => {
          it('should return 500 with RuntimeError details', async () => {
               try {
                    await axios.get(`${BASE_URL}/runtime-error`)
                    throw new Error('Runtime Error Test - This should not be called')
               } catch (error) {
                    const { response } = error
                    expect(response.status).to.equal(500)

                    expect(response.data).to.include({
                         title: errorTitle,
                         environment: process.env.npm_lifecycle_event,
                         name: 'RuntimeError',
                         error: `Error: ${errorMessage}`,
                    })

                    expect(response.data.data).to.be.undefined
               }
          })
     })
})