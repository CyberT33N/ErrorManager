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
import type { AxiosResponseHeaders, AxiosError } from 'axios'

/**
 * @interface IAxiosErrorData
 * @description Represents the error data structure for an Axios error.
 * 
 * @property {string | undefined} url - The URL that was requested.
 * @property {string | undefined} method - The HTTP method used for the request.
 * @property {unknown} payload - The request payload.
 * @property {AxiosResponseHeaders | undefined} headers - The request headers.
 * @property {unknown} responseData - The response data from the server.
 * @property {string} errorMessage - The error message returned by Axios.
 */
export interface IAxiosErrorData extends Record<string, unknown> {
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
 * @description Represents an error related to HTTP client issues.
 * 
 * The HTTP status code corresponds to the response status code.
 * 
 * @property {IAxiosErrorData} data - The detailed error data.
 * @property {ErrorType.HTTP_CLIENT} name - The error type identifier.
 * @property {StatusCodes} httpStatus - The HTTP status code.
 * @property {AxiosError} error - The original Axios error.
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
 * @description This class represents a specific error caused by a failed 
 * HTTP request via Axios. It extends the `CoreError` class and implements
 * the `IHttpClientError` interface.
 */
export default class HttpClientError extends CoreError implements IHttpClientError {
    /**
     * 🌐 Collected error data from the failed request.
     * 
     * @type {IAxiosErrorData}
     */
    data: IAxiosErrorData

    /**
     * 🔍 Error name associated with this error.
     * 
     * @type {ErrorType.HTTP_CLIENT}
     */
    name: ErrorType.HTTP_CLIENT

    /**
     * 🚦 HTTP status code associated with this error.
     * 
     * @type {StatusCodes}
     */
    httpStatus: StatusCodes

    /**
     * 🏗️ Creates a new instance of `HttpClientError`.
     * 
     * @param {string} message - The message or description of the error.
     * @param {AxiosError} error - The original Axios error that triggered 
     * the HTTP failure.
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

        // ✏️ Sets the error name
        this.name = ErrorType.HTTP_CLIENT

        // ⚠️ HTTP status code (if available), default is 500 (INTERNAL_SERVER_ERROR).
        this.httpStatus = response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR

        // 📊 Stores all relevant information in the data object.
        this.data = data
    }
}
