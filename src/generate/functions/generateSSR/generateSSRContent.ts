import { FILE_TYPE } from '../../../helpers/constant'

const generateSSRContent = (name: string, fileType: string) => {
  return `${
    fileType === FILE_TYPE.TYPESCRIPT
      ? 'import type {GetServerSideProps} from "next"'
      : ''
  } 
  
  export const ${name}${
    fileType === FILE_TYPE.TYPESCRIPT ? ': GetServerSideProps' : ''
  } = async (context) => {
        // TODO: Write ssr's logic
  return {
    props: {
      // TODO: Write returned ssr's data
    },
  }
}`
}

export default generateSSRContent
