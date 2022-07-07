import { linterIgnoreFiles } from './constants'

export const parseLinterIgnoredFiles = (fileType: string) => {
  fileType === '.ts' && linterIgnoreFiles.push('next-env.d.ts')

  return linterIgnoreFiles
    .map((linterIgnoreFile) => `${linterIgnoreFile}\n`)
    .join('')
}
