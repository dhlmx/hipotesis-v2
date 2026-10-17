export const distance = (a: number[], b: number[]) => {
  if (a.length <= 1 || b.length <= 1) {
    throw new Error('Points a and b must have dimension at least 2.');
  }

  if (a.length !== b.length) {
    throw new Error('Points a and b must be the same dimension');
  }

  return Math.sqrt(
    a.map((aNumber, index) => b[index] - aNumber).reduce((sumOfSquares, diff) => sumOfSquares + (diff * diff), 0)
  )
},

factorial = (nFactorial: number): number => {
  if (nFactorial === 0 || nFactorial === 1) {
    return 1;
  }

  let iterator = nFactorial, total = 1;

  while (iterator > 1) {
    total = total * iterator;
    iterator--;
  }

  return total;
},

median = (series: number[]): number => series[Math.floor(series.length / 2)],

mean = (series: number[]): number => (series.length === 0) ? 0 : sum(series) / series.length,

sum = (numbers: number[]): number => {
  return numbers.reduce((sum, val) => sum + val, 0);
};
