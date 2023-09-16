import path from 'path'
import fs from 'fs-extra'
import { capitalize, createComplementaryFile } from '../../../helpers'
import generateModuleFile from './generateModuleFile'
import generateSSR from '../generateSSR'
import generatePage from './generatePage'
import { CommonInterface, OptionInterface, PageProps } from '../interface'

const generateModule = (commons: CommonInterface, options: OptionInterface) => {
  const {
    P: pagePath,
    ssr: isSSR,
    page: withPage,
    complementary: withComplementary,
    constant: withConstant,
    interface: withInterface,
  } = options

  const moduleDir = path.join(commons.components, 'modules')
  const moduleName = `${capitalize(commons.name)}Module`
  const dirName = path.join(moduleDir, moduleName)

  if (isSSR) {
    generateSSR(commons, options)
  }

  if (fs.existsSync(dirName)) {
    throw new Error('Module already exists')
  }

  const pageProps: PageProps = {
    pagePath,
    moduleName,
    SSRName: isSSR ? `get${capitalize(commons.name)}Props` : null,
  }

  if (withPage) {
    generatePage(commons, pageProps)
  }

  generateModuleFile(dirName, moduleName, moduleDir, commons.fileType, isSSR)

  if (withComplementary) {
    createComplementaryFile({
      dir: dirName,
      fileType: commons.fileType,
      withConstant,
      withInterface,
    })
  }
}

export default generateModule
