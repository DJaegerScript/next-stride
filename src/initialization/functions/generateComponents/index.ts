import fs from 'fs-extra'
import path from 'path'
import { directories } from './constants'
import generateIndexContent from './generateIndexContent'

const generateComponents = (src: string, fileType: string) => {
  const componentsDir = path.join(src, 'components')

  fs.mkdirSync(componentsDir)

  directories.map((directory) => {
    fs.mkdirSync(path.join(componentsDir, directory))
    fs.writeFileSync(
      path.join(componentsDir, `${directory}/index${fileType}`),
      "export * from './'"
    )
  })

  fs.writeFileSync(
    path.join(componentsDir, `index${fileType}`),
    generateIndexContent(directories)
  )
}

export default generateComponents
