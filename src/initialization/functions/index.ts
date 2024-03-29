import path from 'path'
import { execSync } from 'child_process'
import fs from 'fs-extra'
import moveFiles from './moveFiles'
import generateComponents from './generateComponents'
import generateLinter from './generateLinter'
import updatePackage from './updatePackage'
import generateConfig from './generateConfig'
import { getPackageManager, getProjectData } from '../../helpers'
import generateNextConfig from './generateNextConfig'
import generateHusky from './generateHusky'
import kleur from 'kleur'
import figlet from 'figlet'

const initFunction = () => {
  console.log('\n', kleur.blue(figlet.textSync('Stride')))

  const { packageJSON, srcDir, rootDir, fileType } = getProjectData(
    'Initiating Stride...',
    true
  )

  const { lockFile, packageManager } = getPackageManager(rootDir)

  if (!packageJSON.dependencies.next)
    throw new Error('Stride init failed, project is not a next app')

  !fs.existsSync(path.join(rootDir, 'next.config.js')) &&
    generateNextConfig(rootDir)
  moveFiles(srcDir, fileType)
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
