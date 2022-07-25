import { execSync } from 'child_process'
import path from 'path'
import { schematics } from './constants'
import { GenerateOptions } from './../index'
import { getProjectsData } from '../../helper'

export type Schematic =
  | 'context'
  | 'element'
  | 'hook'
  | 'module'
  | 'ssr'
  | 'util'

const generateFunction = (
  schematic: Schematic,
  name: string,
  options: GenerateOptions
) => {
  const { fileType, srcDir } = getProjectsData()

  const componentsDir = path.join(srcDir, 'components')

  schematics[schematic](componentsDir, name, fileType, options)

  execSync('npm run format')
}

export default generateFunction