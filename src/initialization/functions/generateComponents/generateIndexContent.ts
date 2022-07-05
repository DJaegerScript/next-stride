const generateIndexContent = (directories: string[]) =>
  directories.map((directory) => `export * from './${directory}' \n`).join('')

export default generateIndexContent
