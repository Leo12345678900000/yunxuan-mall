/* eslint-env node */
/**
 * ESLint 8 + TypeScript + React 18（云选优品交付项目）
 */
module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    /* 不用 plugin:react-refresh/recommended：新版插件带 ESLint 9 flat 的 name 字段，ESLint 8 的 .eslintrc 会报错 */
    'prettier',
  ],
  ignorePatterns: ['dist', 'node_modules', 'coverage', '*.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-refresh'],
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    'react/prop-types': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
  overrides: [
    {
      files: ['vite.config.ts', 'vitest.config.ts'],
      env: { node: true },
    },
    {
      files: ['**/*.{test,spec}.{ts,tsx}', 'src/test/setup.ts'],
      env: { browser: true },
      rules: {
        'react-refresh/only-export-components': 'off',
      },
    },
    {
      files: [
        'src/stores/**/*.ts',
        'src/utils/**/*.ts',
        'src/apis/**/*.ts',
        'src/hooks/**/*.ts',
        'src/types/**/*.ts',
        'src/components/power-set.ts',
      ],
      rules: {
        'react-refresh/only-export-components': 'off',
      },
    },
  ],
}
