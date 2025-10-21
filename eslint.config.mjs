import { FlatCompat } from '@eslint/eslintrc';
import prettierConfig from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

/** @type { import("eslint").Linter.Config } */
const customConfig = {
  ignores: [
    'node_modules',
    '.next',
    'dist',
    'build',
    'out',
    'coverage',
    '**/*.min.js',
    '*.mjs',
  ],
  plugins: {
    'simple-import-sort': simpleImportSort,
    'unused-imports': unusedImports,
  },
  rules: {
    // Import hygiene rules
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/newline-after-import': 'error',

    // Sort imports and exports
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // Remove unused imports
    'unused-imports/no-unused-imports': 'error',

    // TODO: these rules turned off for now as they needs massive code refactoring
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'prefer-const': 'off',
  },
};

const eslintConfig = [
  // Extend Next.js recommended configurations
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      // Prettier compatibility
      ...prettierConfig.rules,
    },
  }),

  // Custom ESLint rules
  customConfig,
];

export default eslintConfig;
