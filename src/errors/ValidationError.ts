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

// ==== INTERFACES ====
import { ErrorDataInterface } from '../index'

/**
 * @class ValidationError
 * @extends BaseError
 * @implements ErrorDataInterface
 * 
 * This class represents an error that occurs due to validation failures.
 * It extends the `BaseError` class and includes additional data related to the validation error.
 */
class ValidationError extends BaseError implements ErrorDataInterface {
    /**
     * Creates a new instance of `ValidationError`
     * 
     * @param {string} title - The title or description of the error
     * @param {ErrorDataInterface} data - Additional data related to the validation error
     * @param {Error} [e] - Optional original error that triggered this validation error
     */
    constructor(
        readonly title: string,
        readonly data: object,
        readonly e?: Error
    ) {
        super(title, e)

        // Sets the error name to VALIDATION
        this.name = ErrorType.VALIDATION

        // Sets the HTTP status to 400 (BAD_REQUEST)
        this.httpStatus = HttpStatus.BAD_REQUEST
    }
}

export default ValidationError