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

import { StatusCodes } from 'http-status-codes'
import { ErrorType } from '../index'

import { type ICoreError, default as CoreError } from './CoreError'

/**
 * @interface IRuntimeError
 * @extends ICoreError
 * HTTP status code is always 500 (INTERNAL_SERVER_ERROR)
 */
export interface IRuntimeError extends ICoreError {
    name: ErrorType.RUNTIME
    httpStatus: StatusCodes.INTERNAL_SERVER_ERROR
}

/**
 * @class RuntimeError
 * @extends CoreError
 * @implements ICoreError
 * This class represents an error that occurs during the runtime of an application.
 * It extends the `CoreError` class and allows for specifying an HTTP status code.
 */
export default class RuntimeError extends CoreError implements IRuntimeError {
    /**
     * Error name associated with this error
     * 
     * @type {ErrorType.RUNTIME}
     */
    name: ErrorType.RUNTIME

    /**
     * Creates a new instance of `RuntimeError`
     * 
     * @param {string} message - The message or description of the error
     * @param {StatusCodes} httpStatus - Optional HTTP status code, default is 500 (INTERNAL_SERVER_ERROR)
     * @param {Error} [error] - The original error that triggered this runtime error
     */
    constructor(
        readonly message: string,
        readonly httpStatus: number = StatusCodes.INTERNAL_SERVER_ERROR,
        readonly error?: Error
    ) {
        super(message, error)

        // Sets the error name to RuntimeError
        this.name = ErrorType.RUNTIME
    }
}