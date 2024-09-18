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

// ==== TYPES ====
export type { HttpClientErrorDataInterface } from './errors/HttpClientError'
export type { BaseErrorInterface } from './errors/BaseError'
export type { ErrorDataInterface } from './index.d'

export type { 
    ErrorResponseInterface,
    ErrorResponseFullInterface,
    ErrorResponseSanitizedInterface
} from './middleware'

// ==== ENUMS ====
export { HttpStatus, ErrorType } from './index.d'