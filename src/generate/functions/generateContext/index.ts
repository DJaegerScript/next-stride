import { capitalize } from './../../../helpers'
import fs from 'fs-extra'
import path from 'path'
import generateContextContent from './generateContextContent'
import { registerFile, createComplementaryFile } from '../../../helpers'
import { CommonInterface, OptionInterface } from '../interface'

const generateContext = (
  { components, fileType, name }: CommonInterface,
  { constant: withConstant }: OptionInterface
) => {
  const contextDir = path.join(components, 'contexts')
  const fileName = `${capitalize(name, ['context'])}Context`
  const dirName = path.join(contextDir, fileName)

  fs.mkdirSync(dirName)

  registerFile(fileName, path.join(contextDir, `index${fileType}`))

  fs.writeFileSync(
    path.join(dirName, `index${fileType}x`),
    generateContextContent(fileName, fileType),
    {
      flag: 'w',
    }
  )

  const interfaceContent = `import { ReactNode } from 'react'\n\n
    export interface ${fileName}ProviderProps {
      children: ReactNode
    }\n
    export interface ${fileName}Interface {}
  `

  createComplementaryFile({
    dir: dirName,
    fileType,
    interfaceContent,
    withConstant,
  })
}

export default generateContext
