import { LINTER_IGNORED_FILES } from './constants'

export const parseLinterIgnoredFiles = (fileType: string, lockFile: string) => {
  fileType === '.ts' && LINTER_IGNORED_FILES.push('next-env.d.ts')

  LINTER_IGNORED_FILES.push(lockFile)

  return LINTER_IGNORED_FILES.map(
    (linterIgnoreFile) => `${linterIgnoreFile}\n`
  ).join('')
}
