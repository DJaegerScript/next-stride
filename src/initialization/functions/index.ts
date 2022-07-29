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

const initFunction = () => {
  const { fileType, packageJSON, rootDir, srcDir } = getProjectsData()

  const lockFile = fs.existsSync(path.join(rootDir, PNPMLockFile))
    ? PNPMLockFile
    : fs.existsSync(path.join(rootDir, YarnLockFile))
    ? YarnLockFile
    : NPMLockFile

  const packageManager = {
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
    throw new Error('Strive init failed, project is not a next app')

  !fs.existsSync(path.join(rootDir, 'next.config.js')) && generateNextConfig
  moveFiles(srcDir)
  generateComponents(srcDir, fileType)
  generateLinter(rootDir, fileType, lockFile)
  generateConfig(rootDir, fileType)
  updatePackage(rootDir, fileType, packageManager.command, packageJSON)
  generateHusky(rootDir, packageManager)

  execSync(`${packageManager.command} test-all`)
}

export default initFunction
