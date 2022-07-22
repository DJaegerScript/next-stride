const generateModuleContent = (name: string, isSSR: boolean) => {
  return `import React from 'react'\n
export const ${name} = (${isSSR && 'props'}) => {\n
    // TODO: Write module's logic\n
    return <></>
}`
}

export default generateModuleContent
