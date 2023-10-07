import { FILE_TYPE } from '../../../helpers/constant'

const generatePageContent = (
  name: string,
  moduleName: string,
  SSRName: string | null,
  fileType: string
) => {
  return `import React from 'react'
import { ${moduleName} } from '@modules'
${
  fileType === FILE_TYPE.TYPESCRIPT
    ? "import type { NextPage } from 'next'"
    : ''
}
${SSRName ? `import { ${SSRName} } from '@ssr'` : ''}

const ${name}${fileType === FILE_TYPE.TYPESCRIPT ? ': NextPage' : ''} = (${
    SSRName ? 'props' : ''
  }) => <${moduleName} ${SSRName ? '{...props}' : ''}/>

${SSRName ? `export const getServerSideProps = ${SSRName}` : ''}

export default ${name}`
}

export default generatePageContent
