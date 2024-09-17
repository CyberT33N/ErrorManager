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

// ==== INTERFACES ====
import type { HttpClientErrorDataInterface, AxiosErrorData } from './HttpClientError.d'
export type { HttpClientErrorDataInterface, AxiosErrorData }

// ==== EXTERNAL TYPES ====
import { AxiosError } from 'axios'

// ==== ERROR CLASSES ====
import BaseError from './BaseError'

/**
 * @class HttpClientError
 * @extends BaseError
 * @implements HttpClientErrorDataInterface
 * 
 * This class represents a specific error caused by a failed HTTP request via Axios.
 * It extends the `BaseError` class and implements the `HttpClientErrorDataInterface`.
 */
class HttpClientError extends BaseError implements HttpClientErrorDataInterface {
    /**
     * Collected error data from the failed request
     * 
     * @type {AxiosErrorData}
     */
    data: AxiosErrorData

    /**
     * Creates a new instance of `HttpClientError`
     * 
     * @param {string} title - The title or description of the error
     * @param {AxiosError} error - The original Axios error that triggered the HTTP failure
     */
    constructor(
        readonly title: string,
        readonly error: AxiosError
    ) {
        super(title, error)

        const { config, response } = error

        const data = {
            url: config?.url,
            method: config?.method,
            payload: config?.data,
            responseData: response?.data,
            headers: config?.headers,
            errorMessage: error.message
        }

        // Sets the error type to HttpClientError
        this.name = ErrorType.HTTP_CLIENT

        // HTTP status code (if available), default is 500 (INTERNAL_SERVER_ERROR)
        this.httpStatus = response?.status || HttpStatus.INTERNAL_SERVER_ERROR

        // Stores all relevant information in the data object
        this.data = data
    }
}

export default HttpClientError