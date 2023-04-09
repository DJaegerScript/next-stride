import { execSync } from 'child_process'
import path from 'path'
import { schematics } from './constants'
import { GenerateOptions } from './../index'
import { getProjectData } from '../../helpers'

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
  const { fileType, srcDir } = getProjectData()

  const commons = {
    name,
    fileType,
    components: path.join(srcDir, 'components'),
  }

  schematics[schematic](commons, options)

  execSync('npm run format')
}

export default generateFunction
