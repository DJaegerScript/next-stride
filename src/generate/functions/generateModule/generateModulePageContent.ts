const generateModulePageContent = (
  name: string,
  moduleName: string,
  isSSR: boolean,
  SSRName: string
) => {
  return `import React from 'react'
import type { NextPage } from 'next'
import { ${moduleName} } from '@modules'
${isSSR && `import { ${SSRName} } from '@ssr'`}

const ${name}: NextPage = (${isSSR && 'props'}) => <${moduleName} ${
    isSSR && '{...props}'
  }/>

${isSSR && `export const getServerSideProps = ${SSRName}`}

export default ${name}`
}

export default generateModulePageContent
