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

import BaseError from './BaseError'

import { HttpStatus, ErrorType } from '../index'
import type { ErrorDataInterface } from '../index'

/**
 * @class ResourceNotFoundError
 * @extends BaseError
 * @implements ErrorDataInterface
 * 
 * This class represents an error indicating that a requested resource was not found.
 * It extends `BaseError` and implements the `ErrorDataInterface`.
 */
export default class ResourceNotFoundError extends BaseError implements ErrorDataInterface {
    /**
     * Creates a new instance of `ResourceNotFoundError`
     * 
     * @param {string} message - The message or description of the error
     * @param {ErrorDataInterface} data - Additional data related to the error
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
        this.httpStatus = HttpStatus.NOT_FOUND
    }
}