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
import BaseError, { BaseErrorInterface } from './BaseError'

// ==== EXTERNAL TYPES ====
import {
    AxiosError, AxiosResponseHeaders,
    InternalAxiosRequestConfig,
    RawAxiosRequestHeaders, AxiosHeaderValue
} from 'axios'

export interface HttpClientErrorDataInterface extends BaseErrorInterface {
    data: {
        url: string | undefined
        method: string | undefined
        payload: unknown
        headers: AxiosResponseHeaders | Partial<RawAxiosRequestHeaders & {
            Server: AxiosHeaderValue;
            'Content-Type': AxiosHeaderValue;
            'Content-Length': AxiosHeaderValue;
            'Cache-Control': AxiosHeaderValue;
            'Content-Encoding': AxiosHeaderValue;
        }> | undefined;
        responseData: unknown
        errorMessage: string
        e: AxiosError
        config: InternalAxiosRequestConfig | undefined
    }
}

/**
 * HTTP Client Error - Default HTTP Status 400 - Additional with data object
 * At the moment only configured for axios
 */
class HttpClientError extends BaseError implements HttpClientErrorDataInterface {
    name
    data

    constructor(title: string, e: AxiosError) {
        super(title)

        const status = e.response?.status
        const url = e.response?.config?.url || e.config?.url
        const method = e.response?.config?.method || e.config?.method
        const payload = e.config?.data || e.response?.config.data
        const headers = e.response?.headers
        const errorMessage = e.message
        const responseData = e.response?.data

        const config = e.config
        delete e.config?.httpsAgent
        delete e.config?.httpAgent

        this.name = 'HttpClientError'
        this.httpStatus = status || 500

        this.data = {
            url, method, payload, headers,
            responseData,
            errorMessage, e,
            config
        }
    }
}

export default HttpClientError