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

/**
 * Unit tests for the CoreError class, which extends the native Error object.
 */
describe('[UNIT TEST] - src/errors/CoreError.ts', () => {
    // 📄 Test message for core error initialization
    const errorMsg = 'test'

    // 📄 Original test message for error instantiation
    const errorMsgOrig = 'test original'

    // 📄 Creating a new standard Error instance
    const error = new Error(errorMsgOrig)

    /**
     * Test to verify if CoreError is an instance of Error.
     */
    it('should be instance of Error', () => {
        // 💻 Creating a new instance of CoreError with the test message
        const coreError: ICoreError = new CoreError(errorMsg)
        
        // 🔍 Asserting coreError is an instance of CoreError
        expect(coreError).toBeInstanceOf(CoreError)

        // 🔍 Asserting coreError is also an instance of Error
        expect(coreError).toBeInstanceOf(Error)
    })

    /**
     * Test to ensure that CoreError has the correct default properties.
     */
    it('should have correct default properties', () => {
        // 💻 Creating a new instance of CoreError with the test message
        const coreError: ICoreError = new CoreError(errorMsg)

        // 🔍 Asserting the message property matches the input message
        expect(coreError.message).toBe(errorMsg)

        // 🔍 Asserting timestamp property is defined
        expect(coreError.timestamp).toBeDefined()

        // 🔍 Asserting environment matches npm lifecycle event
        expect(coreError.environment).toBe(process.env.npm_lifecycle_event)

        // 🔍 Asserting stack property is defined
        expect(coreError.stack).toBeDefined()
    })

    /**
     * Test to verify CoreError can be created without an error argument.
     */
    it('should create new Core Error without error argument', () => {
        // 💻 Creating a new instance of CoreError without an error
        const coreError: ICoreError = new CoreError(errorMsg)

        // 🔍 Asserting error property is undefined
        expect(coreError.error).toBeUndefined()
    })

    /**
     * Test to verify CoreError can be created with an error argument.
     */
    it('should create new Core Error with error argument', () => {
        // 💻 Creating a new instance of CoreError with the provided error
        const coreError: ICoreError = new CoreError(errorMsg, error)

        // 🔍 Asserting the error property matches the input error
        expect(coreError.error).toBe(error)
    })
})
