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
const sendError = function() {
    if(!this.res) {
        throw new Error('ErrorManager - Can not find this.res')
    }

    const { e, msg, data, httpStatus } = this

    // If e.message use e.message
    // If e.message not exist check if e exist
    // If e not exist check if msg exist
    // If msg not exist use fallback
    const errorMessage = e?.message ? e?.message : (e ? e : (msg ? msg : undefined))

    if(!errorMessage){
        throw new Error('errorMessage is missing')
    }

    const base = { environment: process.env.npm_lifecycle_event, title: msg }

    // Full error with error message and stack
    const fullError = {
        ...base,
        errorMessage,
        stack: e?.stack,
        ...(data ? { data } : {})
    }

    // If npm_lifecycle_event is start we sanitize the error message and stacktrace
    const fullErrorSanitized = {
        ...base,
        errorMessage: process.env.npm_lifecycle_event === 'start' ? null : errorMessage,
        stack: process.env.npm_lifecycle_event === 'start' ? null : e?.stack,
        ...(data ? { data: process.env.npm_lifecycle_event === 'start' ? null : data } : {})
    }

    this.res.status(httpStatus).json(fullErrorSanitized)
    throw new Error(JSON.stringify(fullError, null, 4))
}

/**
 * Handle errors
 */
class ErrorManager {
    /**
     * Setting globals
     * @param {Object} req - req
     * @param {Object} res - res
     * @returns {Promise<void>} - void
     */
    constructor(req, res) {
        if (!ErrorManager.instance) {
            ErrorManager.instance = this
        }

        if (req && res) {
            this.req = req
            this.res = res
            ErrorManager.instance = this
        }

        this.sendError = sendError.bind(this)

        return ErrorManager.instance
    }

    /**
     * Middleware to inject req and res to ErrorManager
     * @param {Object} req - req
     * @param {Object} res - res
     * @param {Function} next - next
     * @returns {Promise<void>} - void
     */
    static middleware = (req, res) => {
        new ErrorManager(req, res)
    }
}

/**
 * Default error handling by adding stacktrace
 * Use any thing else than npm_lifecycle_event=start for including stacktrace and error in response to client
 */
class BaseError extends ErrorManager {
    /**
     * constructor
     * @param {object} msg - Error message
     * @param {string} e - Error
     * @param {string} httpStatus - HTTP status code
     * @returns {Promise<*[]>} - void
     */
    constructor(msg, e) {
        super()

        this.msg = msg
        this.e = e
        this.httpStatus = 500

        this.sendError()
    }
}

/**
 * Validation Error - Default HTTP Status 400 - Additional with data object
 */
class ValidationError extends ErrorManager {
    /**
     * constructor
     * @param {object} msg - Error message
     * @param {string} e - Error
     * @param {string} httpStatus - HTTP status code
     * @returns {Promise<*[]>} - void
     */
    constructor(msg, e, data) {
        super()

        this.msg = msg
        this.e = e
        this.data = data
        this.httpStatus = 400

        this.sendError()
    }
}

// eslint-disable-next-line no-use-before-define
global.BaseError = BaseError

// eslint-disable-next-line no-use-before-define
global.ValidationError = ValidationError

export default ErrorManager

/*

        // this.constructor.prototype.__proto__ = Error.prototype // Make this an instanceof Error.
        // Error.call(this) // Does not seem necessary. Perhaps remove this line?
        // Error.captureStackTrace(this, this.constructor) // Creates the this.stack getter
        // this.name = this.constructor.name; // Used to cause messages like "UserError: message" instead of the default "Error: message"
        // this.message = msg; // Used to set the message
        // this.timestamp = new Date().toISOString()

 */


