import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

const unusedImportsRule = {
  plugins: {
    'unused-imports': unusedImports,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};

const unicornRules = [
  unicorn.configs['flat/recommended'],
  {
    rules: {
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/import-style': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-regexp-test': 'off',
      'unicorn/prefer-string-raw': 'off',
    },
  },
];

/**
 * @type {import('typescript-eslint').ConfigWithExtends[]}
 */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.es2022,
        ...globals.nodeBuiltin,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  {
    files: ['*.cjs'],
    languageOptions: {
      globals: {
        ...globals.es2022,
        ...globals.node,
      },
      sourceType: 'commonjs',
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ['**/dist/**', '**/fixtures/**', '**/coverage/**'] },
  ...unicornRules,
  unusedImportsRule,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-await-in-loop': 'off',
      'prefer-destructuring': 'error',
      'prefer-template': 'error',
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
    },
  },
  prettier,
];
