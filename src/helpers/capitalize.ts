export const capitalize = (
  text: string,
  reservedWords: string[] = [],
  isUtil?: boolean
) => {
  let name = text

  reservedWords.map(
    (reservedWord) => (name = name.toLowerCase().replace(reservedWord, ''))
  )

  const nonAlphaNumericMatcher = /[^a-zA-Z0-9_]+/g
  const words = name.split(nonAlphaNumericMatcher)

  const capitalizeWords = words.map((word, index) =>
    index === 0 && (!word[0] || isUtil)
      ? word
      : word[0].toUpperCase() + word.substring(1)
  )

  return capitalizeWords.join('')
}
