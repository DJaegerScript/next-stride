import { capitalize } from '../../../helper'

const generateContextContent = (name: string, fileType: string) => {
  const contextName = `${capitalize(name)}Context`
  return `import React, { createContext, useContext } from 'react'\n
  const ${contextName} = createContext({} ${
    fileType === '.ts' ? 'as interface' : ''
  }) ${fileType === '.ts' ? '// TODO: Declare contextValue interface' : ''}\n
export const use${contextName} = () => useContext(${contextName})\n
export const ${contextName}Provider${
    fileType === '.ts' ? ': React.FC' : ''
  } = () => {\n
    // TODO: Write context's logic\n
    const contextValue = {}\n
  return (
    <${contextName}.Provider value={contextValue}>
    </${contextName}.Provider>
  )
}`
}

export default generateContextContent
