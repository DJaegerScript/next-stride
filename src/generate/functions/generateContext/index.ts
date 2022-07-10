import fs from 'fs-extra'
import path from 'path'
import { appendIndex, createComplementaryFile } from '../../../helper'
import generateContextContent from './generateContextContent'

const generateContext = (
  components: string,
  name: string,
  fileType: string
) => {
  const contextDir = path.join(components, 'contexts')
  const fileName = `${name}Context`
  const contextFileDir = path.join(contextDir, fileName)

  fs.mkdirSync(contextFileDir)

  appendIndex(fileName, path.join(contextDir, `index${fileType}`))

  fs.writeFileSync(
    path.join(contextFileDir, `index${fileType}x`),
    generateContextContent(name),
    {
      flag: 'w',
    }
  )

  createComplementaryFile(contextFileDir, fileType)
}

export default generateContext
