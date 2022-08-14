import fs from 'fs-extra'
import kleur from 'kleur'
import path from 'path'
import { directories } from './constants'
import generateIndexContent from './generateIndexContent'

const generateComponents = (src: string, fileType: string) => {
  console.log('🧱', kleur.blue('Structuring components...'))

  const componentsDir = path.join(src, 'components')

  fs.mkdirSync(componentsDir)

  directories.map((directory) => {
    const componentDir = path.join(componentsDir, directory)

    fs.mkdirSync(componentDir)

    directory == 'icons' && fileType === '.ts'
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
    generateIndexContent(directories)
  )
}

export default generateComponents
