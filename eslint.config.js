import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';

export default [
  // Base configuration for all JS/TS files (including config files)
  {
    files: ['**/*.js', '**/*.ts', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // Add any general rules applicable to all JS/TS files here
    },
  },

  // TypeScript specific configuration (applied only to .ts files in src/)
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: true, // Automatically find tsconfig.json
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      // General rules override/specific to TS
      'no-console': 'warn',
      'no-unused-vars': 'off', // Use TS version
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // Import sorting
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'unused-imports/no-unused-imports': 'error',
    },
  },

  // Overrides for specific files
  {
    files: ['src/cli.ts', 'src/data/generate-countries.ts'],
    rules: {
      'no-console': 'off', // Allow console logs in CLI and scripts
    },
  },
  {
    files: ['tsup.config.ts', 'vitest.config.ts', 'eslint.config.js'],
    languageOptions: {
      parserOptions: {
        project: null, // Don't require tsconfig for config files
      },
    },
  },
  {
    files: ['tests/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true, // Find tsconfig for tests
      },
    },
  },

  // Ignore patterns
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**', '**/*.d.ts'],
  },
];
