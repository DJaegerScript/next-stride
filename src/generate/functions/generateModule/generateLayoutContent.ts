const generateLayoutContent = (name: string, fileType: string) => {
  return `import React from 'react'

    const ${name}Layout = ${
    fileType === '.ts'
      ? '({ children }: { children: React.ReactNode })'
      : '({ children })'
  } => {
      return <>{children}</>
    }
    
    export default ${name}Layout
    `
}

export default generateLayoutContent
