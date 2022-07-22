const generateSSRContent = (name: string) => {
  return `export const ${name} = async (context) => {
        // TODO: Write ssr's logic
  return {
    props: {
      // TODO: Write returned ssr's data
    },
  }
}`
}

export default generateSSRContent
