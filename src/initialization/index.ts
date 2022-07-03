import path from 'path'
import fs from 'fs-extra'
import { generateComponents, moveFiles } from './functions'
import { directories } from './constants'

const striveInit = async () => {
  const nextConfig = path.join(process.cwd(), 'next.config.js')
  const srcDir = path.join(process.cwd(), 'src')

  if (!fs.existsSync(nextConfig))
    throw new Error('Strive init failed, project is not a next app')

  await moveFiles(srcDir)
  await generateComponents(srcDir, directories)
}

export default striveInit
