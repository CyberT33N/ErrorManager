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
export type { BaseErrorInterface } from './errors/BaseError'
export type { HttpClientErrorDataInterface } from './errors/HttpClientError'

// ==== ENUM ====
export enum HttpStatus {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export enum ErrorType {
    BASE = 'BaseError',
    VALIDATION = 'ValidationError',
    RUNTIME = 'RuntimeError',
    RESOURCE_NOT_FOUND = 'ResourceNotFoundError',
    HTTP_CLIENT = 'HttpClientError'
}

// ==== INTERFACE ====
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
