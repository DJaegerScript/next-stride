import path from 'path'
import fs from 'fs-extra'

export const moveFiles = (src: string) => {
  const pagesDir = path.join(process.cwd(), 'pages')
  const stylesDir = path.join(process.cwd(), 'styles')

  fs.moveSync(pagesDir, path.join(src, 'pages'))
  fs.moveSync(stylesDir, path.join(src, 'styles'))
}
