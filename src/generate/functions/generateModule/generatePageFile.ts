import fs from 'fs-extra'
import path from 'path'

const generatePageFile = (
  pageDir: string,
  fileType: string,
  content: string
) => {
  fs.mkdirSync(pageDir)

  fs.writeFileSync(path.join(pageDir, `index${fileType}x`), content, {
    flag: 'w',
  })
}

export default generatePageFile
