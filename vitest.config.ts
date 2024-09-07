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

import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [],
    test: {
        environment: 'node',
        setupFiles: 'test/setup-tests-beforeEach.ts',
        coverage: {
            // Include only specific directories for coverage
            include: ['src/'],
            // Optional: Exclude certain files or directories
            //exclude: ['src/legacy/', 'utils/helpers.ts'],
            // Optional: Specify coverage reporters (e.g., text, json, html)
            reporter: ['text', 'json', 'html']
        }
    }
})