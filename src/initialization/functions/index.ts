import path from 'path'
import fs from 'fs-extra'
import { execSync } from 'child_process'
import moveFiles from './moveFiles'
import generateComponents from './generateComponents'
import generateLinter from './generateLinter'
import updatePackage from './updatePackage'

const initFunction = () => {
  const rootDir = process.cwd()
  const nextConfig = path.join(rootDir, 'next.config.js')
  const srcDir = path.join(rootDir, 'src')
  const tsConfig = path.join(rootDir, 'tsconfig.json')
  const fileType = fs.existsSync(tsConfig) ? '.ts' : '.js'

  fs.chmodSync(rootDir, fs.constants.S_IRWXU)

  if (!fs.existsSync(nextConfig))
    throw new Error('Strive init failed, project is not a next app')

  moveFiles(srcDir)
  generateComponents(srcDir, fileType)
  generateLinter(rootDir, fileType)
  updatePackage(rootDir, fileType)

  execSync(
    "npm i && npx husky install && npx husky add .husky/pre-commit 'npm run test-all' && npm run test-all"
  )
}

export default initFunction
