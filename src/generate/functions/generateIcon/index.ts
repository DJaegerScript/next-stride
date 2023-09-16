import path from 'path'
import fs from 'fs-extra'
import { registerFile, capitalize } from '../../../helpers'
import generateIconContent from './generateIconContent'
import { CommonInterface } from '../interface'

const generateIcon = ({ components, fileType, name }: CommonInterface) => {
  const iconDir = path.join(components, 'icons')
  const iconName = capitalize(name)
  const fileName = path.join(iconDir, `${iconName}${fileType}x`)

  registerFile(iconName, path.join(iconDir, `index${fileType}`))

  fs.writeFileSync(fileName, generateIconContent(iconName, fileType), {
    flag: 'w',
  })
}

export default generateIcon
