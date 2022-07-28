const generateSSRContent = (name: string, fileType: string) => {
  return `${
    fileType === '.ts' ? 'import type {GetServerSideProps} from "next"' : ''
  } 
  
  export const ${name}${
    fileType === '.ts' ? ': GetServerSideProps' : ''
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
