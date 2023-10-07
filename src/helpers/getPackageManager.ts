import fs from 'fs-extra'
import path from 'path'
import { LOCK_FILE } from './constant'

export const getPackageManager = (rootDir: string) => {
  const { NPM, PNPM, YARN } = LOCK_FILE

  const lockFile = fs.existsSync(path.join(rootDir, PNPM))
    ? PNPM
    : fs.existsSync(path.join(rootDir, YARN))
    ? YARN
    : NPM

  const packageManager = {
    name: lockFile === PNPM ? 'pnpm' : lockFile === YARN ? 'yarn' : 'npm',
    command:
      lockFile === PNPM ? 'pnpm' : lockFile === YARN ? 'yarn' : 'npm run',
  }

  return {
    lockFile,
    packageManager,
  }
}
