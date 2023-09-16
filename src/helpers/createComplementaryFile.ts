import path from 'path'
import fs from 'fs-extra'
import { CreateComplementaryInterface } from './interface'

export const createComplementaryFile = ({
  dir,
  fileType,
  withInterface = true,
  withConstant = true,
  interfaceContent,
  isIcon,
}: CreateComplementaryInterface) => {
  if (withConstant && !isIcon) {
    fs.writeFileSync(
      path.join(dir, `constant${fileType}`),
      'export const VAR_NAME = ""',
      {
        flag: 'w',
      }
    )
  }

  if (withInterface && fileType === '.ts') {
    const content = interfaceContent || 'export interface Props {}'

    fs.writeFileSync(path.join(dir, `interface.ts`), content, {
      flag: 'w',
    })
  }
}
