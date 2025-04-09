// eslint.config.js
const { FlatCompat } = require('@eslint/eslintrc')
const typescriptPlugin = require('@typescript-eslint/eslint-plugin')
const esLintConfigPrettier = require('eslint-config-prettier')
const prettierPlugin = require('eslint-plugin-prettier')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: typescriptPlugin.configs['recommended'],
})

module.exports = [
  {
    ignores: ['dist/**', 'src/generated/**'],
  },
  ...compat.config({}),
  ...compat.config({
    env: { node: true },
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
      '@typescript-eslint/no-restricted-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-restricted-types': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': [
        'off',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-unused-expressions': 'off',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          printWidth: 120,
          semi: false,
        },
      ],
    },
  }),
]
