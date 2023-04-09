import path from 'path'
import fs from 'fs-extra'

export const createComplementaryFile = (
  dir: string,
  fileType: string,
  isIcon?: boolean
) => {
  !isIcon &&
    fs.writeFileSync(
      path.join(dir, `constant${fileType}`),
      'export const varName = ""',
      {
        flag: 'w',
      }
    )

  fileType === '.ts' &&
    fs.writeFileSync(
      path.join(dir, `interface.ts`),
      'export interface props {}',
      {
        flag: 'w',
      }
    )
}
