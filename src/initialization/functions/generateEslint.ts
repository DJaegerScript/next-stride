import fs from 'fs-extra'
import path from 'path'
import { eslintConfig } from '../constants'

export const generateEslint = (root: string) => {
  fs.chmod(root, fs.constants.S_IRWXU, () => {
    return fs.writeFileSync(
      path.join(root, '.eslintrc.json'),
      JSON.stringify(eslintConfig),
      { flag: 'w' }
    )
  })
}
