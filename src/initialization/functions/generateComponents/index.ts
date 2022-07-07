import fs from 'fs-extra'
import path from 'path'
import { directories } from './constants'
import generateIndexContent from './generateIndexContent'

const generateComponents = (src: string) => {
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
    generateIndexContent(directories)
  )
}

export default generateComponents
