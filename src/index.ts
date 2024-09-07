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

// ==== ERROR CLASSES ====
import BaseError, { BaseErrorInterface } from './errors/BaseError'
import ValidationError from './errors/ValidationError'
import RuntimeError from './errors/RuntimeError'
import ResourceNotFoundError from './errors/ResourceNotFoundError'
import HttpClientError from './errors/HttpClientError'

// ==== MIDDLEWARE ====
import errorMiddleware from './middleware'

// ==== GENERAL INTERNAL INTERFACES ====
export { BaseErrorInterface } from './errors/BaseError'
export { HttpClientErrorDataInterface } from './errors/HttpClientError'
export interface ErrorDataInterface extends BaseErrorInterface {
    data?: object
}

export {
    errorMiddleware,
    BaseError,
    ValidationError,
    RuntimeError,
    ResourceNotFoundError,
    HttpClientError
}
