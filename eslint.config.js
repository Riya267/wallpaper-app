import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['tsconfig.json']
      },
      globals: {
        browser: 'readonly',
        es2021: 'readonly',
      },
    },
  },
];