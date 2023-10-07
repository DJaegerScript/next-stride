import { FILE_TYPE } from '../../../helpers/constant'
import { LINTER_IGNORED_FILES } from './constant'

export const parseLinterIgnoredFiles = (fileType: string, lockFile: string) => {
  fileType === FILE_TYPE.TYPESCRIPT &&
    LINTER_IGNORED_FILES.push('next-env.d.ts')

  LINTER_IGNORED_FILES.push(lockFile)

  return LINTER_IGNORED_FILES.map(
    (linterIgnoreFile) => `${linterIgnoreFile}\n`
  ).join('')
}
