import { FILE_TYPE } from '../../../helpers/constant'

const generateElementContent = (
  name: string,
  fileType: string,
  alias: string | undefined
) => {
  return `import React from 'react'\n
${alias ? '' : 'export'} const ${name}${
    fileType === FILE_TYPE.TYPESCRIPT ? ': React.FC' : ''
  } = () => {\n
    // TODO: Write element's logic\n
    return <></>
}\n
${alias ? `export default ${name}` : ''}`
}

export default generateElementContent
