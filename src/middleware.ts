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

import type { NextFunction, Response, Request } from 'express'
import { StatusCodes } from 'http-status-codes'

import { type CoreErrorInterface } from './errors/CoreError'

export enum SanitizedMessage {
    DEFAULT = '[SANITIZED]'
}

export interface ErrorResponseInterface extends CoreErrorInterface {
    environment: string
    timestamp: string
}

export interface ErrorResponseFullInterface extends ErrorResponseInterface {
    stack: string | undefined
}

export interface ErrorResponseSanitizedInterface extends Omit<
    ErrorResponseInterface, 'error' | 'data'
> {
     error: string | SanitizedMessage.DEFAULT | CoreErrorInterface['error']
     data: SanitizedMessage.DEFAULT | CoreErrorInterface['data']
     stack: ErrorResponseFullInterface['stack']
}

/**
 * @function errorMiddleware
 * @param {CoreErrorInterface} err - The error object containing error details
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
 * @param {NextFunction} next - The Express next function to pass control to the next middleware
 * @returns {void}
 * 
 * Middleware function for handling and formatting errors in an Express application.
 * It logs the full error details and sends a sanitized version of the error response to the client.
 */
export default function errorMiddleware(
    err: CoreErrorInterface,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
): void {
    const { error, message, data, httpStatus, name } = err

    // Base will be always there does not matter which npm_lifecycle_event
    const base: ErrorResponseInterface = {
        name,
        environment: process.env.npm_lifecycle_event!,
        timestamp: new Date().toISOString(),
        message,
        httpStatus
    }

    // Full error with error message and stack
    const fullError: ErrorResponseFullInterface = {
        ...base,
        error,
        data,
        stack: error?.stack
    }

    // If npm_lifecycle_event is start we sanitize the error message and stacktrace
    const fullErrorSanitized: ErrorResponseSanitizedInterface = {
        ...base,
        error: process.env.npm_lifecycle_event === 'start' ? SanitizedMessage.DEFAULT : error?.toString(),
        data: process.env.npm_lifecycle_event === 'start' ? SanitizedMessage.DEFAULT : data,
        stack: process.env.npm_lifecycle_event === 'start' ? SanitizedMessage.DEFAULT : error?.stack
    }

    console.error('[ErrorManager] Full Error: ', fullError)

    const status = httpStatus || StatusCodes.INTERNAL_SERVER_ERROR
    res.status(status).json(fullErrorSanitized)
}