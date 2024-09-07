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
import BaseError from './BaseError'

// ==== INTERFACES ====
import { DataInterface } from './index'

/**
 * Validation Error - Default HTTP Status 400 - Additional with data object
 */
class ValidationError extends BaseError implements DataInterface {
    name
    data
    httpStatus

    constructor(title: string, data: object, e?: Error) {
        super(title, e)
 
        this.name = 'ValidationError'
        this.data = data
        this.httpStatus = 400
    }
}

export default ValidationError