export const camelToSentence = (str: string): string => str.split('').map((char, index) => {
  if (index === 0) return char.toUpperCase()

  if (char === char.toUpperCase()) {
    return ` ${char}`
  }

  return char
}).join('')
