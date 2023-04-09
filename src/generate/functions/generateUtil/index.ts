import { capitalize } from './../../../helpers'
import { Commons } from './../constants'
import fs from 'fs-extra'
import path from 'path'
import generateUtilContent from './generateUtilContent'

import { registerFile, createComplementaryFile } from '../../../helpers'

const generateUtil = ({ components, fileType, name }: Commons) => {
  const utilDir = path.join(components, 'utils')
  const fileName = capitalize(name.toLowerCase(), true)
  const dirName = path.join(utilDir, fileName)

  fs.mkdirSync(dirName)

  registerFile(fileName, path.join(utilDir, `index${fileType}`))

  fs.writeFileSync(
    path.join(dirName, `index${fileType}`),
    generateUtilContent(fileName),
    {
      flag: 'w',
    }
  )

  createComplementaryFile(dirName, fileType)
}

export default generateUtil
