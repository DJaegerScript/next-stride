import { execSync } from 'child_process'
import path from 'path'
import { getProjectsData } from '../../helper'
import generateContext from './generateContext'

const generateFunction = (schematic: string, name: string) => {
  const { fileType, srcDir } = getProjectsData()

  const componentsDir = path.join(srcDir, 'components')

  schematic === 'context' && generateContext(componentsDir, name, fileType)

  execSync('npm run format')
}

export default generateFunction
