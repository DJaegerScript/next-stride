import { execSync } from 'child_process'
import path from 'path'
import { schematics } from './constants'
import { getProjectData } from '../../helpers'
import { OptionInterface, Schematic } from './interface'

const generateFunction = (
  schematic: Schematic,
  name: string,
  options: OptionInterface
) => {
  const { fileType, srcDir } = getProjectData('Generating schematic...')

  const commons = {
    name,
    fileType,
    components: path.join(srcDir, 'components'),
  }

  schematics[schematic](commons, options)

  execSync('npm run format')
}

export default generateFunction
