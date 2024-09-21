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
export { default as BaseError } from './errors/BaseError'
export { default as ValidationError } from './errors/ValidationError'
export { default as RuntimeError } from './errors/RuntimeError'
export { default as ResourceNotFoundError } from './errors/ResourceNotFoundError'
export { default as HttpClientError } from './errors/HttpClientError'

// ==== MIDDLEWARE ====
export { default as errorMiddleware }  from './middleware'

// ==== ENUM ====
export enum HttpStatus {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export enum ErrorType {
    DEFAULT = 'Error',
    BASE = 'BaseError',
    VALIDATION = 'ValidationError',
    RUNTIME = 'RuntimeError',
    RESOURCE_NOT_FOUND = 'ResourceNotFoundError',
    HTTP_CLIENT = 'HttpClientError'
}

export { SanitizedMessage } from './middleware'

// ==== INTERFACES ====
import type { BaseErrorInterface } from './errors/BaseError'
export type { BaseErrorInterface }

export interface ErrorDataInterface extends BaseErrorInterface {
    data?: object
}

export type {
    AxiosErrorData, HttpClientErrorDataInterface
} from './errors/HttpClientError'

export type {
    ErrorResponseInterface,
    ErrorResponseFullInterface,
    ErrorResponseSanitizedInterface
} from './middleware'