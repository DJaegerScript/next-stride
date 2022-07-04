import fs from 'fs-extra'
import path from 'path'
import { linterIgnoreFiles, prettierConfig } from '../constants'

export const generatePrettier = (root: string) => {
  fs.chmod(root, fs.constants.S_IRWXU, () => {
    fs.writeFileSync(
      path.join(root, '.prettierignore'),
      JSON.stringify(linterIgnoreFiles),
      { flag: 'w' }
    )

    return fs.writeFileSync(
      path.join(root, '.prettierrc'),
      JSON.stringify(prettierConfig),
      { flag: 'w' }
    )
  })
}
