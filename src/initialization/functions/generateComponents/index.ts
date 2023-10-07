import fs from 'fs-extra'
import kleur from 'kleur'
import path from 'path'
import generateIndexContent from './generateIndexContent'
import { DIRECTORIES } from '../constant'
import { FILE_TYPE } from '../../../helpers/constant'

const generateComponents = (src: string, fileType: string) => {
  console.log('🧱', kleur.blue('Structuring components...'))

  const componentsDir = path.join(src, 'components')

  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir)
  }

  DIRECTORIES.map((directory) => {
    const componentDir = path.join(componentsDir, directory)

    fs.mkdirSync(componentDir)

    directory == 'icons' && fileType === FILE_TYPE.TYPESCRIPT
      ? fs.writeFileSync(
          path.join(componentDir, `interface${fileType}`),
          `export interface IconProps {
            size: string
            fill?: string
            stroke?: string
            className?: string
          }`
        )
      : ''

    fs.writeFileSync(
      path.join(componentDir, `index${fileType}`),
      "export * from './'"
    )
  })

  fs.writeFileSync(
    path.join(componentsDir, `index${fileType}`),
    generateIndexContent(DIRECTORIES)
  )
}

export default generateComponents
