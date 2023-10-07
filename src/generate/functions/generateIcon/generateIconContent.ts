import { FILE_TYPE } from '../../../helpers/constant'

const generateIconContent = (name: string, fileType: string) => {
  return `import React from 'react'
  ${
    fileType === FILE_TYPE.TYPESCRIPT
      ? "import { IconProps } from './interface'"
      : ''
  }


  export const ${name} ${
    fileType === FILE_TYPE.TYPESCRIPT ? ': React.FC<IconProps>' : ''
  } = ({
  fill = 'fill-current',
  stroke,
  className,
  size,
}) => {
    // TODO: Place svg's elements here and strip out sizing, fill, and stroke attribute then place className={\`\${size} \${fill} \${stroke} \${className}\`} in the <svg> tag
    return <svg></svg>
}`
}

export default generateIconContent
