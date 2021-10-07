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
'use strict'

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

        // Default status code
        this.httpStatus = 400

        return ErrorManager.instance
    }

    /**
     * Middleware to inject req and res to ErrorManager
     * @param {Object} req - req
     * @param {Object} res - res
     * @param {Function} next - next
     * @returns {Promise<void>} - void
     */
    static middleware = (req, res, next) => {
        new ErrorManager(req, res)
        next()
    }
}

/**
 * Default error handling by adding stacktrace
 */
class BaseError extends ErrorManager {
    /**
     * constructor
     * @param {string} e - Error
     * @param {string} msg - Error message
     * @param {string} httpStatus - HTTP status code
     * @returns {Promise<*[]>} - void
     */
    constructor(e, msg, httpStatus) {
        super()

        this.fullError = {
            title: msg,
            errorMessage: e.message,
            stack: e.stack
        }
    }
}

/**
 * Extends BaseError with HTTP Statuscode
 */
class RuntimeError extends BaseError {
    /**
     * constructor
     * @param {string} e - Error
     * @param {string} msg - Error message
     * @param {string} httpStatus - HTTP status code
     * @returns {Promise<*[]>} - void
     */
    constructor(e, msg, httpStatus) {
        super(e, msg, httpStatus)
        httpStatus = httpStatus ? httpStatus : this.httpStatus
        this.res.status(httpStatus).send(this.fullError)
    }
}


// eslint-disable-next-line no-use-before-define
global.BaseError = BaseError
// eslint-disable-next-line no-use-before-define
global.RuntimeError = RuntimeError

module.exports = ErrorManager


