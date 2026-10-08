import { sortWords } from './sort';

export const decomposeWord = (word: string, sort: boolean): string [] => {
  let chars: string[] = [];

  for (const char of word) {
    chars.push(char);
  }

  return sort ? chars.sort((a, b) => sortWords(a, b)) : chars;
},

lineByLine = (text: string) => text.split(/\n/),

simpleTokenizer = (text: string): string[] => text.toLowerCase()
  .replace(/[^\wáéíóúñü]|_/gi, ' ')
  .replace(/\s{2}/g, ' ')
  .split(' ')
  .filter(word => word.length > 3)
  .filter((word, index, arr) => !arr.includes(word, index + 1));
