const generateConfigFileContent = (fileType: string) => ({
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
    paths: {
      '@contexts': ['src/components/contexts'],
      '@elements': ['src/components/elements'],
      '@hooks': ['src/components/hooks'],
      '@modules': ['src/components/modules'],
      '@ssr': ['src/components/ssr'],
      '@utils': ['src/components/utils'],
      '@pages/*': ['src/pages/*'],
    },
  },
  ...(fileType === '.ts' && {
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx'],
    exclude: ['node_modules'],
    extends: '@tsconfig/next/tsconfig.json',
  }),
})

export default generateConfigFileContent
