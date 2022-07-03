import fs from 'fs-extra'
import path from 'path'
import { generateComponentsIndex } from '../utils'

export const generateComponents = async (
  src: string,
  directories: string[]
) => {
  const componentsDir = path.join(src, 'components')

  await fs.mkdir(componentsDir)

  fs.chmod(componentsDir, fs.constants.S_IRWXU, () => {
    directories.map((directory) => {
      fs.mkdirSync(path.join(componentsDir, directory))
      fs.writeFileSync(
        path.join(componentsDir, `${directory}/index.ts`),
        "export * from './'"
      )
    })

    return fs.writeFileSync(
      path.join(componentsDir, 'index.ts'),
      generateComponentsIndex(directories)
    )
  })
}
