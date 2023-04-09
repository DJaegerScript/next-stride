import fs from 'fs-extra'
import path from 'path'
import generateModuleContent from './generateModuleContent'
import { appendIndex } from '../../../helpers'

const generateModuleFile = (
  dirName: string,
  moduleName: string,
  moduleDir: string,
  fileType: string,
  isSSR: boolean
) => {
  fs.mkdirSync(dirName)

  appendIndex(moduleName, path.join(moduleDir, `index${fileType}`))

  fs.writeFileSync(
    path.join(dirName, `index${fileType}x`),
    generateModuleContent(moduleName, isSSR, fileType),
    {
      flag: 'w',
    }
  )
}

export default generateModuleFile
