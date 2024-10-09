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

import type {
    AxiosResponseHeaders,
    AxiosError
} from 'axios'

export interface IAxiosErrorData {
    url: string | undefined
    method: string | undefined
    payload: unknown
    headers: AxiosResponseHeaders | undefined
    responseData: unknown
    errorMessage: string
}

/**
 * @interface IHttpClientError
 * @extends ICoreError
 * HTTP status code is same as response status code
 */
export interface IHttpClientError extends ICoreError {
    data: IAxiosErrorData
    name: ErrorType.HTTP_CLIENT
    httpStatus: StatusCodes
    error: AxiosError
}

/**
 * @class HttpClientError
 * @extends CoreError
 * @implements IHttpClientError
 * 
 * This class represents a specific error caused by a failed HTTP request via Axios.
 * It extends the `CoreError` class and implements the `IHttpClientError`.
 */
export default class HttpClientError extends CoreError implements IHttpClientError {
    /**
     * Collected error data from the failed request
     * 
     * @type {IAxiosErrorData}
     */
    data: IAxiosErrorData

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

        const data: IAxiosErrorData = {
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
        this.httpStatus = response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR

        // Stores all relevant information in the data object
        this.data = data
    }
}