import fs from 'fs-extra'
import path from 'path'
import { NPM_LOCK_FILE, PNPM_LOCK_FILE, YARN_LOCK_FILE } from './constant'

export const getPackageManager = (rootDir: string) => {
  const lockFile = fs.existsSync(path.join(rootDir, PNPM_LOCK_FILE))
    ? PNPM_LOCK_FILE
    : fs.existsSync(path.join(rootDir, YARN_LOCK_FILE))
    ? YARN_LOCK_FILE
    : NPM_LOCK_FILE

  const packageManager = {
    name:
      lockFile === PNPM_LOCK_FILE
        ? 'pnpm'
        : lockFile === YARN_LOCK_FILE
        ? 'yarn'
        : 'npm',
    command:
      lockFile === PNPM_LOCK_FILE
        ? 'pnpm'
        : lockFile === YARN_LOCK_FILE
        ? 'yarn'
        : 'npm run',
  }

  return {
    lockFile,
    packageManager,
  }
}
