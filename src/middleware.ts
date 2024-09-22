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

export interface ErrorResponseSanitizedInterface extends Omit<
    CoreErrorInterface, 'error' | 'data'
> {
     error: string | SanitizedMessage.DEFAULT | CoreErrorInterface['error']
     data: SanitizedMessage.DEFAULT | CoreErrorInterface['data']
     stack: SanitizedMessage.DEFAULT | CoreErrorInterface['stack']
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
    const {
        message, // <-- This is the error message from our custom error classes
        data,
        httpStatus,
        name,
        stack,
        timestamp,
        error // <-- This is the original error that caused the custom error
    } = err

    // Base will be always there does not matter which npm_lifecycle_event
    const base: CoreErrorInterface = {
        name,
        environment: process.env.npm_lifecycle_event!,
        timestamp: timestamp || new Date().toISOString(),
        message,
        httpStatus
    }

    // Full error with error message and stack
    const fullError: CoreErrorInterface = {
        ...base,
        error,
        data,
        stack
    }

    // If npm_lifecycle_event is start we sanitize the error message and stacktrace
    const fullErrorSanitized: ErrorResponseSanitizedInterface = {
        ...base,
        data: process.env.npm_lifecycle_event === 'start' ? SanitizedMessage.DEFAULT : data,
        stack: process.env.npm_lifecycle_event === 'start' ? SanitizedMessage.DEFAULT : stack,
        // We must use toString() because error can be an instance of Error
        error: process.env.npm_lifecycle_event === 'start' ? SanitizedMessage.DEFAULT : error?.toString()
    }

    console.error('[ErrorManager] Full Error: ', fullError)

    const status = httpStatus || StatusCodes.INTERNAL_SERVER_ERROR
    res.status(status).json(fullErrorSanitized)
}