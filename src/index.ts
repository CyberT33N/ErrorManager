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
    type IBaseError
} from './errors/BaseError'

export {
    default as ValidationError,
    type IValidationError
} from './errors/ValidationError'

export {
    default as RuntimeError,
    type IRuntimeError
} from './errors/RuntimeError'

export {
    default as ResourceNotFoundError,
    type IResourceNotFoundError
} from './errors/ResourceNotFoundError'

export {
    default as HttpClientError,
    type AxiosErrorData, type IHttpClientError
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