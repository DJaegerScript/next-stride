import { NPM_LOCK_FILE, YARN_LOCK_FILE, PNPM_LOCK_FILE } from './constants'
import path from 'path'
import { execSync } from 'child_process'
import fs from 'fs-extra'

import moveFiles from './moveFiles'
import generateComponents from './generateComponents'
import generateLinter from './generateLinter'
import updatePackage from './updatePackage'
import generateConfig from './generateConfig'
import { getProjectData } from '../../helpers'
import generateNextConfig from './generateNextConfig'
import generateHusky from './generateHusky'
import kleur from 'kleur'
import figlet from 'figlet'

export interface PackageManager {
  name: string
  command: string
}

const initFunction = () => {
  console.log('\n', kleur.blue(figlet.textSync('Stride')))

  const { fileType, packageJSON, rootDir, srcDir } = getProjectData(true)

  const lockFile = fs.existsSync(path.join(rootDir, PNPM_LOCK_FILE))
    ? PNPM_LOCK_FILE
    : fs.existsSync(path.join(rootDir, YARN_LOCK_FILE))
    ? YARN_LOCK_FILE
    : NPM_LOCK_FILE

  const packageManager: PackageManager = {
    name:
      lockFile === PNPM_LOCK_FILE
        ? 'pnpm'
        : lockFile === YARN_LOCK_FILE
        ? 'yarn'
        : 'npm',
    command:
      lockFile === PNPM_LOCK_FILE
        ? 'pnpm'
        : lockFile === YARN_LOCK_FILE
        ? 'yarn'
        : 'npm run',
  }

  if (!packageJSON.dependencies.next)
    throw new Error('Stride init failed, project is not a next app')

  !fs.existsSync(path.join(rootDir, 'next.config.js')) &&
    generateNextConfig(rootDir)
  moveFiles(srcDir)
  generateComponents(srcDir, fileType)
  generateLinter(rootDir, fileType, lockFile)
  generateConfig(rootDir, fileType)
  updatePackage(rootDir, fileType, packageManager, packageJSON)
  generateHusky(rootDir, packageManager)

  console.log('🧐', kleur.blue('Running linter and type checking...'))
  execSync(`${packageManager.command} test-all`)

  console.log('🌿', kleur.blue('Commit stride init...'))
  execSync('git add . && git commit -m "stride init" --no-verify')

  console.log('\n✅', kleur.blue('Stride init successfully'))
}

export default initFunction
