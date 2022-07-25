import path from 'path'
import fs from 'fs-extra'
import generateModulePageContent from './generateModulePageContent'
import generatePageFile from './generatePageFile'
import { capitalize, createComplementaryFile } from '../../../helper'
import generateSSRFile from './generateSSRFile'
import generateModuleFile from './generateModuleFile'

interface Options {
  P: string
  ssr: boolean
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

  const { P: pagePath, ssr: isSSR } = options as Options
  const pageDir = path.join(components, '../pages', pagePath)
  const pageName = path.parse(pagePath).base

  if (fs.existsSync(pageDir)) {
    throw new Error('Page already exists')
  } else if (!fs.existsSync(path.parse(pageDir).dir)) {
    throw new Error('Parent folder does not exist')
  } else if (fs.existsSync(dirName)) {
    throw new Error('Module already exists')
  }

  const SSRName = `get${capitalize(name)}Props`
  const SSRDir = path.join(components, 'ssr')
  isSSR && generateSSRFile(SSRName, SSRDir, fileType)

  const modulePageContent = generateModulePageContent(
    capitalize(pageName),
    moduleName,
    isSSR,
    SSRName,
    fileType
  )

  generatePageFile(pageDir, fileType, modulePageContent)

  generateModuleFile(dirName, moduleName, moduleDir, fileType, isSSR)

  createComplementaryFile(dirName, fileType)
}

export default generateModule
