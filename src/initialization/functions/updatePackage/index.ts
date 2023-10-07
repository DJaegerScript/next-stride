import { execSync } from 'child_process'
import fs from 'fs-extra'
import kleur from 'kleur'
import path from 'path'
import { PackageManager } from '../interface'
import { FILE_TYPE } from '../../../helpers/constant'

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
      ...(fileType === FILE_TYPE.TYPESCRIPT && {
        'check-types': 'tsc --pretty --noEmit',
      }),
      'check-format': 'prettier --check .',
      'check-structure':
        'eslint --parser ./node_modules/eslint-plugin-project-structure/dist/parser.js --rule project-structure/file-structure:error --ext .js,.jsx,.ts,.tsx,.css,.sass,.less,.svg,.png,.jpg,.ico,.yml,.json .',
      'check-lint': `${command} check-structure && eslint . --ext ts --ext tsx --ext js`,
      format: 'prettier --write .',
      'test-all': `${command} format && ${command} check-format && ${command} check-lint ${
        fileType === FILE_TYPE.TYPESCRIPT ? `&& ${command} check-types` : ''
      }`,
      prepare: 'husky install',
    },
  }

  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageContent),
    { flag: 'w' }
  )

  const additionalDependencies = `-D eslint eslint-config-prettier eslint-config-next prettier husky eslint-plugin-project-structure`

  const tsDependencies =
    '@typescript-eslint/eslint-plugin @typescript-eslint/parser @tsconfig/next'

  execSync(
    `${name === 'npm' ? 'npm i' : `${name} add`} ${additionalDependencies} ${
      fileType === FILE_TYPE.TYPESCRIPT ? tsDependencies : ''
    }`
  )
}

export default updatePackage
