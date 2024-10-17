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

// ==== VITEST ====
import { defineConfig, mergeConfig } from 'vitest/config'
import vitestConfig from './vitest.config'

/**
 * 🛠️ Merges the existing Vitest configuration with additional custom 
 * configurations defined below.
 */
export default mergeConfig(vitestConfig, defineConfig({
    /** 
     * 📋 Test configuration settings.
     */
    test: {
        include: ['test/unit/**/*.test.ts'], // 📁 Include test files located in specified directories
        setupFiles: 'test/unit/pretestEach.ts', // ⚙️ Setup file executed before each test
        watch: false, // 👀 Disable watch mode during test execution
        coverage: {
            exclude: ['**/route.ts'] // 🚫 Exclude specified files from coverage reports
        }
    }
}))
