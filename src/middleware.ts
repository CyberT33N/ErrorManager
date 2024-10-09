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

import { type ICoreError } from './errors/CoreError'

export enum SanitizedMessage {
    DEFAULT = '[SANITIZED]'
}

export interface IErrorResponseSanitized extends Omit<
    ICoreError, 'error' | 'data'
> {
     error: string | SanitizedMessage.DEFAULT | ICoreError['error']
     data: SanitizedMessage.DEFAULT | ICoreError['data']
     stack: SanitizedMessage.DEFAULT | ICoreError['stack']
}

export type IErrorMiddleware = (
    err: ICoreError,
    req: Request,
    res: Response,
    next: NextFunction
) => void

/**
 * @function errorMiddleware
 * @param {ICoreError} err - The error object containing error details
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
 * @param {NextFunction} next - The Express next function to pass control to the next middleware
 * @returns {void}
 * 
 * Middleware function for handling and formatting errors in an Express application.
 * It logs the full error details and sends a sanitized version of the error response to the client.
 *
 * In order to get detected as error middleware, the function must have 4 parameters.
 * For this reason we disable the eslint rule (no-unused-vars).
*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware: IErrorMiddleware = (err, req, res, next) => {
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
    const base: ICoreError = {
        name,
        environment: process.env.npm_lifecycle_event!,
        timestamp: timestamp || new Date().toISOString(),
        message,
        httpStatus
    }

    // Full error with error message and stack
    const fullError: ICoreError = {
        ...base,
        error,
        data,
        stack
    }

    // If npm_lifecycle_event is start we sanitize the error message and stacktrace
    const fullErrorSanitized: IErrorResponseSanitized = {
        ...base,
        data: process.env.npm_lifecycle_event === 'start' ? SanitizedMessage.DEFAULT : data,
        stack: process.env.npm_lifecycle_event === 'start' ? SanitizedMessage.DEFAULT : stack,
        // We must use toString() because error can be an instance of Error
        error: process.env.npm_lifecycle_event === 'start' ? SanitizedMessage.DEFAULT : error?.toString()
    }

    console.error('[ErrorManager] Full Error: ', fullError)

    const status = httpStatus ?? StatusCodes.INTERNAL_SERVER_ERROR
    res.status(status).json(fullErrorSanitized)
}

export default errorMiddleware