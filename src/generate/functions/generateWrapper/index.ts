import { capitalize } from './../../../helpers'
import fs from 'fs-extra'
import path from 'path'
import { registerFile } from '../../../helpers'
import { CommonInterface } from '../interface'
import generateWrapperContent from './generateWrapperContent'

const generateWrapper = ({ components, fileType, name }: CommonInterface) => {
  const wrapperDir = path.join(components, 'wrappers')
  const fileName = `with${capitalize(name, ['with'])}`

  registerFile(fileName, path.join(wrapperDir, `index${fileType}`))

  fs.writeFileSync(
    path.join(wrapperDir, `${fileName}${fileType}x`),
    generateWrapperContent(fileName, fileType),
    {
      flag: 'w',
    }
  )
}

export default generateWrapper
