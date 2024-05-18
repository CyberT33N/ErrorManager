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
    title: string
    e: Error
    httpStatus: number
    name: string

    constructor(title: string, e: Error) {
        super(title)

        this.title = title
        this.e = e
        this.httpStatus = 500
        this.name = 'BaseError'
    }
}

/**
 * Validation Error - Default HTTP Status 400 - Additional with data object
 */
class ValidationError extends BaseError {
    data: object
    httpStatus: number
    name: string

    constructor(title: string, e: Error, data: object) {
        super(title, e)

        this.data = data
        this.httpStatus = 400
        this.name = 'ValidationError'
    }
}

/**
 * Validation Error - Default HTTP Status 400 - Additional with data object
 */
class ResourceNotFoundError extends BaseError {
    data: object
    httpStatus: number
    name: string

    constructor(title: string, data: object, e: Error) {
        super(title, e)

        this.data = data
        this.httpStatus = 404
        this.name = 'ResourceNotFoundError'
    }
}

/**
 * Runtime Error - Custom HTTP Status
 */
class RuntimeError extends BaseError {
    httpStatus: number
    name: string

    constructor(title: string, e: Error, httpStatus = 500) {
        super(title, e)

        this.httpStatus = httpStatus
        this.name = 'RuntimeError'
    }
}

export default {
    BaseError,
    ValidationError,
    RuntimeError,
    ResourceNotFoundError
}