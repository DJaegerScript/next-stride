const generateModuleContent = (
  name: string,
  isSSR: boolean,
  fileType: string
) => {
  return `import React from 'react'
  // import {HeroSection, FAQSection} from './sections
  // import {} from './module-elements'\n
export const ${name}${fileType === '.ts' ? ': React.FC' : ''} = (${
    isSSR ? 'props' : ''
  }) => {\n
    // TODO: Write module's logic\n
    return <>
      {/* <HeroSection></HeroSection> */}
      {/* <FAQSection></FAQSection> */}
    </>
}`
}

export default generateModuleContent
