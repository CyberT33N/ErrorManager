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
 * @class ResourceNotFoundError
 * @extends BaseError
 * @implements ErrorDataInterface
 * 
 * This class represents an error indicating that a requested resource was not found.
 * It extends `BaseError` and implements the `ErrorDataInterface`.
 */
class ResourceNotFoundError extends BaseError implements ErrorDataInterface {
    /**
     * Creates a new instance of `ResourceNotFoundError`
     * 
     * @param {string} title - The title or description of the error
     * @param {ErrorDataInterface} data - Additional data related to the error
     * @param {Error} [e] - Optional original error that caused this error
     */
    constructor(
        readonly title: string,
        readonly data: ErrorDataInterface,
        readonly e?: Error
    ) {
        super(title, e)

        // Sets the error name to ResourceNotFoundError
        this.name = ErrorType.RESOURCE_NOT_FOUND

        // Sets the HTTP status to 404 (NOT_FOUND)
        this.httpStatus = HttpStatus.NOT_FOUND
    }
}

export default ResourceNotFoundError