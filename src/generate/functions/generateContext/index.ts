import { capitalize } from './../../../helper'
import { Commons } from './../constants'
import fs from 'fs-extra'
import path from 'path'
import generateContextContent from './generateContextContent'
import { appendIndex, createComplementaryFile } from '../../../helper'

const generateContext = ({ components, fileType, name }: Commons) => {
  const contextDir = path.join(components, 'contexts')
  const fileName = `${capitalize(name)}Context`
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
