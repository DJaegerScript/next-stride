export const generateComponentsIndex = (directories: string[]) => {
  const content = directories.map(
    (directory) => `export * from './${directory}' \n`
  )

  return content.join('')
}
