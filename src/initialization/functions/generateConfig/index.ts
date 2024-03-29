import fs from 'fs-extra'
import kleur from 'kleur'
import path from 'path'
import generateConfigFileContent from './generateConfigFileContent'
import { FILE_TYPE } from '../../../helpers/constant'

const generateConfig = (root: string, fileType: string) => {
  console.log('⚙️', kleur.blue(' Resolving config...'))

  const configFile =
    fileType === FILE_TYPE.TYPESCRIPT ? 'tsconfig.json' : 'jsconfig.json'

  const configFileContent = generateConfigFileContent(fileType)

  fs.writeFileSync(
    path.join(root, configFile),
    JSON.stringify(configFileContent),
    { flag: 'w' }
  )
}

export default generateConfig
