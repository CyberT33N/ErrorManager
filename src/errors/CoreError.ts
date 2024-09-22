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

/**
 * @interface CoreErrorInterface
 * @extends Error
 * 
 * Interface for custom error classes. Because the middleware is handling aswell normal javascript errors,
 * the properties listed below must be optional.
 */
export interface CoreErrorInterface extends Error {
    error?: Error
    data?: Record<string, unknown>
    httpStatus?: StatusCodes
}

/**
 * @class CoreError
 * @extends Error
 * @implements CoreErrorInterface
 * 
 * This class serves as a base class for creating custom error types.
 * It extends the native `Error` class and implements the `CoreErrorInterface`.
 * Only difference compared to error is this.error
 */
export default class CoreError extends Error implements CoreErrorInterface {
    /**
     * Creates a new instance of `CoreError`
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
    }
}