import path from 'path'
import fs from 'fs-extra'
import { exec } from 'child_process'
import {
  generateComponents,
  generateEslint,
  moveFiles,
  updatePackage,
  generatePrettier,
  updateHusky,
} from './functions'
import { directories } from './constants'

const striveInit = async () => {
  const rootDir = process.cwd()
  const nextConfig = path.join(rootDir, 'next.config.js')
  const srcDir = path.join(rootDir, 'src')

  if (!fs.existsSync(nextConfig))
    throw new Error('Strive init failed, project is not a next app')

  await moveFiles(srcDir)
  await generateComponents(srcDir, directories)

  generateEslint(rootDir)
  generatePrettier(rootDir)

  updatePackage(rootDir)

  exec('npx husky-init && npm i && npm run test-all', () => updateHusky())
}

export default striveInit
