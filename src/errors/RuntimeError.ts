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
 * 
 * This interface represents a runtime error in the application, which has a default HTTP status
 * code of 500 (INTERNAL_SERVER_ERROR).
 */
export interface IRuntimeError extends ICoreError {
    /** ✨ The name of the error, specifically set to ErrorType.RUNTIME */
    name: ErrorType.RUNTIME
    /** 🚫 The HTTP status code indicating an internal server error (500) */
    httpStatus: StatusCodes.INTERNAL_SERVER_ERROR
}

/**
 * @class RuntimeError
 * @extends CoreError
 * @implements ICoreError
 * 
 * This class represents an error that occurs during the runtime of an application. It 
 * extends the `CoreError` class and allows for specifying an HTTP status code.
 */
export default class RuntimeError extends CoreError implements IRuntimeError {
    /** ✏️ Error name associated with this error */
    name: ErrorType.RUNTIME

    /**
     * Creates a new instance of `RuntimeError`
     * 
     * @param {string} message - The message or description of the error
     * @param {StatusCodes} httpStatus - HTTP status code, default is 500 
     * (INTERNAL_SERVER_ERROR)
     * @param {Error} [error] - The original error that triggered this runtime error
     */
    constructor(
        readonly message: string,
        readonly httpStatus: number = StatusCodes.INTERNAL_SERVER_ERROR,
        readonly error?: Error
    ) {
        // 🛠️ Calls the parent class (CoreError) constructor with the error message and original error
        super(message, error)

        // ✏️ Sets the error name
        this.name = ErrorType.RUNTIME
    }
}
