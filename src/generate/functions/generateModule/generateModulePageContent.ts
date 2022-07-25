const generateModulePageContent = (
  name: string,
  moduleName: string,
  isSSR: boolean,
  SSRName: string,
  fileType: string
) => {
  return `import React from 'react'
import { ${moduleName} } from '@modules'
${fileType === '.ts' ? "import type { NextPage } from 'next'" : ''}
${isSSR ? `import { ${SSRName} } from '@ssr'` : ''}

const ${name}${fileType === '.ts' ? ': NextPage' : ''} = (${
    isSSR ? 'props' : ''
  }) => <${moduleName} ${isSSR ? '{...props}' : ''}/>

${isSSR ? `export const getServerSideProps = ${SSRName}` : ''}

export default ${name}`
}

export default generateModulePageContent
