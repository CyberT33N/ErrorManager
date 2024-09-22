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
export { 
    default as BaseError,
    type BaseErrorInterface
} from './errors/BaseError'

export {
    default as ValidationError,
    type ValidationErrorInterface
} from './errors/ValidationError'

export {
    default as RuntimeError,
    type RuntimeErrorInterface
} from './errors/RuntimeError'

export {
    default as ResourceNotFoundError,
    type ResourceNotFoundErrorInterface
} from './errors/ResourceNotFoundError'

export {
    default as HttpClientError,
    type AxiosErrorData, type HttpClientErrorInterface
} from './errors/HttpClientError'

// ==== MIDDLEWARE ====
export {
    default as errorMiddleware,
    type ErrorResponseSanitizedInterface,
    SanitizedMessage
}  from './middleware'

// ==== ENUMS ====
export { StatusCodes } from 'http-status-codes'

export enum ErrorType {
    DEFAULT = 'Error',
    BASE = 'BaseError',
    VALIDATION = 'ValidationError',
    RUNTIME = 'RuntimeError',
    RESOURCE_NOT_FOUND = 'ResourceNotFoundError',
    HTTP_CLIENT = 'HttpClientError'
}