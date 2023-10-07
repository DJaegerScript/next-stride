import { FILE_TYPE } from '../../../helpers/constant'

export const getEslintConfig = (fileType: string) => {
  const plugins = ['project-structure']

  if (fileType === FILE_TYPE.TYPESCRIPT) {
    plugins.push('@typescript-eslint')
  }

  return {
    extends: ['prettier', 'next/core-web-vitals'],
    plugins,
    ...(fileType === FILE_TYPE.TYPESCRIPT && {
      parser: '@typescript-eslint/parser',
    }),
    rules: {
      'require-jsdoc': 'off',
      'new-cap': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'project-structure/file-structure': 'error',
      ...(fileType === FILE_TYPE.TYPESCRIPT && {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
      }),
    },
    settings: {
      'project-structure/config-path': 'projectStructure.json',
    },
  }
}

export const PRETTIER_CONFIG = {
  endOfLine: 'lf',
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'es5',
  singleQuote: true,
  semi: false,
}

export const LINTER_IGNORED_FILES = ['.next', 'node_modules', 'public']

export const getDirectoryLinterRules = (fileType: string) => ({
  $schema:
    'node_modules/eslint-plugin-project-structure/projectStructure.schema.json',
  structure: {
    children: [
      {
        name: 'public',
        children: [],
      },
      {
        name: 'src',
        children: [
          {
            ruleId: 'components',
          },
          {
            ruleId: 'pages',
          },
          {
            name: 'styles',
            children: [
              {
                extension: '.css',
              },
            ],
          },
        ],
      },
      {
        extension: '*',
      },
    ],
  },
  rules: {
    pages: {
      name: 'pages',
      children: [
        {
          name: 'api',
          children: [
            {
              extension: fileType,
            },
          ],
        },
        { ruleId: 'page' },
        { extension: `${fileType}x` },
      ],
    },
    page: {
      name: '/^${{PascalCase}}$/',
      children: [{ ruleId: 'page' }, { extension: `${fileType}x` }],
    },
    components: {
      name: 'components',
      children: [
        {
          ruleId: 'contexts',
        },
        {
          ruleId: 'elements',
        },
        {
          ruleId: 'hooks',
        },
        {
          ruleId: 'icons',
        },
        {
          ruleId: 'modules',
        },
        {
          ruleId: 'ssr',
        },
        {
          ruleId: 'utils',
        },
        {
          ruleId: 'wrappers',
        },
        { extension: fileType },
      ],
    },
    contexts: {
      name: 'contexts',
      children: [
        {
          name: '/^${{PascalCase}}Context$/',
          children: [{ extension: [fileType, `${fileType}x`] }],
        },
        { extension: fileType },
      ],
    },
    elements: {
      name: 'elements',
      children: [
        {
          name: '/^${{PascalCase}}$/',
          children: [{ extension: [fileType, `${fileType}x`] }],
        },
        { extension: fileType },
      ],
    },
    hooks: {
      name: 'hooks',
      children: [
        {
          name: '/^use${{PascalCase}}$/',
          children: [{ extension: fileType }],
        },
        { extension: fileType },
      ],
    },
    icons: {
      name: 'icons',
      children: [
        { name: 'interface', extension: fileType },
        { name: 'index', extension: fileType },
        { extension: `${fileType}x` },
      ],
    },
    modules: {
      name: 'modules',
      children: [
        {
          name: '/^${{PascalCase}}Module$/',
          children: [
            {
              name: 'module-elements',
              children: [{ extension: [fileType, `${fileType}x`] }],
            },
            {
              name: 'sections',
              children: [{ extension: [fileType, `${fileType}x`] }],
            },
            { extension: [fileType, `${fileType}x`] },
          ],
        },
        { extension: fileType },
      ],
    },
    ssr: {
      name: 'ssr',
      children: [
        {
          name: '/^get${{PascalCase}}Props$/',
          children: [{ extension: fileType }],
        },
        { extension: fileType },
      ],
    },
    utils: {
      name: 'utils',
      children: [
        {
          name: '/^${{camelCase}}$/',
          children: [{ extension: fileType }],
        },
        { extension: fileType },
      ],
    },
    wrappers: {
      name: 'wrappers',
      children: [
        {
          name: '/^with${{PascalCase}}$/',
          extension: `${fileType}x`,
        },
        { name: 'index', extension: fileType },
      ],
    },
  },
})
