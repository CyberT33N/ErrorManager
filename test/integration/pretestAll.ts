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

import express from 'express'
import 'express-async-errors'

import { Server } from 'http'

import axios, { type AxiosError } from 'axios'

import errorMiddleware from '@/src/middleware'

import {
    BaseError,
    ValidationError,
    RuntimeError,
    ResourceNotFoundError,
    HttpClientError,
    StatusCodes
}  from '@/src/index'

export enum ServerDetails {
    PORT = 3876,
    BASE_URL = 'http://localhost:3876'
}

export enum ErrorDetails {
    errorMessage = 'Test error',
    errorMessageOriginal = 'Test error original'
}

export const ErrorData = {
    exampleOne: { field: 'value' }
} as const

const errorData = ErrorData.exampleOne
const { errorMessage, errorMessageOriginal } = ErrorDetails
const error = new Error(errorMessageOriginal)

const { PORT, BASE_URL } = ServerDetails

let server: Server
/**
 * Sets up the server and defines routes to trigger different types of errors.
 * @returns {void} A promise that resolves when the server is set up.
 */
export function setup(): void {
    const app = express()

    app.get('/found', (req, res) => {
        res.send('Hello World!')
    })

    // Sample route to trigger BaseError
    app.get('/normal-error', () => {
        throw error
    })

    // Sample route to trigger BaseError
    app.get('/base-error', req => {
        if (req.query.error) {
            throw new BaseError(errorMessage, error)
        } else {
            throw new BaseError(errorMessage)
        }
    })

    // Sample route to trigger ValidationError
    app.get('/validation-error', req => {
        if (req.query.error) {
            throw new ValidationError(errorMessage, errorData, error)
        } else {
            throw new ValidationError(errorMessage, errorData)
        }
    })

    // Sample route to trigger HttpClientError
    app.get('/httpclient-error', async() => {
        try {
            await axios.get(`${BASE_URL}/notFound`)
        } catch (e) {
            throw new HttpClientError(errorMessage, e as AxiosError)
        }
    })

    // Sample route to trigger ResourceNotFoundError
    app.get('/resource-not-found', req => {
        if (req.query.error) {
            throw new ResourceNotFoundError(errorMessage, errorData, error)
        } else {
            throw new ResourceNotFoundError(errorMessage, errorData)
        }
    })
       
    // Sample route to trigger RuntimeError
    app.get('/runtime-error', () => {
        throw new RuntimeError(errorMessage, StatusCodes.FORBIDDEN, error)
    })

    // Middleware should be the last of all..
    app.use(errorMiddleware)

    server = app.listen(PORT)
    console.log(`Server is running on port ${PORT}`)
}

/**
 * Closes the server.
 */
export function teardown(): void {
    server.close()
}
