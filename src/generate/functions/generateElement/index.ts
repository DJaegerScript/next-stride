import { capitalize } from './../../../helper'
import { Commons } from './../constants'
import fs from 'fs-extra'
import path from 'path'
import generateElementContent from './generateElementContent'
import { appendIndex, createComplementaryFile } from '../../../helper'

const generateElement = ({ components, fileType, name }: Commons) => {
  const elementName = capitalize(name)
  const elementDir = path.join(components, 'elements')
  const dirName = path.join(elementDir, elementName)

  fs.mkdirSync(dirName)

  appendIndex(elementName, path.join(elementDir, `index${fileType}`))

  fs.writeFileSync(
    path.join(dirName, `index${fileType}x`),
    generateElementContent(elementName, fileType),
    {
      flag: 'w',
    }
  )

  createComplementaryFile(dirName, fileType)
}

export default generateElement
