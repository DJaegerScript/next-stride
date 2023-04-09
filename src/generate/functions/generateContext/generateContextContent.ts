import { capitalize } from '../../../helpers'

const generateContextContent = (name: string, fileType: string) => {
  const contextName = `${capitalize(name)}Context`
  return `import React, { createContext, useContext } from 'react'
  ${fileType === '.ts' ? `import {props} from './interface'` : ''}\n
  const ${contextName} = createContext({} ${
    fileType === '.ts' ? 'as props' : ''
  }) ${
    fileType === '.ts' ? '// TODO: Declare interface of contextValue ' : ''
  }\n
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
