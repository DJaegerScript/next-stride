import fs from 'fs-extra'
import path from 'path'

const generatePageFile = (
  pageDir: string,
  fileType: string,
  pageContent: string,
  layoutContent: string
) => {
  fs.mkdirSync(pageDir)

  fs.writeFileSync(path.join(pageDir, `page${fileType}x`), pageContent, {
    flag: 'w',
  })

  fs.writeFileSync(path.join(pageDir, `layout${fileType}x`), layoutContent, {
    flag: 'w',
  })
}

export default generatePageFile
