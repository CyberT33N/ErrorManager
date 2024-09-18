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

// ==== [IMPORT] INTERFACE ====
import { ErrorDataInterface } from './index'

// ==== [CREATION] ENUM ====
export enum SanitizedMessage {
    DEFAULT = '[SANITIZED]'
}

// ==== [CREATION] INTERFACE ====
interface ErrorResponseInterface extends ErrorDataInterface {
    environment: string
    timestamp: string
}

interface ErrorResponseFullInterface extends ErrorResponseInterface {
    stack: string | undefined
}

interface ErrorResponseSanitizedInterface extends ErrorResponseInterface {
     error: string | SanitizedMessage.DEFAULT | ErrorDataInterface['error']
     data: SanitizedMessage.DEFAULT | ErrorDataInterface['data']
     stack: ErrorResponseFullInterface['stack']
}

export {
    ErrorResponseInterface,
    ErrorResponseFullInterface,
    ErrorResponseSanitizedInterface
}