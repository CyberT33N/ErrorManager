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

        // Default values
        this.httpStatus = 500
        this.offline = true
        this.sended = false

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
 */
class BaseError extends ErrorManager {
    /**
     * constructor
     * @param {string} e - Error
     * @param {string} msg - Error message
     * @param {string} httpStatus - HTTP status code
     * @returns {Promise<*[]>} - void
     */
    constructor(e, msg, offline) {
        super()

        let errorMessage = e.message ? e.message : (e ? e : msg)

        if(!errorMessage){
            throw new Error('Error or message missing')
        }

        this.offline = offline ? true : false

        this.fullError = {
            title: msg,
            errorMessage: errorMessage,
            stack: e.stack ? e.stack : undefined
        }

        if(this.res && !this.offline) {
            this.res.status(this.httpStatus).send(this.fullError)
            this.sended = true
        } else {
            throw new Error(JSON.stringify(this.fullError, null, 4))
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
        super(e, msg)

        httpStatus ? httpStatus : this.httpStatus

        if(!this.sended) {
            this.res.status(httpStatus).send(this.fullError)
        }
    }
}


// eslint-disable-next-line no-use-before-define
global.BaseError = BaseError
// eslint-disable-next-line no-use-before-define
global.RuntimeError = RuntimeError

export default ErrorManager


