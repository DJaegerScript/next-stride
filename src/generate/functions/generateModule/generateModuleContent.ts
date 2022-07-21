const generateModuleContent = (name: string) => {
  return `import React from 'react'\n
export const ${name} = () => {\n
    // TODO: Write module's logic\n
    return <></>
}`
}

export default generateModuleContent
