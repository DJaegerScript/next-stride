import fs from 'fs-extra'
import kleur from 'kleur'
import path from 'path'
import { eslintConfig, prettierConfig } from './constants'
import { parseLinterIgnoredFiles } from './parseLinterIgnoredFiles'

const generateLinter = (root: string, fileType: string, lockFile: string) => {
  console.log('🔨', kleur.blue('Organizing linter rules...'))

  const parsedLinterIgnoredFiles = parseLinterIgnoredFiles(fileType, lockFile)

  fs.writeFileSync(
    path.join(root, '.prettierignore'),
    parsedLinterIgnoredFiles,
    { flag: 'w' }
  )

  fs.writeFileSync(
    path.join(root, '.prettierrc'),
    JSON.stringify(prettierConfig),
    { flag: 'w' }
  )

  fs.writeFileSync(path.join(root, '.eslintignore'), parsedLinterIgnoredFiles, {
    flag: 'w',
  })

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
