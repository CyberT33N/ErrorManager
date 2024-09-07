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
 * ResourceNotFound Error - Default HTTP Status 400 - Additional with data object
 */
class ResourceNotFoundError extends BaseError implements DataInterface {
    name
    data
    httpStatus

    constructor(title: string, data: object, e?: Error) {
        super(title, e)

        this.name = 'ResourceNotFoundError'
        this.data = data
        this.httpStatus = 404
    }
}

export default ResourceNotFoundError