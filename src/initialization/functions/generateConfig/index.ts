import fs from 'fs-extra'
import path from 'path'
import generateConfigFileContent from './generateConfigFileContent'

const generateConfig = (root: string, fileType: string) => {
  const configFile = fileType === '.ts' ? 'tsconfig.json' : 'jsconfig.json'

  const configFileContent = generateConfigFileContent(fileType)

  fs.writeFileSync(
    path.join(root, configFile),
    JSON.stringify(configFileContent),
    { flag: 'w' }
  )
}

export default generateConfig
