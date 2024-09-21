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

import { type CoreErrorInterface, default as CoreError } from './CoreError'

/**
 * @interface ResourceNotFoundErrorInterface
 * @extends CoreErrorInterface
 * HTTP status code is always 404 (NOT_FOUND)
 */
export interface ResourceNotFoundErrorInterface extends CoreErrorInterface {
    name: ErrorType.RESOURCE_NOT_FOUND
    httpStatus: StatusCodes.NOT_FOUND
}

/**
 * @class ResourceNotFoundError
 * @extends CoreError
 * @implements ResourceNotFoundErrorInterface
 * 
 * This class represents an error indicating that a requested resource was not found.
 * It extends `CoreError` and implements the `ResourceNotFoundErrorInterface`.
 */
export default class ResourceNotFoundError extends CoreError implements ResourceNotFoundErrorInterface {
    /**
     * Error name associated with this error
     * 
     * @type {ErrorType.RESOURCE_NOT_FOUND}
     */
    name: ErrorType.RESOURCE_NOT_FOUND

    /**
      * HTTP status code associated with this error
      * 
      * @type {StatusCodes.NOT_FOUND}
      */
    httpStatus: StatusCodes.NOT_FOUND
 
    /**
     * Creates a new instance of `ResourceNotFoundError`
     * 
     * @param {string} message - The message or description of the error
     * @param {CoreErrorInterface} data - Additional data related to the error
     * @param {Error} [error] - Optional original error that caused this error
     */
    constructor(
        readonly message: string,
        readonly data: object,
        readonly error?: Error
    ) {
        super(message, error)

        // Sets the error name to ResourceNotFoundError
        this.name = ErrorType.RESOURCE_NOT_FOUND

        // Sets the HTTP status to 404 (NOT_FOUND)
        this.httpStatus = StatusCodes.NOT_FOUND
    }
}