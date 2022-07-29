import fs from 'fs-extra'
import kleur from 'kleur'
import path from 'path'
import generateNextConfigContent from './generateNextConfigContent'

const generateNextConfig = (root: string) => {
  console.log(kleur.blue('next config not found! generate next.config.js...'))

  const configFileContent = generateNextConfigContent()

  fs.writeFileSync(
    path.join(root, 'next.config.js'),
    JSON.stringify(configFileContent),
    { flag: 'w' }
  )
}

export default generateNextConfig
