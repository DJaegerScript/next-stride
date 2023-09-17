const generateWrapperContent = (name: string, fileType: string) => {
  return `${fileType === '.ts' ? `import React from 'react'\n\n` : ''}
  export const ${name} = (WrappedComponent${
    fileType === '.ts' ? ': React.ComponentType' : ''
  }) => {
    return (props${
      fileType === '.ts'
        ? ': JSX.IntrinsicAttributes & { children?: JSX.Element }'
        : ''
    }) => {\n\n
        // checks whether we are on client / browser or server.
        if (typeof window !== 'undefined') {\n\n
       
       // if certain conditions, redirects user to a specific route (e.g. "/")
       // if (condition) {
       //     window.location.href = '/'
       //     return
       // }


        return <WrappedComponent {...props} />
        }
        // place your preloader or loading screen here
        return <>Loading...</>
    }
    }`
}

export default generateWrapperContent
