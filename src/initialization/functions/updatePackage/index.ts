import fs from 'fs-extra'
import path from 'path'

const updatePackage = (root: string, fileType: string, command: string) => {
  const packagePathFile = path.join(root, 'package.json')

  const packageStringContent = fs.existsSync(packagePathFile)
    ? fs.readFileSync(packagePathFile, 'utf-8')
    : fs.readFileSync(path.join(root, 'backup/package.json'), 'utf-8')

  const packageParsedContent = JSON.parse(packageStringContent)
  const { scripts, devDependencies } = packageParsedContent

  const packageContent = {
    ...packageParsedContent,
    scripts: {
      ...scripts,
      ...(fileType === '.ts' && { 'check-types': 'tsc --pretty --noEmit' }),
      'check-format': 'prettier --check .',
      'check-lint': 'eslint . --ext ts --ext tsx --ext js',
      format: 'prettier --write .',
      'test-all': `${command} format && ${command} check-format && ${command} check-lint ${
        fileType === '.ts' ? '&& ${packageManagerCommand} check-types' : ''
      }`,
      prepare: 'husky install',
    },
    devDependencies: {
      ...devDependencies,
      ...(fileType === '.ts' && {
        '@typescript-eslint/eslint-plugin': '^5.20.0',
        '@typescript-eslint/parser': '^5.20.0',
      }),
      'eslint-config-google': '^0.14.0',
      'eslint-config-prettier': '^8.5.0',
      'eslint-plugin-react': '^7.29.4',
      '@tsconfig/next': '^1.0.2',
      prettier: '^2.6.2',
      husky: '^7.0.0',
    },
  }

  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageContent),
    { flag: 'w' }
  )
}

export default updatePackage
