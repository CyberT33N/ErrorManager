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

const errorHandler = (
    err: any,
    req: object,
    res: {
            status: Function,
            json: Function
    },
    next: Function
) => {
    const { e, title, data, httpStatus, name } = err

    // Base will be always there does not matter which npm_lifecycle_event
    const base = {
        name,
        environment: process.env.npm_lifecycle_event,
        timestamp: new Date().toISOString(),
        title
    }

    // Full error with error message and stack
    const fullError = {
        ...base,
        ...(e ? { error: e } : {}),
        ...(data ? { data } : {}),
        stack: e?.stack
    }

    // If npm_lifecycle_event is start we sanitize the error message and stacktrace
    const fullErrorSanitized = {
        ...base,

        ...(e ? {
            error: process.env.npm_lifecycle_event === 'start' ? null : e.toString()
        } : {}),

        ...(data ? {
            data: process.env.npm_lifecycle_event === 'start' ? null : data
        } : {}),

        stack: process.env.npm_lifecycle_event === 'start' ? null : e?.stack
    }

    console.error('[ErrorManager] Full Error: ', fullError)
    res.status(httpStatus).json(fullErrorSanitized)
}

export default errorHandler