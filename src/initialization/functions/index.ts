import path from 'path'
import fs from 'fs-extra'
import { execSync } from 'child_process'
import glob from 'glob'

import moveFiles from './moveFiles'
import generateComponents from './generateComponents'
import generateLinter from './generateLinter'
import updatePackage from './updatePackage'
import generateConfig from './generateConfig'

const initFunction = () => {
  const rootDir = process.cwd()
  const nextConfig = path.join(rootDir, 'next.config.js')
  const srcDir = path.join(rootDir, 'src')
  const tsConfig = path.join(rootDir, 'tsconfig.json')
  const fileType = fs.existsSync(tsConfig) ? '.ts' : '.js'

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

  fs.chmodSync(rootDir, fs.constants.S_IRWXU)

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
