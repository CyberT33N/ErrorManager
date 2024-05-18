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

/**
 * Base Error - Default HTTP Status 500
 */
class BaseError extends Error {
    name: string
    title: string
    e: Error | null
    httpStatus: number

    constructor(title: string, e: Error | null = null) {
        super(title)

        this.name = 'BaseError'
        this.title = title
        this.e = e
        this.httpStatus = 500
    }
}

/**u
 * Validation Error - Default HTTP Status 400 - Additional with data object
 */
class ValidationError extends BaseError {
    name: string
    data: object
    httpStatus: number

    constructor(title: string, data: object) {
        super(title)
 
        this.name = 'ValidationError'
        this.data = data
        this.httpStatus = 400
    }
}

/**
 * ResourceNotFound Error - Default HTTP Status 400 - Additional with data object
 */
class ResourceNotFoundError extends BaseError {
    name: string
    data: object
    httpStatus: number

    constructor(title: string, data: object, e: Error) {
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
class HttpClientError extends BaseError {
    name: string
    data: object

    constructor (title: string, e: {
        statusCode: number,
        options: {
            uri: string,
            method: string
        },
        response: {
            status: number,
            config: {
                url: string,
                method: string,
                data: any
            },
            data: any,
            headers: any
        },
        message: string,
        handlebarsError?: any,
        config: any
    }) {
        super(title)

        const status = e.statusCode || e.response?.status
        const url = e.options?.uri || e.response?.config?.url || e.config?.url
        const method = e.options?.method || e.response?.config?.method || e.config?.method
        const payload = e.config?.data || e.response?.config.data
        const headers = e.response?.headers
        const errorMessage = e.message
        const responseData = e.response?.data

        const additional = {
            ...(e.handlebarsError ? { handlebarsError: e.handlebarsError } : {})
        }

        const config = e.config
        delete e.config?.httpsAgent
        delete e.config?.httpAgent

        this.name = 'HttpClientError'
        this.httpStatus = status || 500
        this.data = {
            url, method, payload, headers,
            responseData,
            errorMessage, e,
            additional, config,
        }
    }
}


/**
 * Runtime Error - Custom HTTP Status
 */
class RunTimeError extends BaseError {
    httpStatus: number
    name: string

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