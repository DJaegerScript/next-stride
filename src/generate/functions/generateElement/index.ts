import { Commons } from './../constants'
import fs from 'fs-extra'
import path from 'path'
import generateElementContent from './generateElementContent'
import { appendIndex, createComplementaryFile } from '../../../helper'

const generateElement = ({ components, fileType, name }: Commons) => {
  const elementDir = path.join(components, 'elements')
  const dirName = path.join(elementDir, name)

  fs.mkdirSync(dirName)

  appendIndex(name, path.join(elementDir, `index${fileType}`))

  fs.writeFileSync(
    path.join(dirName, `index${fileType}x`),
    generateElementContent(name, fileType),
    {
      flag: 'w',
    }
  )

  createComplementaryFile(dirName, fileType)
}

export default generateElement
