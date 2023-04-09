import { capitalize } from './../../../helpers'
import { Commons } from './../constants'
import fs from 'fs-extra'
import path from 'path'
import generateContextContent from './generateContextContent'
import { registerFile, createComplementaryFile } from '../../../helpers'

const generateContext = ({ components, fileType, name }: Commons) => {
  const contextDir = path.join(components, 'contexts')
  const fileName = `${capitalize(name)}Context`
  const dirName = path.join(contextDir, fileName)

  fs.mkdirSync(dirName)

  registerFile(fileName, path.join(contextDir, `index${fileType}`))

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
