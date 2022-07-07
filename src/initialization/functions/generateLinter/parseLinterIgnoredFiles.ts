import { linterIgnoreFiles } from './constants'

export const parseLinterIgnoredFiles = (fileType: string, lockFile: string) => {
  fileType === '.ts' && linterIgnoreFiles.push('next-env.d.ts')

  linterIgnoreFiles.push(lockFile)

  return linterIgnoreFiles
    .map((linterIgnoreFile) => `${linterIgnoreFile}\n`)
    .join('')
}
