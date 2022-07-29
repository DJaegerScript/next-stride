import { execSync } from 'child_process'
import fs from 'fs-extra'
import kleur from 'kleur'
import path from 'path'
import { PackageManager } from '..'

const updatePackage = (
  root: string,
  fileType: string,
  { name, command }: PackageManager,
  packageJSON: any
) => {
  console.log('🆙', kleur.blue('Installing package...'))

  const { scripts } = packageJSON

  const packageContent = {
    ...packageJSON,
    scripts: {
      ...scripts,
      ...(fileType === '.ts' && { 'check-types': 'tsc --pretty --noEmit' }),
      'check-format': 'prettier --check .',
      'check-lint': 'eslint . --ext ts --ext tsx --ext js',
      format: 'prettier --write .',
      'test-all': `${command} format && ${command} check-format && ${command} check-lint ${
        fileType === '.ts' ? `&& ${command} check-types` : ''
      }`,
      prepare: 'husky install',
    },
  }

  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageContent),
    { flag: 'w' }
  )

  const additionalDependencies =
    'eslint-config-google eslint-config-prettier eslint-plugin-react'

  const tsDependencies =
    '@typescript-eslint/eslint-plugin @typescript-eslint/parser @tsconfig/next'

  execSync(
    `${name === 'npm' ? 'npm i' : `${name} add`} ${additionalDependencies} ${
      fileType === '.ts' ? tsDependencies : ''
    }`
  )
}

export default updatePackage
