import { DIRECTORIES } from '../constants'

const generateConfigFileContent = (fileType: string) => {
  const paths: { [alias: string]: string[] } = {}

  DIRECTORIES.map((directory) => {
    paths[`@${directory}`] = [`src/components/${directory}`]
  })

  return {
    compilerOptions: {
      ...(fileType === '.ts' && {
        target: 'es5',
        lib: ['dom', 'dom.iterable', 'esnext'],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        noEmit: true,
        esModuleInterop: true,
        module: 'esnext',
        moduleResolution: 'node',
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: 'preserve',
        incremental: true,
      }),
      baseUrl: '.',
      paths,
    },
    ...(fileType === '.ts' && {
      include: ['next-env.d.ts', '**/*.ts', '**/*.tsx'],
      exclude: ['node_modules'],
      extends: '@tsconfig/next/tsconfig.json',
    }),
  }
}

export default generateConfigFileContent
