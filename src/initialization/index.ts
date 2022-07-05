import path from 'path'
import fs from 'fs-extra'
import { execSync } from 'child_process'
import {
  generateComponents,
  generateLinter,
  moveFiles,
  updatePackage,
} from './functions'

const striveInit = async () => {
  const rootDir = process.cwd()
  const nextConfig = path.join(rootDir, 'next.config.js')
  const srcDir = path.join(rootDir, 'src')

  fs.chmodSync(rootDir, fs.constants.S_IRWXU)

  if (!fs.existsSync(nextConfig))
    throw new Error('Strive init failed, project is not a next app')

  moveFiles(srcDir)
  generateComponents(srcDir)
  generateLinter(rootDir)
  updatePackage(rootDir)

  execSync(
    "npm i && npx husky install && npx husky add .husky/pre-commit 'npm run test-all' && npm run test-all"
  )
}

export default striveInit
