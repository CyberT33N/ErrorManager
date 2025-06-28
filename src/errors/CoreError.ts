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
 * ✨ Interface for custom error classes.
 * 
 * This interface extends the native Error class, adding custom properties
 * that may be useful for handling errors in a consistent manner.
 * The properties are optional to accommodate standard JavaScript errors.
 * 
 * @interface ICoreError
 * @extends Error
 * @property {Error} [error] - Optional original error that caused this error
 * @property {object} [data] - Optional additional data related to the error
 * @property {StatusCodes} [httpStatus] - Optional HTTP status code for the error
 * @property {string} environment - The environment in which the error occurred
 * @property {string} timestamp - The timestamp when the error occurred
 */
export interface ICoreError extends Error {
    error?: Error
    data?: Record<string, unknown>
    httpStatus?: StatusCodes
    environment: string
    timestamp: string
}

/**
 * ⚠️ This class serves as a base class for creating custom error types.
 * 
 * It extends the native `Error` class and implements the `ICoreError` interface.
 * This allows for the creation of errors with additional contextual information.
 * 
 * @class CoreError
 * @extends Error
 * @implements ICoreError
 */
export default class CoreError extends Error implements ICoreError {
    /**
     * 🌍 The environment in which the error occurred
     * 
     * @type {string}
     */
    environment: string

    /**
     * ⏰ The timestamp when the error occurred
     * 
     * @type {string}
     */
    timestamp: string

    /**
     * 🛠️ Creates a new instance of `CoreError`
     * 
     * This constructor initializes the error message and optional original error.
     * It also sets the environment and timestamp properties for context.
     * 
     * @param {string} message - The message or description of the error
     * @param {Error} [error] - Optional original error that caused this error
     */
    constructor(
        // The original Error of JavaScript contains message and stack
        readonly message: string,
        readonly error?: Error
    ) {
        super(message)

        this.environment = process.env.npm_lifecycle_event!
        this.timestamp = new Date().toISOString()
        console.error(this)
    }
}
