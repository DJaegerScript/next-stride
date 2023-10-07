import fs from 'fs-extra'
import kleur from 'kleur'
import path from 'path'
import {
  getEslintConfig,
  PRETTIER_CONFIG,
  getDirectoryLinterRules,
} from './constant'
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

  fs.writeFileSync(
    path.join(root, '.eslintrc.json'),
    JSON.stringify(getEslintConfig(fileType)),
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
