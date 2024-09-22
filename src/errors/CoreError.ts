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
    environment: string
    timestamp: string
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
     * The environment in which the error occurred
     * 
     * @type {string}
     */
    environment: string

    /**
     * The timestamp when the error occurred
     * 
     * @type {string}
     */
    timestamp: string

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

        this.environment = process.env.npm_lifecycle_event!
        this.timestamp = new Date().toISOString()
    }
}