export const camelToSentence = (str: string): string => str.split('').map((char, index) => {
  if (index === 0) return char.toUpperCase()

  if (char === char.toUpperCase()) {
    return ` ${char}`
  }

  return char
}).join('')


export const shuffleArray = <T>(arr: T[]): T[] => {
  const newArr = [...arr]

  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }

  return newArr
}
