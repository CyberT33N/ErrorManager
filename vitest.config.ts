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

// ==== DEPENDENCIES ====
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

/**
 * Represents the configuration for the Vitest test runner.
 */
export default defineConfig({
    /** 
     * List of plugins to be used in the configuration.
     */
    plugins: [tsconfigPaths()], // 🔌 Add tsconfig paths plugin

    /** 
     * Configuration options for tests.
     */
    test: {
        /** 
         * Indicates whether to watch files for changes.
         * 
         * @type {boolean}
         */
        watch: false, // 🚫 Disable watch mode

        /** 
         * Path to the setup file that runs before each test.
         * 
         * @type {string}
         */
        setupFiles: 'test/unit/pretestEach.ts',

        /** 
         * Path to the global setup file for integration tests.
         * 
         * @type {string}
         */
        globalSetup: 'test/integration/pretestAll.ts',

        /** 
         * The environment in which the tests will run.
         * 
         * @type {string}
         */
        environment: 'node', // 🌐 Test environment set to Node.js

        /** 
         * Configuration for coverage reporting.
         */
        coverage: {
            /** 
             * Specifies the directories to include for coverage.
             * 
             * @type {Array<string>}
             */
            include: ['src/'],

            /** 
             * Specifies the files or directories to exclude from coverage.
             * 
             * @type {Array<string>}
             */
            exclude: ['dist/'],

            /** 
             * Specifies the coverage reporters to use.
             * 
             * @type {Array<string>}
             */
            reporter: ['text', 'json', 'html']
        }
    }
})
