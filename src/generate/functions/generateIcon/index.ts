import path from 'path'
import fs from 'fs-extra'
import {
  appendIndex,
  capitalize,
  createComplementaryFile,
} from '../../../helper'
import { Commons } from '../constants'
import generateIconContent from './generateIconContent'

const generateIcon = ({ components, fileType, name }: Commons) => {
  const iconDir = path.join(components, 'icons')
  const fileName = capitalize(name)
  const dirName = path.join(iconDir, fileName)

  fs.mkdirSync(dirName)

  appendIndex(fileName, path.join(iconDir, `index${fileType}`))

  fs.writeFileSync(
    path.join(dirName, `index${fileType}`),
    generateIconContent(fileName, fileType),
    {
      flag: 'w',
    }
  )

  createComplementaryFile(dirName, fileType, true)
}

export default generateIcon
