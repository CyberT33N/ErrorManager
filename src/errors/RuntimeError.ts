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

// ==== ENUM ====
import { HttpStatus, ErrorType } from '../index'

// ==== ERROR CLASSES ====
import BaseError from './BaseError'

/**
 * @class RuntimeError
 * @extends BaseError
 * 
 * This class represents an error that occurs during the runtime of an application.
 * It extends the `BaseError` class and allows for specifying an HTTP status code.
 */
class RuntimeError extends BaseError {
    /**
     * Creates a new instance of `RuntimeError`
     * 
     * @param {string} title - The title or description of the error
     * @param {Error} e - The original error that triggered this runtime error
     * @param {HttpStatus} httpStatus - Optional HTTP status code, default is 500 (INTERNAL_SERVER_ERROR)
     */
    constructor(
        readonly title: string,
        readonly e: Error,
        readonly httpStatus: number = HttpStatus.INTERNAL_SERVER_ERROR
    ) {
        super(title, e)

        // Sets the error name to RuntimeError
        this.name = ErrorType.RUNTIME
    }
}

export default RuntimeError