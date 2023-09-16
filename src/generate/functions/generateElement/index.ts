import { capitalize } from './../../../helpers'
import fs from 'fs-extra'
import path from 'path'
import generateElementContent from './generateElementContent'
import { registerFile, createComplementaryFile } from '../../../helpers'
import { CommonInterface, OptionInterface } from '../interface'

const generateElement = (
  { components, fileType, name }: CommonInterface,
  {
    as: alias,
    interface: withInterface,
    complementary: withComplementary,
    constant: withConstant,
  }: OptionInterface
) => {
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

  if (withComplementary) {
    createComplementaryFile({
      dir: dirName,
      fileType,
      withInterface,
      withConstant,
    })
  }
}

export default generateElement
