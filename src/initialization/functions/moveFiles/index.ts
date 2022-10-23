import path from 'path'
import fs from 'fs-extra'
import kleur from 'kleur'

const moveFiles = (src: string) => {
  console.log('📋', kleur.blue('Move pages & styles to src...'))

  const pagesDir = path.join(process.cwd(), 'pages')
  const stylesDir = path.join(process.cwd(), 'styles')

  if (fs.existsSync(src)) {
    if (fs.existsSync(pagesDir)) {
      fs.moveSync(pagesDir, path.join(src, 'pages'))
    }

    if (fs.existsSync(stylesDir)) {
      fs.moveSync(stylesDir, path.join(src, 'styles'))
    }

    if (!fs.existsSync(pagesDir) && !fs.existsSync(stylesDir)) {
      console.log(
        '⏩',
        kleur.blue('Skipping, pages & styles already in src...')
      )
    }
  } else {
    fs.moveSync(pagesDir, path.join(src, 'pages'))
    fs.moveSync(stylesDir, path.join(src, 'styles'))
  }
}

export default moveFiles
