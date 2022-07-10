import path from 'path'
import fs from 'fs-extra'
import { execSync } from 'child_process'
import glob from 'glob'

import moveFiles from './moveFiles'
import generateComponents from './generateComponents'
import generateLinter from './generateLinter'
import updatePackage from './updatePackage'
import generateConfig from './generateConfig'
import { getProjectsData } from '../../helper'

const initFunction = () => {
  const { fileType, nextConfig, rootDir, srcDir } = getProjectsData()

  const lockFiles = glob.sync(path.join(rootDir, '*lock*'))
  const packageManager = {
    name: lockFiles.includes('pnpm-lock.yaml')
      ? 'pnpm'
      : lockFiles.includes('yarn.lock')
      ? 'yarn'
      : 'npm',
    command: lockFiles.includes('pnpm-lock.yaml')
      ? 'pnpm'
      : lockFiles.includes('yarn.lock')
      ? 'yarn'
      : 'npm run',
    lockFile: lockFiles[0].split('/').pop(),
  }

  if (!fs.existsSync(nextConfig))
    throw new Error('Strive init failed, project is not a next app')

  moveFiles(srcDir)
  generateComponents(srcDir, fileType)
  generateLinter(rootDir, fileType, packageManager.lockFile as string)
  generateConfig(rootDir, fileType)
  updatePackage(rootDir, fileType, packageManager.command)

  execSync(
    `${packageManager.name} install && npx husky install && npx husky add .husky/pre-commit '${packageManager.command} test-all' && ${packageManager.command} test-all`
  )
}

export default initFunction
