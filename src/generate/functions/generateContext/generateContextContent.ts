import { capitalize } from '../../../helper'

const generateContextContent = (name: string) => {
  const contextName = `${capitalize(name)}Context`
  return `import React, { createContext, useContext } from 'react'\n
  const ${contextName} = createContext({})\n
export const use${contextName} = () => useContext(${contextName})\n
export const ${contextName}Provider: React.FC = () => {\n
    // TODO: Write context's logic\n
    const contextValue = {}\n
  return (
    <${contextName}.Provider value={contextValue}>
    </${contextName}.Provider>
  )
}`
}

export default generateContextContent
