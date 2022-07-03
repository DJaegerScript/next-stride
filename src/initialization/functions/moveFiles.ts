import path from 'path'
import fs from 'fs-extra'

export const moveFiles = async (src: string) => {
  const pagesDir = path.join(process.cwd(), 'pages')
  const stylesDir = path.join(process.cwd(), 'styles')

  await fs.move(pagesDir, path.join(src, 'pages'))
  await fs.move(stylesDir, path.join(src, 'styles'))
}
