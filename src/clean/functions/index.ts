import fs from 'fs-extra'
import { getProjectData } from '../../helpers'
import path from 'path'
import { DIRECTORIES } from '../../initialization/functions/constants'
import { execSync } from 'child_process'
import { cleanConstant } from './cleanConstant'
import { cleanInterface } from './cleanInterface'

const cleanFunction = () => {
  const { srcDir } = getProjectData('Cleaning project...')

  DIRECTORIES.map((directory) => {
    if (!['icons', 'wrappers'].includes(directory)) {
      const componentDir = path.join(srcDir, 'components', directory)

      const dirContents = fs.readdirSync(componentDir)

      dirContents.map((content) => {
        if (!content.includes('index')) {
          const contentDir = path.join(componentDir, content)
          const dirSubContents = fs.readdirSync(contentDir)

          if (dirSubContents.includes('constant.ts')) {
            cleanConstant(contentDir)
          }

          if (dirSubContents.includes('interface.ts')) {
            cleanInterface(contentDir)
          }
        }
      })
    }
  })

  execSync('git add . && git commit -m "stride clean" --no-verify')
}

export default cleanFunction
