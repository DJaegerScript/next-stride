export const directories: string[] = [
  'contexts',
  'elements',
  'hooks',
  'icons',
  'interfaces',
  'modules',
  'ssr',
  'utils',
]

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
