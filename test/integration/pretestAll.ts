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

// ==== ENUM ====
import { ServerDetails, ErrorDetails, ErrorData } from '@/test/integration/pretestAll.d'
export { ServerDetails, ErrorDetails, ErrorData }

// ==== DEPENDENCIES ====
import express from 'express'
import 'express-async-errors'

import axios, { AxiosError } from 'axios'

import { Server } from 'http'

// ==== CODE ====
import errorMiddleware from '@/src/middleware'

import {
    BaseError,
    ValidationError,
    RuntimeError,
    ResourceNotFoundError,
    HttpClientError
}  from '@/src/index'

const errorData = ErrorData.exampleOne
const { errorTitle, errorMessage } = ErrorDetails
const { PORT, BASE_URL } = ServerDetails

let server: Server
/**
 * Sets up the server and defines routes to trigger different types of errors.
 * @returns {Promise<void>} A promise that resolves when the server is set up.
 */
export async function setup(): Promise<void> {
    const app = express()

    app.get('/found', (req, res) => {
        res.send('Hello World!')
    })

    // Sample route to trigger BaseError
    app.get('/normal-error', () => {
        throw new Error(errorTitle)
    })

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
       
    // Sample route to trigger RuntimeError
    app.get('/runtime-error', () => {
        throw new RuntimeError(errorTitle, new Error(errorMessage))
    })

    // Middleware should be the last of all..
    app.use(errorMiddleware)

    server = app.listen(PORT)
    console.log(`Server is running on port ${PORT}`)
}

/**
 * Closes the server.
 */
export async function teardown(): Promise<void> {
    server.close()
}
