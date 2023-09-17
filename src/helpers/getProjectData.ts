import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import kleur from 'kleur'
import { execSync } from 'child_process'

export const getProjectData = (message: string, isInit: boolean = false) => {
  console.log('\n⏩', kleur.blue(message))

  const rootDir = process.cwd()
  const srcDir = path.join(rootDir, 'src')
  const tsConfig = path.join(rootDir, 'tsconfig.json')
  const fileType = fs.existsSync(tsConfig) ? '.ts' : '.js'
  let packageJSON: any

  if (isInit) {
    if (!fs.existsSync(path.join(rootDir, '.git'))) {
      execSync('git init && git branch -m main')
    }

    const packagePathFile = path.join(rootDir, 'package.json')
    const packageStringContent = fs.readFileSync(packagePathFile, 'utf-8')
    packageJSON = JSON.parse(packageStringContent)
  }

  if (os.type() !== 'Windows_NT') {
    fs.chmodSync(rootDir, fs.constants.S_IRWXU)
  } else {
    execSync(`icacls "${rootDir}" /grant Everyone:(F)`)
  }

  return {
    rootDir,
    packageJSON,
    fileType,
    srcDir,
  }
}
