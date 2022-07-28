import path from 'path'
import fs from 'fs-extra'
import { capitalize, createComplementaryFile } from '../../../helper'
import generateModuleFile from './generateModuleFile'
import generateSSR from '../generateSSR'
import { Commons } from '../constants'
import generatePage from './generatePage'

interface Options {
  P: string
  ssr: boolean
  page: boolean
}

export interface PageProps {
  pagePath: string
  moduleName: string
  SSRName: string | null
}

const generateModule = (commons: Commons, options: any) => {
  const moduleDir = path.join(commons.components, 'modules')
  const moduleName = `${capitalize(commons.name)}Module`
  const dirName = path.join(moduleDir, moduleName)

  const { P: pagePath, ssr: isSSR, page } = options as Options

  isSSR && generateSSR(commons)

  if (fs.existsSync(dirName)) {
    throw new Error('Module already exists')
  }

  const pageProps: PageProps = {
    pagePath,
    moduleName,
    SSRName: isSSR ? `get${capitalize(commons.name)}Props` : null,
  }

  page && generatePage(commons, pageProps)

  generateModuleFile(dirName, moduleName, moduleDir, commons.fileType, isSSR)

  createComplementaryFile(dirName, commons.fileType)
}

export default generateModule
