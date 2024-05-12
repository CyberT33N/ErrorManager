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
 *
 */
const _sendError = function(this: any) {
    if(!this.res) {
        // throw new Error('ErrorManager - Can not find this.res')
        console.log('ErrorManager - Can not find this.res')
    }

    const { e, title, data, httpStatus, name } = this
    console.log('e: ', e)
    console.log('data: ', data)
    console.log('httpStatus: ', httpStatus)

    // If e.message use e.message
    // If e.message not exist check if e exist
    // If e not exist check if msg exist
    // If title not exist use fallback
    if(!e && !title){
        throw new Error('error and title is missing')
    }

    // Base will be always there does not matter which npm_lifecycle_event
    const base = {
        name,
        environment: process.env.npm_lifecycle_event,
        timestamp: new Date().toISOString(),
        title
    }
    console.log('base: ', base)

    // Full error with error message and stack
    const fullError = {
        ...base,
        ...(e ? { error: e } : {}),
        ...(data ? { data } : {}),
        stack: e?.stack
    }
    console.log('fullError: ', fullError)

    // If npm_lifecycle_event is start we sanitize the error message and stacktrace
    const fullErrorSanitized = {
        ...base,
        ...(e ? { error: process.env.npm_lifecycle_event === 'start' ? null : e.toString() } : {}),
        ...(data ? { data: process.env.npm_lifecycle_event === 'start' ? null : data } : {}),
        stack: process.env.npm_lifecycle_event === 'start' ? null : e?.stack
    }

    // console.log('fullErrorSanitized: ', fullErrorSanitized)
    this.res?.status(httpStatus).json(fullErrorSanitized)
    throw new Error(JSON.stringify(fullError, null, 4))
}

/**
 * Handle errors
 */
class ErrorManager {
    static instance: any
    req!: object
    res!: object
    sendError: Function

    constructor(req: object = {}, res: object = {}) {
        if (!ErrorManager.instance) {
            ErrorManager.instance = this
        }

        if (req && res) {
            this.req = req
            this.res = res
            ErrorManager.instance = this
        }

        this.sendError = _sendError.bind(this)

        return ErrorManager.instance
    }

    static middleware = (req: object, res: object) => {
        new ErrorManager(req, res)
    }
}

/**
 * Default error handling by adding stacktrace
 * Use any thing else than npm_lifecycle_event=start for including stacktrace and error in response to client
 */
class BaseError extends ErrorManager {
    title: string
    e: Error
    httpStatus: number
    name: string
    
    constructor(title: string, e: Error) {
        super()

        this.title = title
        this.e = e
        this.httpStatus = 500
        this.name = 'BaseError'

        this.sendError()
    }
}

/**
 * Validation Error - Default HTTP Status 400 - Additional with data object
 */
class ValidationError extends ErrorManager {
    title: string
    e: Error
    data: object
    httpStatus: number
    name: string

    constructor(title: string, e: Error, data: object) {
        super()

        this.title = title
        this.e = e
        this.data = data
        this.httpStatus = 400
        this.name = 'ValidationError'

        this.sendError()
    }
}

/**
 * Validation Error - Default HTTP Status 400 - Additional with data object
 */
class ResourceNotFoundError extends ErrorManager {
    title: string
    e: Error
    data: object
    httpStatus: number
    name: string

    constructor(title: string, data: object, e: Error) {
        super()

        this.title = title
        this.e = e
        this.data = data
        this.httpStatus = 404
        this.name = 'ResourceNotFoundError'

        this.sendError()
    }
}

/**
 * Runtime Error - Custom HTTP Status
 */
class RuntimeError extends ErrorManager {
    title: string
    e: Error
    httpStatus: number
    name: string

    constructor(title: string, e: Error, httpStatus = 500) {
        super()

        this.title = title
        this.e = e
        this.httpStatus = httpStatus
        this.name = 'RuntimeError'

        this.sendError()
    }
}

export default {
    ErrorManager,
    BaseError,
    ValidationError,
    RuntimeError,
    ResourceNotFoundError
}


