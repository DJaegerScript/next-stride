import path from 'path'
import fs from 'fs-extra'

export const createComplementaryFile = (
  dir: string,
  fileType: string,
  interfaceContent?: string,
  isIcon?: boolean
) => {
  if (!isIcon) {
    fs.writeFileSync(
      path.join(dir, `constant${fileType}`),
      'export const VAR_NAME = ""',
      {
        flag: 'w',
      }
    )
  }

  if (fileType === '.ts') {
    const content = interfaceContent || 'export interface Props {}'

    fs.writeFileSync(path.join(dir, `interface.ts`), content, {
      flag: 'w',
    })
  }
}
