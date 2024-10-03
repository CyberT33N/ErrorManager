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

import { describe, it, expect } from 'vitest'

import {
    default as CoreError,
    type ICoreError
} from '@/src/errors/CoreError'

describe('[UNIT TEST] - src/errors/CoreError.ts', () => {
    const errorMsg = 'test'
    const errorMsgOrig = 'test original'
    const error = new Error(errorMsgOrig)

    it('should be instance of Error', () => {
        const coreError: ICoreError = new CoreError(errorMsg)
        expect(coreError).toBeInstanceOf(CoreError)
        expect(coreError).toBeInstanceOf(Error)
    })

    it('should have correct default properties', () => {
        const coreError: ICoreError = new CoreError(errorMsg)
    
        expect(coreError.message).toBe(errorMsg)

        expect(coreError.timestamp).toBeDefined()
        expect(coreError.environment).toBe(process.env.npm_lifecycle_event)
        expect(coreError.stack).toBeDefined()
    })
    
    it('should create new Core Error without error argument', () => {
        const coreError: ICoreError = new CoreError(errorMsg)
        expect(coreError.error).toBeUndefined()
    })

    it('should create new Core Error with error argument', () => {
        const coreError: ICoreError = new CoreError(errorMsg, error)
        expect(coreError.error).toBe(error)
    })
})