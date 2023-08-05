const generatePageContent = (
  name: string,
  moduleName: string,
  SSRName: string | null,
  fileType: string
) => {
  return `'use client'
  
import React from 'react'
import { ${moduleName} } from '@modules'
${fileType === '.ts' ? "import type { NextPage } from 'next'" : ''}
${SSRName ? `import { ${SSRName} } from '@ssr'` : ''}

const ${name}${fileType === '.ts' ? ': NextPage' : ''} = (${
    SSRName ? 'props' : ''
  }) => <${moduleName} ${SSRName ? '{...props}' : ''}/>

${SSRName ? `export const getServerSideProps = ${SSRName}` : ''}

export default ${name}`
}

export default generatePageContent
