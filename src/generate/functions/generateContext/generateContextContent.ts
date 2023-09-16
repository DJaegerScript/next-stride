const generateContextContent = (contextName: string, fileType: string) => {
  return `import React, { createContext, useContext, useMemo } from 'react'
  ${
    fileType === '.ts'
      ? `import {${contextName}Interface, ${contextName}ProviderProps} from './interface'`
      : ''
  }\n
  const ${contextName} = createContext({} ${
    fileType === '.ts' ? `as ${contextName}Interface` : ''
  })\n
export const use${contextName} = () => useContext(${contextName})\n
export const ${contextName}Provider${
    fileType === '.ts' ? `: React.FC<${contextName}ProviderProps>` : ''
  } = ({children}) => {\n
    // TODO: Write context's logic\n

    const contextValue = useMemo(() => ({}), [])\n
  return (
    <${contextName}.Provider value={contextValue}>
          {children}
    </${contextName}.Provider>
  )
}`
}

export default generateContextContent
