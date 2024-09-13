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

// ==== INTERFACES ====
export interface BaseErrorInterface {
     name: string
     httpStatus: number
     readonly title: string
     readonly e?: Error | null
}

/**
 * Base Error - Default HTTP Status 500
 */
class BaseError extends Error implements BaseErrorInterface {
    httpStatus: number

    constructor(
        public title: string,
        public e?: Error
    ) {
        super(title)
 
        this.name = 'BaseError'
        this.httpStatus = 500

        this.title = title
        this.e = e
    }
}

export default BaseError