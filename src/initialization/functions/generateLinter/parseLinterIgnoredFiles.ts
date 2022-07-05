import { linterIgnoreFiles } from './constants'

export const parseLinterIgnoredFiles = () =>
  linterIgnoreFiles.map((linterIgnoreFile) => `${linterIgnoreFile}\n`).join('')
