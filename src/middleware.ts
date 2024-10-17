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

// 🛡️ Enum for sanitized message
export enum SanitizedMessage {
    DEFAULT = '[SANITIZED]'
}

// 🗂️ Interface for a sanitized error response
export interface IErrorResponseSanitized extends Omit<
    ICoreError, 'error' | 'data'
> {
     // 🔍 Error description or sanitized message
     error: string | SanitizedMessage.DEFAULT | ICoreError['error']
     // 📊 Additional data, possibly sanitized
     data: SanitizedMessage.DEFAULT | ICoreError['data']
     // 🗄️ Stack trace, possibly sanitized
     stack: SanitizedMessage.DEFAULT | ICoreError['stack']
}

// 🛠️ Type definition for the error middleware function
export type IErrorMiddleware = (
    err: ICoreError,        // 📝 Error object containing details
    req: Request,          // 📥 Express request object
    res: Response,         // 📤 Express response object
    next: NextFunction     // ➡️ Next middleware function
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
 * It logs the full error details and sends a sanitized version of the error response
 * to the client.
 *
 * In order to get detected as error middleware, the function must have 4 parameters.
 * For this reason, we disable the eslint rule (no-unused-vars).
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware: IErrorMiddleware = (err, req, res, next) => {
    // 📜 Destructuring error properties for easier access
    const {
        message,
        data,
        httpStatus,
        name,
        stack,
        timestamp,
        error
    } = err

    // 🌱 Getting npm lifecycle event for environment detection
    const npmLifecycleEvent = process.env.npm_lifecycle_event
    const isSanitized = npmLifecycleEvent === 'start'

    // 🗄️ Base error object with essential details
    const base: ICoreError = {
        name,
        environment: npmLifecycleEvent!,
        timestamp: timestamp || new Date().toISOString(),
        message,
        httpStatus
    }

    // 💼 Full error object including all details
    const fullError: ICoreError = {
        ...base,
        error,
        data,
        stack
    }

    // 🔒 Sanitized error response for clients
    const fullErrorSanitized: IErrorResponseSanitized = {
        ...base,
        data: isSanitized ? SanitizedMessage.DEFAULT : data,
        stack: isSanitized ? SanitizedMessage.DEFAULT : stack,
        error: isSanitized ? SanitizedMessage.DEFAULT : error?.toString()
    }

    // 🔴 Logging the full error for debugging
    console.error('[ErrorManager] Full Error: ', fullError)
    // 📬 Sending the sanitized error response to the client
    res.status(httpStatus ?? StatusCodes.INTERNAL_SERVER_ERROR).json(fullErrorSanitized)
}

export default errorMiddleware
