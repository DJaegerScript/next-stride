import fs from 'fs-extra'
import path from 'path'
import generateUtilContent from './generateUtilContent'

import { appendIndex, createComplementaryFile } from '../../../helper'

const generateUtil = (components: string, name: string, fileType: string) => {
  const utilDir = path.join(components, 'utils')
  const dirName = path.join(utilDir, name)

  fs.mkdirSync(dirName)

  appendIndex(name, path.join(utilDir, `index${fileType}`))

  fs.writeFileSync(
    path.join(dirName, `index${fileType}`),
    generateUtilContent(name),
    {
      flag: 'w',
    }
  )

  createComplementaryFile(dirName, fileType)
}

export default generateUtil
