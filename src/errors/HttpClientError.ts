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

// ==== ERROR CLASSES ====
import BaseError, { BaseErrorInterface } from './BaseError'

// ==== EXTERNAL TYPES ====
import {
    AxiosError, AxiosResponseHeaders,
    RawAxiosRequestHeaders, AxiosHeaderValue
} from 'axios'

// ==== INTERNAL TYPES ====
type AxiosErrorData = {
    url: string | undefined
    method: string | undefined
    payload: unknown
    headers: AxiosResponseHeaders | Partial<RawAxiosRequestHeaders & {
        Server: AxiosHeaderValue;
        'Content-Type': AxiosHeaderValue;
        'Content-Length': AxiosHeaderValue;
        'Cache-Control': AxiosHeaderValue;
        'Content-Encoding': AxiosHeaderValue;
    }> | undefined;
    responseData: unknown
    errorMessage: string
    error: AxiosError
}

export interface HttpClientErrorDataInterface extends BaseErrorInterface {
    data: AxiosErrorData
}


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
     * @param {AxiosError} e - The original Axios error that triggered the HTTP failure
     */
    constructor(
        readonly title: string,
        readonly e: AxiosError
    ) {
        super(title)

        const { config, response } = e

        const data = {
            url: config?.url,
            method: config?.method,
            payload: config?.data,
            responseData: response?.data,
            headers: config?.headers,
            errorMessage: e.message,
            error: e
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