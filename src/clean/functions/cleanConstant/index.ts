import fs from 'fs-extra'
import path from 'path'

export const cleanConstant = (contentDir: string) => {
  const constantPath = path.join(contentDir, 'constant.ts')

  const constantContent = fs.readFileSync(constantPath, 'utf8')

  if (constantContent.includes('VAR_NAME') || !constantContent) {
    fs.rmSync(constantPath)
  }
}
