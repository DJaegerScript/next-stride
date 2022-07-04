import { exec } from 'child_process'

export const updateHusky = () =>
  exec(
    "rm -rf .husky && npx husky install && npx husky add .husky/pre-commit 'npm run test-all'"
  )
