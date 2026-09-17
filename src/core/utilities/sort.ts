import { decomposeWord } from './text';

export const sortCharacters = (word: string): string => {
  return decomposeWord(word, true).join('');
},

sortMultipleArrayOfWords = (series: string[][], innerSort: boolean): string[][] => {
  if (innerSort) {
    series = series.map(innerSeries => {
      const sortedInnerSeries = [...innerSeries];
      sortedInnerSeries.sort((a, b) => sortWords(a, b));
      return sortedInnerSeries;
    });
  }

  return series.sort((a, b) => sortWords(a.join(''), b.join('')));
},

sortNumbers = (numberA: number, numberB: number): number => {
  return numberA - numberB;
},

sortWords = (wordA: string, wordB: string): number => {
  const a = wordA.toUpperCase(); // ignore case sensitive
  const b = wordB.toUpperCase(); // ignore case sensitive

  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0; // words must be equal
},

toReverse = (serie: any[]): any[] => {
  return serie.reverse();
};
