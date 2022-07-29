import { NPMLockFile, YarnLockFile, PNPMLockFile } from './constants'
import path from 'path'
import { execSync } from 'child_process'
import fs from 'fs-extra'

import moveFiles from './moveFiles'
import generateComponents from './generateComponents'
import generateLinter from './generateLinter'
import updatePackage from './updatePackage'
import generateConfig from './generateConfig'
import { getProjectsData } from '../../helper'
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

  const { fileType, packageJSON, rootDir, srcDir } = getProjectsData()

  const lockFile = fs.existsSync(path.join(rootDir, PNPMLockFile))
    ? PNPMLockFile
    : fs.existsSync(path.join(rootDir, YarnLockFile))
    ? YarnLockFile
    : NPMLockFile

  const packageManager: PackageManager = {
    name:
      lockFile === PNPMLockFile
        ? 'pnpm'
        : lockFile === YarnLockFile
        ? 'yarn'
        : 'npm',
    command:
      lockFile === PNPMLockFile
        ? 'pnpm'
        : lockFile === YarnLockFile
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

  console.log('\n✅', kleur.blue('Stride init successfully'))
}

export default initFunction
