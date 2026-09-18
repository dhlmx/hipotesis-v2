import { IFormControl } from '../../../interfaces/iform-control';

export const SERIES_A: number[][] = [
    [1, 3],
    [5, 8],
    [3, 0]
],

SERIES_B: number[][] = [
  [1, 2], [2, 3], [2, 5], [1, 6], [4, 6],
  [3, 5], [2, 4], [4, 3], [5, 2], [6, 9],
  [4, 4], [3, 3], [8, 6], [7, 5], [9, 6],
  [9, 7], [8, 8], [7, 9], [11, 3], [11, 2],
  [9, 9], [7, 8], [6, 8], [12, 2], [14, 3],
  [15, 1], [15, 4], [14, 2], [13, 1], [16, 4]
],

DIMENSION: IFormControl = { value: 2, min: 2, max: 3, minLength: 1, maxLength: 1, step: 1 },

ITERATIONS: IFormControl = { value: 1000, min: 100, max: 2000, minLength: 3, maxLength: 4, step: 100 },

KMEANS: IFormControl = { value: 3, min: 2, max: 10, minLength: 1, maxLength: 2, step: 1 },

MIN: IFormControl = { value: 1, min: 1, max: 200, minLength: 1, maxLength: 3, step: 1 },

MAX: IFormControl = { value: 100, min: 1, max: 200, minLength: 1, maxLength: 3, step: 1 },

POINTS: IFormControl = { value: 100, min: 10, max: 200, minLength: 1, maxLength: 3, step: 1 };

