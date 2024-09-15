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

// ==== EXTERNAL DEPENDENCIES TYPES ====
import { NextFunction, Response, Request } from 'express'

// ==== INTERNAL TYPES ====
import { ErrorDataInterface, HttpStatus } from './index'

/**
 * @function errorMiddleware
 * @param {ErrorDataInterface} err - The error object containing error details
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
 * @param {NextFunction} next - The Express next function to pass control to the next middleware
 * @returns {void}
 * 
 * Middleware function for handling and formatting errors in an Express application.
 * It logs the full error details and sends a sanitized version of the error response to the client.
 */
const errorMiddleware = (
    err: ErrorDataInterface,
    req:Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
): void => {
    const { error, title, data, httpStatus, name } = err

    // Base will be always there does not matter which npm_lifecycle_event
    const base = {
        name,
        environment: process.env.npm_lifecycle_event,
        timestamp: new Date().toISOString(),
        title
    }

    // Full error with error message and stack
    const fullError = {
        ...base,
        error,
        data,
        stack: error?.stack
    }

    // If npm_lifecycle_event is start we sanitize the error message and stacktrace
    const fullErrorSanitized = {
        ...base,
        error: process.env.npm_lifecycle_event === 'start' ? null : error?.toString(),
        data: process.env.npm_lifecycle_event === 'start' ? null : data,
        stack: process.env.npm_lifecycle_event === 'start' ? null : error?.stack
    }

    console.error('[ErrorManager] Full Error: ', fullError)

    const status = httpStatus || HttpStatus.INTERNAL_SERVER_ERROR
    res.status(status).json(fullErrorSanitized)
}

export default errorMiddleware