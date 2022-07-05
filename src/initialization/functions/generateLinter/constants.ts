export const eslintConfig = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'google', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'require-jsdoc': 'off',
    'new-cap': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

export const prettierConfig = {
  endOfLine: 'lf',
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'es5',
  singleQuote: true,
  semi: false,
}

export const linterIgnoreFiles = [
  '.next',
  'next-env.d.ts',
  'node_modules',
  'yarn.lock',
  'package-lock.json',
  'pnpm-lock.yaml',
  'public',
]
