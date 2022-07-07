import fs from 'fs-extra'
import path from 'path'
import { eslintConfig, prettierConfig } from './constants'
import { parseLinterIgnoredFiles } from './parseLinterIgnoredFiles'

const generateLinter = (root: string, fileType: string) => {
  fs.writeFileSync(
    path.join(root, '.prettierignore'),
    parseLinterIgnoredFiles(fileType),
    { flag: 'w' }
  )

  fs.writeFileSync(
    path.join(root, '.prettierrc'),
    JSON.stringify(prettierConfig),
    { flag: 'w' }
  )

  fs.writeFileSync(
    path.join(root, '.eslintignore'),
    parseLinterIgnoredFiles(fileType),
    { flag: 'w' }
  )

  if (fileType === '.ts') {
    eslintConfig.parser = '@typescript-eslint/parser'
    eslintConfig.plugins.push('@typescript-eslint')
  }

  fs.writeFileSync(
    path.join(root, '.eslintrc.json'),
    JSON.stringify(eslintConfig),
    { flag: 'w' }
  )
}

export default generateLinter
