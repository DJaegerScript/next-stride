import fs from 'fs-extra'
import path from 'path'
import generateNextConfigContent from './generateNextConfigContent'

const generateNextConfig = (root: string) => {
  const configFileContent = generateNextConfigContent()

  fs.writeFileSync(
    path.join(root, 'next.config.js'),
    JSON.stringify(configFileContent),
    { flag: 'w' }
  )
}

export default generateNextConfig
