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
    InternalAxiosRequestConfig,
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
    config: InternalAxiosRequestConfig | undefined
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
        e: AxiosError
    ) {
        super(title)

        // HTTP status code (if available), default is 500 (INTERNAL_SERVER_ERROR)
        const status = e.response?.status || HttpStatus.INTERNAL_SERVER_ERROR

        // Requested URL (if available)
        const url = e.response?.config?.url || e.config?.url

        // HTTP method of the request (e.g. GET, POST)
        const method = e.response?.config?.method || e.config?.method

        // Data sent in the request (if available)
        const payload = e.config?.data || e.response?.config.data

        // Response headers (if available)
        const headers = e.response?.headers

        // Original error message from Axios
        const errorMessage = e.message

        // Response data (if available)
        const responseData = e.response?.data

        // Request configuration from Axios (without httpsAgent and httpAgent)
        const config = e.config
        delete e.config?.httpsAgent
        delete e.config?.httpAgent

        // Sets the error type to HttpClientError
        this.name = ErrorType.HTTP_CLIENT

        // Sets the HTTP status
        this.httpStatus = status

        // Stores all relevant information in the data object
        this.data = {
            url, method, payload, headers,
            responseData,
            errorMessage, error: e,
            config
        }
    }
}

export default HttpClientError