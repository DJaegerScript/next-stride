import path from 'path'
import fs from 'fs-extra'
import kleur from 'kleur'

const moveFiles = (src: string) => {
  console.log('📋', kleur.blue('Move pages & styles to src...'))

  const pagesDir = path.join(process.cwd(), 'pages')
  const stylesDir = path.join(process.cwd(), 'styles')

  fs.moveSync(pagesDir, path.join(src, 'pages'))
  fs.moveSync(stylesDir, path.join(src, 'styles'))
}

export default moveFiles
