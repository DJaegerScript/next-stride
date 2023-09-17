import { createComplementaryFile } from './../../../helpers'
import path from 'path'
import { capitalize } from '../../../helpers'
import generateSSRFile from './generateSSRFile'
import { CommonInterface, OptionInterface } from '../interface'

const generateSSR = (
  { components, fileType, name }: CommonInterface,
  {
    complementary: withComplementary,
    interface: withInterface,
    constant: withConstant,
  }: OptionInterface
) => {
  const SSRName = `get${capitalize(name, ['get', 'props', 'prop'])}Props`
  const SSRDir = path.join(components, 'ssr')

  generateSSRFile(SSRName, SSRDir, fileType)

  if (withComplementary) {
    createComplementaryFile({
      dir: path.join(SSRDir, SSRName),
      fileType,
      withConstant,
      withInterface,
    })
  }
}

export default generateSSR
