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
 * @interface IValidationError
 * @extends CoreErrorInterface
 * HTTP status code is always 400 (BAD_REQUEST)
 */
export interface IValidationError extends CoreErrorInterface {
    name: ErrorType.VALIDATION
    httpStatus: StatusCodes.BAD_REQUEST
}

/**
 * @class ValidationError
 * @extends CoreError
 * @implements CoreErrorInterface
 * 
 * This class represents an error that occurs due to validation failures.
 * It extends the `CoreError` class and includes additional data related to the validation error.
 */
export default class ValidationError extends CoreError implements IValidationError {
    /**
     * Error name associated with this error
     * 
     * @type {ErrorType.VALIDATION}
     */
    name: ErrorType.VALIDATION

    /**
     * HTTP status code associated with this error
     * 
     * @type {StatusCodes.BAD_REQUEST}
     */
    httpStatus: StatusCodes.BAD_REQUEST
  
    
    /**
     * Creates a new instance of `ValidationError`
     * 
     * @param {string} message - The message or description of the error
     * @param {Record<string, unknown>} data - Additional data related to the validation error
     * @param {Error} [error] - Optional original error that triggered this validation error
     */
    constructor(
        readonly message: string,
        readonly data: Record<string, unknown>,
        readonly error?: Error
    ) {
        super(message, error)

        // Sets the error name to VALIDATION
        this.name = ErrorType.VALIDATION

        // Sets the HTTP status to 400 (BAD_REQUEST)
        this.httpStatus = StatusCodes.BAD_REQUEST
    }
}