import fs from 'fs-extra'
import path from 'path'
import generateModuleContent from './generateModuleContent'
import { registerFile } from '../../../helpers'

const generateModuleFile = (
  dirName: string,
  moduleName: string,
  moduleDir: string,
  fileType: string,
  isSSR: boolean
) => {
  fs.mkdirSync(dirName)

  registerFile(moduleName, path.join(moduleDir, `index${fileType}`))

  fs.writeFileSync(
    path.join(dirName, `index${fileType}x`),
    generateModuleContent(moduleName, isSSR, fileType),
    {
      flag: 'w',
    }
  )

  const sectionDir = path.join(dirName, `sections`)
  fs.mkdirSync(sectionDir)
  fs.writeFileSync(
    path.join(sectionDir, `index${fileType}x`),
    `export * from './'`,
    {
      flag: 'w',
    }
  )

  const moduleElementDir = path.join(dirName, `module-elements`)
  fs.mkdirSync(moduleElementDir)
  fs.writeFileSync(
    path.join(moduleElementDir, `index${fileType}x`),
    `export * from './'`,
    {
      flag: 'w',
    }
  )
}

export default generateModuleFile
