import path from 'path'
import fs from 'fs-extra'
import generateModulePage from './generateModulePage'
import generateModuleFile from './generateModuleFile'
import generatePageFile from './generatePageFile'
import { capitalize, createComplementaryFile } from '../../../helper'

interface Options {
  P: string
}

const generateModule = (
  components: string,
  name: string,
  fileType: string,
  options: any
) => {
  const moduleDir = path.join(components, 'modules')
  const moduleName = `${capitalize(name)}Module`
  const dirName = path.join(moduleDir, moduleName)

  const { P: pagePath } = options as Options
  const pageDir = path.join(components, '../pages', pagePath)
  const pageName = path.parse(pagePath).base

  if (fs.existsSync(pageDir)) {
    throw new Error('Page already exists')
  } else if (!fs.existsSync(path.parse(pageDir).dir)) {
    throw new Error('Parent folder does not exist')
  } else if (fs.existsSync(dirName)) {
    throw new Error('Module already exists')
  }

  generatePageFile(
    pageDir,
    fileType,
    generateModulePage(capitalize(pageName), moduleName)
  )

  generateModuleFile(dirName, moduleName, moduleDir, fileType)

  createComplementaryFile(dirName, fileType)
}

export default generateModule
