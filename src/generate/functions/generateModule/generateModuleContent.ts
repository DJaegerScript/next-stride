const generateModuleContent = (
  name: string,
  isSSR: boolean,
  fileType: string
) => {
  return `import React from 'react'\n
export const ${name}${fileType === '.ts' ? ': React.FC' : ''} = (${
    isSSR ? 'props' : ''
  }) => {\n
    // TODO: Write module's logic\n
    return <></>
}`
}

export default generateModuleContent
