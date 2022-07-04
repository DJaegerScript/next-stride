import fs from 'fs-extra'
import path from 'path'
import { prettierConfig } from '../constants'
import { parseLinterIgnoredFiles } from '../utils'

export const generatePrettier = (root: string) => {
  fs.chmod(root, fs.constants.S_IRWXU, () => {
    fs.writeFileSync(
      path.join(root, '.prettierignore'),
      parseLinterIgnoredFiles(),
      { flag: 'w' }
    )

    return fs.writeFileSync(
      path.join(root, '.prettierrc'),
      JSON.stringify(prettierConfig),
      { flag: 'w' }
    )
  })
}
