import { sortWords } from './sort';

export const decomposeWord = (word: string, sort: boolean): string [] => {
  let chars: string[] = [];

  for (const char of word) {
    chars.push(char);
  }

  return sort ? chars.sort((a, b) => sortWords(a, b)) : chars;
};
