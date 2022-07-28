import { Commons } from './../constants'
import fs from 'fs-extra'
import path from 'path'
import generateHookContent from './generateHookContent'
import {
  appendIndex,
  capitalize,
  createComplementaryFile,
} from '../../../helper'

const generateHook = ({ components, fileType, name }: Commons) => {
  const hookDir = path.join(components, 'hooks')
  const fileName = `use${capitalize(name)}`
  const dirName = path.join(hookDir, fileName)

  fs.mkdirSync(dirName)

  appendIndex(fileName, path.join(hookDir, `index${fileType}`))

  fs.writeFileSync(
    path.join(dirName, `index${fileType}`),
    generateHookContent(fileName),
    {
      flag: 'w',
    }
  )

  createComplementaryFile(dirName, fileType)
}

export default generateHook
