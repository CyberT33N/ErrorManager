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
        message,
        data,
        httpStatus,
        name,
        stack,
        timestamp,
        error
    } = err

    const npmLifecycleEvent = process.env.npm_lifecycle_event
    const isSanitized = npmLifecycleEvent === 'start'

    const base: ICoreError = {
        name,
        environment: npmLifecycleEvent!,
        timestamp: timestamp || new Date().toISOString(),
        message,
        httpStatus
    }

    const fullError: ICoreError = {
        ...base,
        error,
        data,
        stack
    }

    const fullErrorSanitized: IErrorResponseSanitized = {
        ...base,
        data: isSanitized ? SanitizedMessage.DEFAULT : data,
        stack: isSanitized ? SanitizedMessage.DEFAULT : stack,
        error: isSanitized ? SanitizedMessage.DEFAULT : error?.toString()
    }

    console.error('[ErrorManager] Full Error: ', fullError)
    res.status(httpStatus ?? StatusCodes.INTERNAL_SERVER_ERROR).json(fullErrorSanitized)
}


export default errorMiddleware