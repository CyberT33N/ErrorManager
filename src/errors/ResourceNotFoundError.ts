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
 * @interface IResourceNotFoundError
 * @extends ICoreError
 * HTTP status code is always 404 (NOT_FOUND)
 */
export interface IResourceNotFoundError extends ICoreError {
    name: ErrorType.RESOURCE_NOT_FOUND
    httpStatus: StatusCodes.NOT_FOUND
}

/**
 * @class ResourceNotFoundError
 * @extends CoreError
 * @implements IResourceNotFoundError
 * 
 * This class represents an error indicating that a requested resource was not found.
 * It extends `CoreError` and implements the `IResourceNotFoundError`.
 */
export default class ResourceNotFoundError extends CoreError implements IResourceNotFoundError {
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
     * @param {Record<string, unknown>} data - Additional data related to the error
     * @param {Error} [error] - Optional original error that caused this error
     */
    constructor(
        readonly message: string,
        readonly data: Record<string, unknown>,
        readonly error?: Error
    ) {
        super(message, error)

        // Sets the error name to ResourceNotFoundError
        this.name = ErrorType.RESOURCE_NOT_FOUND

        // Sets the HTTP status to 404 (NOT_FOUND)
        this.httpStatus = StatusCodes.NOT_FOUND
    }
}