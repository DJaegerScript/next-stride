import fs from 'fs-extra'
import path from 'path'
import generateContextContent from './generateContextContent'
import { appendIndex, createComplementaryFile } from '../../../helper'

const generateContext = (
  components: string,
  name: string,
  fileType: string
) => {
  const contextDir = path.join(components, 'contexts')
  const fileName = `${name}Context`
  const dirName = path.join(contextDir, fileName)

  fs.mkdirSync(dirName)

  appendIndex(fileName, path.join(contextDir, `index${fileType}`))

  fs.writeFileSync(
    path.join(dirName, `index${fileType}x`),
    generateContextContent(name, fileType),
    {
      flag: 'w',
    }
  )

  createComplementaryFile(dirName, fileType)
}

export default generateContext
