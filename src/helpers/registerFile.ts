import fs from 'fs-extra'
import { capitalize } from './capitalize'

export const appendIndex = (component: string, dir: string, alias?: string) => {
  const indexContent = fs.readFileSync(dir, 'utf-8')

  const rawIndexContents = indexContent.split('\n')

  const indexContents = rawIndexContents.filter(
    (rawIndexContent) => rawIndexContent !== ''
  )

  indexContents.includes("export * from './'") && indexContents.shift()

  const exportedFile = alias
    ? `export {default as ${capitalize(alias)}} from './${component}'`
    : `export * from './${component}'`
  indexContents.push(exportedFile)

  fs.writeFileSync(dir, indexContents.join('\n'), 'utf-8')
}
