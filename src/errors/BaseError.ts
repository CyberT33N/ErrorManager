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

import { HttpStatus, ErrorType } from '../index'

/**
 * @interface BaseErrorInterface
 * Normal error is also allowed so only the name is required
 */
export interface BaseErrorInterface {
    name: string
    httpStatus?: HttpStatus

    // Original Error of javascript contains message, error and stack
    readonly message?: string
    readonly error?: Error
    readonly stack?: string
}

/**
 * @class BaseError
 * @extends Error
 * @implements BaseErrorInterface
 * 
 * This class serves as a base class for creating custom error types.
 * It extends the native `Error` class and implements the `BaseErrorInterface`.
 */
export default class BaseError extends Error implements BaseErrorInterface {
    /**
     * HTTP status code associated with this error
     * 
     * @type {HttpStatus}
     */
    httpStatus: HttpStatus

    /**
     * Creates a new instance of `BaseError`
     * 
     * @param {string} message - The message or description of the error
     * @param {Error} [error] - Optional original error that caused this error
     */
    constructor(
        // The original Error of javascript contains message and stack
        readonly message: string,
        readonly error?: Error
    ) {
        super(message)

        // Sets the error name to BaseError
        this.name = ErrorType.BASE

        // Sets the default HTTP status to 500 (INTERNAL_SERVER_ERROR)
        this.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
    }
}