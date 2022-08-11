# Project Structure & Schematics

Next Stride scaffold your Next.js directory into three main directory inside `src` directory and some configuration file in root of project directory

## Project Structure

```
Next-Project
│   .eslintignore
│   .eslintrc.json
│   .prettierignore
│   .prettierrc
│   ...
│
└───.husky
│   │   pre-commit     
│   
└───src
    │
    └───pages
    │
    └───styles
    │
    └───components
        │   index.ts
        │
        └───contexts
        │   │   index.ts 
        │   
        └───elements
        │   │   index.ts 
        │   
        └───hooks
        │   │   index.ts 
        │   
        └───modules
        │   │   index.ts 
        │   
        └───ssr
        │   │   index.ts 
        │   
        └───utils
            │   index.ts 
```

## Schematics

**1. Contexts**

```bash
stride generate context [schematic]
```

Contexts is a group of React Context API functions. Stride will generate context schematics along with its boilerplate

```tsx
import React, { createContext, useContext } from 'react'
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
}
```

