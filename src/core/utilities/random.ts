// Models & Interfaces
import { CryptoObject } from "../models/crypto/crypto-object";
import { IRange } from '../interfaces/ml/irange';
import { COLORS } from "../constants/color";

export const random: Function = (min: number, max: number, applyRounding: boolean=false): number => {
  const rawRandom = min + (new CryptoObject()).random * (max - min);
  return applyRounding ? Math.round(rawRandom) : rawRandom;
},

randomColor: Function = (): string => `#${Math.floor(random() * 16777215).toString(16)}`,

randomMultidimensionalSeries: Function = (dimension: number, length: number, ranges: IRange[], allowDuplicates: boolean, applyRound: boolean = false): number[][] => {
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

randomPredefinedColor: Function = (): string => {
  const colorIndex = random(0, COLORS.length - 1, true);
  return COLORS[colorIndex].hex;
},

randomSeries: Function = (length: number, min: number, max: number, allowDuplicates: boolean, applyRound: boolean = false): number[] => {
  const series: number[] = [];

  while (series.length < length) {
    const candidate = random(min, max, applyRound);

    if (allowDuplicates || !series.includes(candidate)) {
      series.push(candidate);
    }
  }

  return series;
};
