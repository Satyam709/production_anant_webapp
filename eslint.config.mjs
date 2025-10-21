// eslint.config.js
import { FlatCompat } from '@eslint/eslintrc';
import prettierConfig from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    ignores: [
      'node_modules',
      '.next',
      'dist',
      'build',
      'out',
      'coverage',
      '**/*.min.js',
      '*.mjs'
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // Prettier compatibility
      ...prettierConfig.rules,

      // Import hygiene rules
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/newline-after-import': 'error',

      // Sort imports and exports
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
];
