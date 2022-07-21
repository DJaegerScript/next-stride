const generateElementContent = (name: string) => {
  return `import React from 'react'\n
export const ${name}: React.FC = () => {\n
    // TODO: Write element's logic\n
    return <></>
}`
}

export default generateElementContent
