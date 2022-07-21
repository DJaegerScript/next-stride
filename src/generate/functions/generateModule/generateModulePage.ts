const generateModulePage = (name: string, moduleName: string) => {
  return `import React from 'react'
import type { NextPage } from 'next'
import { ${moduleName} } from '@modules'

const ${name}: NextPage = () => <${moduleName} />

export default ${name}`
}

export default generateModulePage
