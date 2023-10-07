import path from 'path'
import fs from 'fs-extra'
import kleur from 'kleur'
import { FILE_TYPE } from '../../../helpers/constant'

const moveFiles = (src: string, fileType: string) => {
  console.log(
    '📋',
    kleur.blue('Relocate pages and styles to the src directory...')
  )

  const pagesDir = path.join(process.cwd(), 'pages')
  const stylesDir = path.join(process.cwd(), 'styles')

  const srcPagesDir = path.join(src, 'pages')
  const srcStylesDir = path.join(src, 'styles')

  if (fs.existsSync(src)) {
    if (fs.existsSync(pagesDir)) {
      fs.moveSync(pagesDir, srcPagesDir)
    }

    if (fs.existsSync(stylesDir)) {
      fs.moveSync(stylesDir, srcStylesDir)
    }

    if (!fs.existsSync(pagesDir) && !fs.existsSync(stylesDir)) {
      console.log(
        '⏩',
        kleur.blue('Skipping, pages & styles already in src...')
      )
    }
  } else {
    fs.moveSync(pagesDir, srcPagesDir)
    fs.moveSync(stylesDir, srcStylesDir)
  }

  if (fileType === FILE_TYPE.JAVASCRIPT) {
    const fileNames = fs.readdirSync(srcPagesDir)

    fileNames.map(
      (name) =>
        !name.includes('api') &&
        fs.renameSync(
          path.join(srcPagesDir, name),
          path.join(srcPagesDir, `${name}x`)
        )
    )
  }
}

export default moveFiles
