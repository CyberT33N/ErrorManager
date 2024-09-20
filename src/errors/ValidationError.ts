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
 * @class ValidationError
 * @extends BaseError
 * @implements ErrorDataInterface
 * 
 * This class represents an error that occurs due to validation failures.
 * It extends the `BaseError` class and includes additional data related to the validation error.
 */
export default class ValidationError extends BaseError implements ErrorDataInterface {
    /**
     * Creates a new instance of `ValidationError`
     * 
     * @param {string} title - The title or description of the error
     * @param {ErrorDataInterface} data - Additional data related to the validation error
     * @param {Error} [error] - Optional original error that triggered this validation error
     */
    constructor(
        readonly title: string,
        readonly data: object,
        readonly error?: Error
    ) {
        super(title, error)

        // Sets the error name to VALIDATION
        this.name = ErrorType.VALIDATION

        // Sets the HTTP status to 400 (BAD_REQUEST)
        this.httpStatus = HttpStatus.BAD_REQUEST
    }
}