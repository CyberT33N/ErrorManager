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

import { ErrorType } from '../index'
import { StatusCodes } from 'http-status-codes'
import { type ICoreError, default as CoreError } from './CoreError'

/**
 * @interface IBaseError
 * @extends ICoreError
 * 
 * Represents a base error with a specific HTTP status code.
 * The HTTP status code is always 500 (INTERNAL_SERVER_ERROR).
 */
export interface IBaseError extends ICoreError {
    /** 
     * @type {ErrorType.BASE} 
     * The name of the error type.
     */
    name: ErrorType.BASE;

    /** 
     * @type {StatusCodes.INTERNAL_SERVER_ERROR} 
     * The HTTP status code for this error.
     */
    httpStatus: StatusCodes.INTERNAL_SERVER_ERROR;
}

/**
 * @class BaseError
 * @extends CoreError
 * @implements IBaseError
 * 
 * This class serves as a base class for creating custom error types.
 * It extends the `CoreError` class and implements the `IBaseError` interface.
 */
export default class BaseError extends CoreError implements IBaseError {
    /** 
     * ⚠️ Error name associated with this error
     * 
     * @type {ErrorType.BASE}
     */
    name: ErrorType.BASE

    /** 
     * 🚫 HTTP status code associated with this error
     * 
     * @type {StatusCodes.INTERNAL_SERVER_ERROR}
     */
    httpStatus: StatusCodes.INTERNAL_SERVER_ERROR

    /** 
     * 🛠️ Creates a new instance of `BaseError`
     * 
     * @param {string} message - The message or description of the error.
     * @param {Error} [error] - Optional original error that caused this error.
     */
    constructor(
        // 🔍 The original Error of JavaScript contains message and stack
        readonly message: string,
        readonly error?: Error
    ) {
        super(message, error)

        // ✏️ Sets the error name
        this.name = ErrorType.BASE

        // ⚠️ Sets the default HTTP status to 500 (INTERNAL_SERVER_ERROR)
        this.httpStatus = StatusCodes.INTERNAL_SERVER_ERROR
    }
}
