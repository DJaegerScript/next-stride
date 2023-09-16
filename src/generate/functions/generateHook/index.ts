import fs from 'fs-extra'
import path from 'path'
import generateHookContent from './generateHookContent'
import {
  registerFile,
  capitalize,
  createComplementaryFile,
} from '../../../helpers'
import { CommonInterface, OptionInterface } from '../interface'

const generateHook = (
  { components, fileType, name }: CommonInterface,
  {
    complementary: withComplementary,
    constant: withConstant,
    interface: withInterface,
  }: OptionInterface
) => {
  const hookDir = path.join(components, 'hooks')
  const fileName = `use${capitalize(name)}`
  const dirName = path.join(hookDir, fileName)

  fs.mkdirSync(dirName)

  registerFile(fileName, path.join(hookDir, `index${fileType}`))

  fs.writeFileSync(
    path.join(dirName, `index${fileType}`),
    generateHookContent(fileName),
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

export default generateHook
