import { IRange } from "../interfaces/ml/irange";
import { random } from "./math";

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

numericSeries = (start: number, end: number): number[] => {
  return new Array(end - start + 1).fill(start).map((value, index) => value + index);
},

randomMultidimensionalSeries = (dimension: number, length: number, ranges: IRange[], allowDuplicates: boolean, applyRound: boolean = false): any[][] => {
  if (dimension <= 0) {
    throw new Error('Dimension must be greater or equal to 1');
  }

  if (ranges.length === 0 || ranges.length !== dimension) {
    throw new Error('Ranges must have the same dimension as the number of dimensions');
  }

  const series: number[][] = [];
  let innerSeries: number[] = [];

  while (series.length < length) {
    for (let i = 0; i < dimension; i++) {
      const candidate = random(ranges[i].min, ranges[i].max, applyRound);
      innerSeries.push(candidate);
    }

    if (allowDuplicates || !series.includes(innerSeries)) {
      series.push(innerSeries);
    }

    innerSeries = [];
  }

  return series;
},

randomSeries = (length: number, min: number, max: number, allowDuplicates: boolean, applyRound: boolean = false): number[] => {
  const series: number[] = [];

  while (series.length < length) {
    const candidate = random(min, max, applyRound);

    if (allowDuplicates || !series.includes(candidate)) {
      series.push(candidate);
    }
  }

  return series;
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
