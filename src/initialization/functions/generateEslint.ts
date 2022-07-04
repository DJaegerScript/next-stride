import fs from 'fs-extra'
import path from 'path'
import { eslintConfig, linterIgnoreFiles } from '../constants'

export const generateEslint = (root: string) => {
  fs.chmod(root, fs.constants.S_IRWXU, () => {
    fs.writeFileSync(
      path.join(root, '.eslintignore'),
      JSON.stringify(linterIgnoreFiles),
      { flag: 'w' }
    )

    return fs.writeFileSync(
      path.join(root, '.eslintrc.json'),
      JSON.stringify(eslintConfig),
      { flag: 'w' }
    )
  })
}
