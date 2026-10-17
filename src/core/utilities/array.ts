export const hasSameElements = (series: any[], elements: any[]): boolean => {
  let sameElements = series.length === elements.length;

  if (sameElements) {
    elements.forEach(element => {
      if (!series.includes(element)) {
        sameElements = false;
      }
    });
  }

  return sameElements;
},

multiply = (series: number[]): number => {
  return series.reduce((product, value) => product * value, 1);
},

numericSeries = (start: number, end: number): number[] => {
  return new Array(end - start + 1).fill(start).map((value, index) => value + index);
},


searchMultidimentionalSeries = (series: any[][], elements: any[]): number => {
  for (let i = 0; i < series.length; i++) {
    if (hasSameElements(series[i], elements)) {
      return i;
    }
  }

  return -1;
},

someHasSameElements = (series: any[][], elements: any[]): boolean => {
  return series.some(innerSeries => hasSameElements(innerSeries, elements));
},

transformToMultipleArray = (elements: any[]): any[][] => {
  return elements.map(element => [element]);
};
