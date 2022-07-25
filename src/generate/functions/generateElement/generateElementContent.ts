const generateElementContent = (name: string, fileType: string) => {
  return `import React from 'react'\n
export const ${name}${fileType === '.ts' ? ': React.FC' : ''} = () => {\n
    // TODO: Write element's logic\n
    return <></>
}`
}

export default generateElementContent
