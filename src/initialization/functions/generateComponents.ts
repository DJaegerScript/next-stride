import fs from 'fs-extra'
import path from 'path'
import { generateComponentsIndex } from '../utils'

export const generateComponents = (src: string, directories: string[]) => {
  const componentsDir = path.join(src, 'components')

  fs.mkdirSync(componentsDir)

  directories.map((directory) => {
    fs.mkdirSync(path.join(componentsDir, directory))
    fs.writeFileSync(
      path.join(componentsDir, `${directory}/index.ts`),
      "export * from './'"
    )
  })

  fs.writeFileSync(
    path.join(componentsDir, 'index.ts'),
    generateComponentsIndex(directories)
  )
}
