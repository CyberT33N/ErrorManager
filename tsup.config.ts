import { defineConfig } from 'tsup'
import * as glob from 'glob'

// 🔍 Use glob to synchronize and retrieve all TypeScript files from the src directory
const entries = glob.sync('./src/*.ts')
// 📜 Log the entries to the console for debugging purposes
console.log(entries)

// 🛠️ Export the configuration for tsup build tool
export default defineConfig({
    /**
     * 🎯 Entry points for the build process.
     * This specifies which files will be bundled.
     *
     * @type {string[]} 
     * @example
     * // Example of entry points:
     * const entries = ['./src/index.ts', './src/utils.ts'];
     */
    entry: entries,
    
    /**
     * 📦 Format options for the output.
     * This defines the module formats to generate.
     *
     * @type {('cjs' | 'esm')[]}
     * @default ['cjs', 'esm']
     */
    format: ['cjs', 'esm'], // Build for commonJS and ESmodules

    /**
     * 🗒️ Flag to enable generation of TypeScript declaration files.
     * When true, a .d.ts file will be created.
     *
     * @type {boolean}
     * @default true
     */
    dts: true, // Generate declaration file (.d.ts)

    /**
     * 🔄 Enable or disable code splitting.
     * If true, it will create separate chunks for 
     * dynamic imports.
     *
     * @type {boolean}
     * @default false
     */
    splitting: false,

    /**
     * 📍 Enable source maps for easier debugging.
     * When true, a source map file will be generated.
     *
     * @type {boolean}
     * @default true
     */
    sourcemap: true,

    /**
     * 🧹 Clean the output directory before each build.
     * If true, it will remove previous builds.
     *
     * @type {boolean}
     * @default true
     */
    clean: true
})
