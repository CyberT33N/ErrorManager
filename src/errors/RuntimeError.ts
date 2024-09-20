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

import BaseError from './BaseError'

import { HttpStatus, ErrorType } from '../index'
import type { ErrorDataInterface } from '../index'


/**
 * @class RuntimeError
 * @extends BaseError
 * 
 * This class represents an error that occurs during the runtime of an application.
 * It extends the `BaseError` class and allows for specifying an HTTP status code.
 */
export default class RuntimeError extends BaseError implements ErrorDataInterface {
    /**
     * Creates a new instance of `RuntimeError`
     * 
     * @param {string} title - The title or description of the error
     * @param {Error} error - The original error that triggered this runtime error
     * @param {HttpStatus} httpStatus - Optional HTTP status code, default is 500 (INTERNAL_SERVER_ERROR)
     */
    constructor(
        readonly title: string,
        readonly error: Error,
        readonly httpStatus: number = HttpStatus.INTERNAL_SERVER_ERROR
    ) {
        super(title, error)

        // Sets the error name to RuntimeError
        this.name = ErrorType.RUNTIME
    }
}