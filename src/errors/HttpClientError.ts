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

import BaseError from './BaseError'

import { HttpStatus, ErrorType } from '../index'
import type { BaseErrorInterface } from './BaseError'

import type {
    AxiosResponseHeaders,
    RawAxiosRequestHeaders, AxiosHeaderValue,
    AxiosError
} from 'axios'

export type AxiosErrorData = {
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
export default class HttpClientError extends BaseError implements HttpClientErrorDataInterface {
    /**
     * Collected error data from the failed request
     * 
     * @type {AxiosErrorData}
     */
    data: AxiosErrorData

    /**
     * Creates a new instance of `HttpClientError`
     * 
     * @param {string} message - The message or description of the error
     * @param {AxiosError} error - The original Axios error that triggered the HTTP failure
     */
    constructor(
        readonly message: string,
        readonly error: AxiosError
    ) {
        super(message, error)

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