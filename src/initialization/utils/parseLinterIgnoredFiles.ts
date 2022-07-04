import { linterIgnoreFiles } from '../constants'

export const parseLinterIgnoredFiles = () => {
  const ignoredFiles = linterIgnoreFiles.map(
    (linterIgnoreFile) => `${linterIgnoreFile}\n`
  )

  return ignoredFiles.join('')
}
