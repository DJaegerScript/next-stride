import fs from 'fs-extra'
import path from 'path'
import { appendIndex } from '../../../helpers'
import generateSSRContent from './generateSSRContent'

const generateSSRFile = (SSRName: string, SSRDir: string, fileType: string) => {
  const SSRPath = path.join(SSRDir, SSRName)
  fs.mkdirSync(SSRPath)

  appendIndex(SSRName, path.join(SSRDir, `index${fileType}`))

  fs.writeFileSync(
    path.join(SSRPath, `index${fileType}`),
    generateSSRContent(SSRName, fileType),
    {
      flag: 'w',
    }
  )
}

export default generateSSRFile
