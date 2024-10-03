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

import { type CoreErrorInterface, default as CoreError } from './CoreError'

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

/**
 * @interface IHttpClientError
 * @extends CoreErrorInterface
 * HTTP status code is same as response status code
 */
export interface IHttpClientError extends CoreErrorInterface {
    data: AxiosErrorData
    name: ErrorType.HTTP_CLIENT
    httpStatus: StatusCodes
}

/**
 * @class HttpClientError
 * @extends CoreError
 * @implements IHttpClientError
 * 
 * This class represents a specific error caused by a failed HTTP request via Axios.
 * It extends the `CoreError` class and implements the `HttpClientErrorDataInterface`.
 */
export default class HttpClientError extends CoreError implements IHttpClientError {
    /**
     * Collected error data from the failed request
     * 
     * @type {AxiosErrorData}
     */
    data: AxiosErrorData

    /**
     * Error name associated with this error
     * 
     * @type {ErrorType.HTTP_CLIENT}
     */
    name: ErrorType.HTTP_CLIENT

    /**
     * HTTP status code associated with this error
     * 
     * @type {StatusCodes}
     */
    httpStatus: StatusCodes

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
        this.httpStatus = response?.status || StatusCodes.INTERNAL_SERVER_ERROR

        // Stores all relevant information in the data object
        this.data = data
    }
}