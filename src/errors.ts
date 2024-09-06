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

import { AxiosError } from 'axios'

export interface BaseErrorInterface {
    name: string
    title: string
    e?: Error | null
    httpStatus: number
}

export interface DataInterface extends BaseErrorInterface {
    data: object
}

/**
 * Base Error - Default HTTP Status 500
 */
class BaseError extends Error implements BaseErrorInterface {
    title
    e
    httpStatus

    constructor(title: string, e?: Error) {
        super(title)

        this.name = 'BaseError'
        this.title = title

        if (e) {
            this.e = e
        }

        this.httpStatus = 500
    }
}

/**
 * Validation Error - Default HTTP Status 400 - Additional with data object
 */
class ValidationError extends BaseError implements DataInterface {
    name
    data
    httpStatus

    constructor(title: string, data: object, e?: Error) {
        super(title, e)
 
        this.name = 'ValidationError'
        this.data = data
        this.httpStatus = 400
    }
}

/**
 * ResourceNotFound Error - Default HTTP Status 400 - Additional with data object
 */
class ResourceNotFoundError extends BaseError  implements DataInterface {
    name
    data
    httpStatus

    constructor(title: string, data: object, e?: Error) {
        super(title, e)

        this.name = 'ResourceNotFoundError'
        this.data = data
        this.httpStatus = 404
    }
}

/**
 * HTTP Client Error - Default HTTP Status 400 - Additional with data object
 * At the moment only configured for axios
 */
class HttpClientError extends BaseError implements DataInterface {
    name
    data

    constructor(title: string, e: AxiosError) {
        super(title)

        const status = e.response?.status
        const url = e.response?.config?.url || e.config?.url
        const method = e.response?.config?.method || e.config?.method
        const payload = e.config?.data || e.response?.config.data
        const headers = e.response?.headers
        const errorMessage = e.message
        const responseData = e.response?.data

        const config = e.config
        delete e.config?.httpsAgent
        delete e.config?.httpAgent

        this.name = 'HttpClientError'
        this.httpStatus = status || 500

        this.data = {
            url, method, payload, headers,
            responseData,
            errorMessage, e,
            config
        }
    }
}

/**
 * Runtime Error - Custom HTTP Status
 */
class RunTimeError extends BaseError {
    httpStatus
    name

    constructor(title: string, e: Error, httpStatus = 500) {
        super(title, e)

        this.httpStatus = httpStatus
        this.name = 'RunTimeError'
    }
}

export default {
    BaseError,
    ValidationError,
    RunTimeError,
    ResourceNotFoundError,
    HttpClientError
}