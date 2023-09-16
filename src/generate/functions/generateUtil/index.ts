import { capitalize } from './../../../helpers'
import fs from 'fs-extra'
import path from 'path'
import generateUtilContent from './generateUtilContent'
import { registerFile, createComplementaryFile } from '../../../helpers'
import { CommonInterface, OptionInterface } from '../interface'

const generateUtil = (
  { components, fileType, name }: CommonInterface,
  {
    complementary: withComplementary,
    interface: withInterface,
    constant: withConstant,
  }: OptionInterface
) => {
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
  if (withComplementary) {
    createComplementaryFile({
      dir: dirName,
      fileType,
      withConstant,
      withInterface,
    })
  }
}

export default generateUtil
