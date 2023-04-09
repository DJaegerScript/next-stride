import { capitalize } from './../../../helpers'
import { Commons } from './../constants'
import fs from 'fs-extra'
import path from 'path'
import generateElementContent from './generateElementContent'
import { registerFile, createComplementaryFile } from '../../../helpers'

interface Options {
  as: string
}

const generateElement = (
  { components, fileType, name }: Commons,
  options: any
) => {
  const { as: alias } = options as Options

  const elementName = capitalize(name)
  const elementDir = path.join(components, 'elements')
  const dirName = path.join(elementDir, elementName)

  fs.mkdirSync(dirName)

  registerFile(elementName, path.join(elementDir, `index${fileType}`), alias)

  fs.writeFileSync(
    path.join(dirName, `index${fileType}x`),
    generateElementContent(elementName, fileType, alias),
    {
      flag: 'w',
    }
  )

  createComplementaryFile(dirName, fileType)
}

export default generateElement
