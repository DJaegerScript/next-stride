import { PageProps } from './index'
import { Commons } from './../constants'
import path from 'path'
import fs from 'fs-extra'
import generatePageContent from './generatePageContent'
import { capitalize } from '../../../helpers'
import generatePageFile from './generatePageFile'
import generateLayoutContent from './generateLayoutContent'

const generatePage = (commons: Commons, pageProps: PageProps) => {
  const { components, fileType, name } = commons
  const { SSRName, moduleName, pagePath } = pageProps

  const pageDir = path.join(components, '../app', pagePath || name)
  const pageName = pagePath ? path.parse(pagePath).base : name

  if (fs.existsSync(pageDir)) {
    throw new Error('Page already exists')
  } else if (!fs.existsSync(path.parse(pageDir).dir)) {
    throw new Error('Parent folder does not exist')
  }

  const modulePageContent = generatePageContent(
    capitalize(pageName),
    moduleName,
    SSRName,
    fileType
  )

  const moduleLayoutContent = generateLayoutContent(
    capitalize(pageName),
    moduleName
  )

  generatePageFile(pageDir, fileType, modulePageContent, moduleLayoutContent)
}

export default generatePage
