import fs from 'fs-extra'
import path from 'path'
import { eslintConfig, prettierConfig } from './constants'
import { parseLinterIgnoredFiles } from './parseLinterIgnoredFiles'

export const generateLinter = (root: string) => {
  fs.writeFileSync(
    path.join(root, '.prettierignore'),
    parseLinterIgnoredFiles(),
    { flag: 'w' }
  )

  fs.writeFileSync(
    path.join(root, '.prettierrc'),
    JSON.stringify(prettierConfig),
    { flag: 'w' }
  )

  fs.writeFileSync(
    path.join(root, '.eslintignore'),
    parseLinterIgnoredFiles(),
    { flag: 'w' }
  )

  fs.writeFileSync(
    path.join(root, '.eslintrc.json'),
    JSON.stringify(eslintConfig),
    { flag: 'w' }
  )
}
