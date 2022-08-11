const generateElementContent = (
  name: string,
  fileType: string,
  alias: string | undefined
) => {
  return `import React from 'react'\n
${alias ? '' : 'export'} const ${name}${
    fileType === '.ts' ? ': React.FC' : ''
  } = () => {\n
    // TODO: Write element's logic\n
    return <></>
}\n
${alias ? `export default ${name}` : ''}`
}

export default generateElementContent
