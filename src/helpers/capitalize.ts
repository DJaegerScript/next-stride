export const capitalize = (text: string, isUtil?: boolean) => {
  const words = text.indexOf(' ') !== -1 ? text.split(' ') : text.split('-')

  const capitalizeWords = words.map((word, index) =>
    index === 0 && isUtil ? word : word[0].toUpperCase() + word.substring(1)
  )

  return capitalizeWords.join('')
}
