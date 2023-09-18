import fs from 'fs-extra'
import kleur from 'kleur'
import path from 'path'
import {
  ESLINT_CONFIG,
  PRETTIER_CONFIG,
  getDirectoryLinterRules,
} from './constants'
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
    JSON.stringify(PRETTIER_CONFIG),
    { flag: 'w' }
  )

  fs.writeFileSync(path.join(root, '.eslintignore'), parsedLinterIgnoredFiles, {
    flag: 'w',
  })

  if (fileType === '.ts') {
    ESLINT_CONFIG.parser = '@typescript-eslint/parser'
    ESLINT_CONFIG.plugins.push('@typescript-eslint')
  }

  fs.writeFileSync(
    path.join(root, '.eslintrc.json'),
    JSON.stringify(ESLINT_CONFIG),
    { flag: 'w' }
  )

  const directoryLinterRules = getDirectoryLinterRules(fileType)

  fs.writeFileSync(
    path.join(root, 'projectStructure.json'),
    JSON.stringify(directoryLinterRules),
    { flag: 'w' }
  )
}

export default generateLinter
