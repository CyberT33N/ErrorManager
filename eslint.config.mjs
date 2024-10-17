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

import eslint from '@eslint/js' // 🔧 Import ESLint module
import tseslint from 'typescript-eslint' // 📜 Import TypeScript ESLint module

/** 
 * Configures ESLint and TSLint rules for the project. 
 */
export default tseslint.config(
    // ===== ESLINT RULES =====
    /** 
     * ESLint configuration object, extending recommended rules.
     */
    {
        ...eslint.configs.recommended, // 📜 Spread recommended ESLint config
        rules: {
            ...eslint.configs.recommended.rules, // 📜 Spread recommended rules

            // 🔄 Rule: Require parentheses for arrow functions as needed
            'arrow-parens': ['error', 'as-needed'],
            // 🚫 Rule: Disallow the use of var
            'no-var': 1,
            // 🚫 Rule: Disallow eval
            'no-eval': 'error',
            // 🔤 Rule: Enforce consistent indentation of 4 spaces
            indent: ['error', 4],
            // 🔍 Rule: Enforce the use of single quotes
            quotes: ['error', 'single'],
            // 📜 Rule: Allow console statements
            'no-console': 'off',
            // 🔲 Rule: Disallow space before function parentheses
            'space-before-function-paren': ['error', 'never'],
            // 🛑 Rule: Disallow padded blocks
            'padded-blocks': ['error', 'never'],

            // 🔄 Rule: Prefer arrow functions for callbacks
            'prefer-arrow-callback': [0, {
                allowNamedFunctions: true // ✅ Allow named functions
            }],

            // 🛑 Rule: Require named function expressions
            'func-names': ['error', 'never'],

            // 🚫 Rule: Disallow using variables before they are defined
            'no-use-before-define': ['error', {
                functions: true,
                classes: true
            }],

            // 📏 Rule: Set maximum line length to 120 characters
            'max-len': ['error', 120],
            // 🚫 Rule: Disable object curly spacing
            'object-curly-spacing': 0,
            // 🚫 Rule: Disallow trailing commas
            'comma-dangle': ['error', 'never'],
            // 🔒 Rule: Require semicolons
            semi: [2, 'never'],
            // 🚫 Rule: Disable new-cap rule
            'new-cap': 0,
            // 🚫 Rule: Disable one-var rule
            'one-var': 0,
            // 🚫 Rule: Disable guard-for-in rule
            'guard-for-in': 0
        }
    },

    // ===== TSESLINT RULES =====
    /** 
     * TypeScript ESLint rules, extending stylistic and recommended rules.
     */
    ...tseslint.configs.stylisticTypeChecked, // 📜 Spread TSLint stylistic config
    ...tseslint.configs.recommendedTypeChecked, // 📜 Spread TSLint recommended config
    {
        languageOptions: {
            parserOptions: {
                projectService: true, // ✅ Enable project service
                tsconfigRootDir: import.meta.dirname // 📂 Set TypeScript config root directory
            }
        }
    },
    // Additional TSLint configurations can be added here
    {
        rules: {
            // 🔄 Rule: Disable no-explicit-any rule
            // '@typescript-eslint/no-explicit-any': 'off',
            // 🔄 Rule: Disable no-unused-vars rule
            // '@typescript-eslint/no-unused-vars': 'off',
            // 🔄 Rule: Disable no-var-requires rule
            // '@typescript-eslint/no-var-requires': 'off',
            // 🔄 Rule: Disable explicit-module-boundary-types rule
            // '@typescript-eslint/explicit-module-boundary-types': 'off',
            // 🔄 Rule: Disable no-empty-function rule
            // '@typescript-eslint/no-empty-function   ': 'off',

            // ⚠️ Rule: Disallow misusing promises
            '@typescript-eslint/no-misused-promises': [
                'error',
                {
                    'checksVoidReturn': false // ✅ Allow void return checks
                }
            ]
        }
    }
)
