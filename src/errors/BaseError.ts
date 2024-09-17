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

// ==== ENUM ====
import { HttpStatus, ErrorType } from '../index'

// ==== INTERFACE ====
import type { BaseErrorInterface } from './BaseError.d'
export type { BaseErrorInterface }

/**
 * @class BaseError
 * @extends Error
 * @implements BaseErrorInterface
 * 
 * This class serves as a base class for creating custom error types.
 * It extends the native `Error` class and implements the `BaseErrorInterface`.
 */
class BaseError extends Error implements BaseErrorInterface {
    /**
     * HTTP status code associated with this error
     * 
     * @type {HttpStatus}
     */
    httpStatus: HttpStatus

    /**
     * Creates a new instance of `BaseError`
     * 
     * @param {string} title - The title or description of the error
     * @param {Error} [error] - Optional original error that caused this error
     */
    constructor(
        readonly title: string,
        readonly error?: Error
    ) {
        super(title)

        // Sets the error name to BaseError
        this.name = ErrorType.BASE

        // Sets the default HTTP status to 500 (INTERNAL_SERVER_ERROR)
        this.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
    }
}

export default BaseError