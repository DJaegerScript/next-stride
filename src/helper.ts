import fs from 'fs-extra'
import path from 'path'
import os from 'os'

export const getProjectsData = () => {
  const rootDir = process.cwd()
  const srcDir = path.join(rootDir, 'src')
  const tsConfig = path.join(rootDir, 'tsconfig.json')
  const fileType = fs.existsSync(tsConfig) ? '.ts' : '.js'

  const packagePathFile = path.join(rootDir, 'package.json')
  const packageStringContent = fs.readFileSync(packagePathFile, 'utf-8')
  const packageJSON = JSON.parse(packageStringContent)

  os.type() !== 'win32' && fs.chmodSync(rootDir, fs.constants.S_IRWXU)

  return {
    rootDir,
    packageJSON,
    fileType,
    srcDir,
  }
}

export const capitalize = (text: string) => {
  const words = text.split(' ')

  const capitalizeWords = words.map(
    (word) => word[0].toUpperCase() + word.substring(1)
  )

  return capitalizeWords.join(' ')
}

export const createComplementaryFile = (dir: string, fileType: string) => {
  fs.writeFileSync(
    path.join(dir, `constant${fileType}`),
    'export const var = ""',
    {
      flag: 'w',
    }
  )
  fileType === '.ts' &&
    fs.writeFileSync(
      path.join(dir, `interface.ts`),
      'export interface props {}',
      {
        flag: 'w',
      }
    )
}

export const appendIndex = (component: string, dir: string) => {
  const indexContent = fs.readFileSync(dir, 'utf-8')

  const rawIndexContents = indexContent.split('\n')

  const indexContents = rawIndexContents.filter(
    (rawIndexContent) => rawIndexContent !== ''
  )

  indexContents.includes("export * from './'") && indexContents.shift()

  indexContents.push(`export * from './${component}'`)

  fs.writeFileSync(dir, indexContents.join('\n'), 'utf-8')
}
