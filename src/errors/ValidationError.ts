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
 * @interface IValidationError
 * @extends ICoreError
 * 
 * Represents the validation error interface.
 * 
 * @property {ErrorType.VALIDATION} name - The name of the error, indicating a validation error.
 * @property {StatusCodes.BAD_REQUEST} httpStatus - The HTTP status code always set to 400 (BAD_REQUEST).
 */
export interface IValidationError extends ICoreError {
    name: ErrorType.VALIDATION
    httpStatus: StatusCodes.BAD_REQUEST
}

/**
 * @class ValidationError
 * @extends CoreError
 * @implements IValidationError
 * 
 * This class represents an error that occurs due to validation failures.
 * It extends the `CoreError` class and includes additional data related 
 * to the validation error.
 */
export default class ValidationError extends CoreError implements IValidationError {
    /**
     * ⚠️ Error name associated with this error.
     * 
     * @type {ErrorType.VALIDATION}
     */
    name: ErrorType.VALIDATION

    /**
     * 📜 HTTP status code associated with this error.
     * 
     * @type {StatusCodes.BAD_REQUEST}
     */
    httpStatus: StatusCodes.BAD_REQUEST

    /**
     * 🛠️ Creates a new instance of `ValidationError`.
     * 
     * @param {string} message - The message or description of the error.
     * @param {Record<string, unknown>} data - Additional data related to the validation error.
     * @param {Error} [error] - Optional original error that triggered this validation error.
     */
    constructor(
        readonly message: string,
        readonly data: Record<string, unknown>,
        readonly error?: Error
    ) {
        super(message, error)

        // ✏️ Sets the error name
        this.name = ErrorType.VALIDATION

        // ⚠️ Sets the HTTP status to 400 (BAD_REQUEST)
        this.httpStatus = StatusCodes.BAD_REQUEST
    }
}
