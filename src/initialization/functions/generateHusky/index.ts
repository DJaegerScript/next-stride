import { execSync } from 'child_process'
import fs from 'fs-extra'
import path from 'path'

interface PackageManager {
  name: string
  command: string
}

const generateHusky = (root: string, { name, command }: PackageManager) => {
  const initScript =
    name === 'npm' || name === 'yarn'
      ? 'npx husky-init'
      : fs.existsSync(path.join(root, '.yarn'))
      ? 'yarn dlx husky-init --yarn2'
      : 'pnpm dlx husky-init'

  execSync(`${initScript} && ${name} install`)

  const preCommitPath = path.join(root, '.husky', 'pre-commit')

  const preCommitContents = fs.readFileSync(preCommitPath, 'utf-8').split('\n')

  for (let index = 0; index < preCommitContents.length; index++) {
    if (preCommitContents[index].includes('npm')) {
      preCommitContents[index] = `${command} test-all`
    }
  }

  fs.writeFileSync(preCommitPath, preCommitContents.join('\n'), {
    flag: 'w',
  })
}

export default generateHusky
