import fs from 'fs-extra'
import path from 'path'

export const cleanInterface = (contentDir: string) => {
  const interfacePath = path.join(contentDir, 'interface.ts')

  const constantContent = fs.readFileSync(interfacePath, 'utf8')

  const interfaceName = constantContent.split(' ')[2]

  if (interfaceName === 'Props' || !constantContent) {
    fs.rmSync(interfacePath)
  }
}
