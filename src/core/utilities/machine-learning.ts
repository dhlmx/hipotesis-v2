export const accuracy: Function = (truePositive: number, trueNegative: number, samples: number): number => (truePositive + trueNegative) / samples,

precision: Function = (truePositive: number, falsePositive: number): number => (truePositive / (truePositive + falsePositive)),

recall: Function = (truePositive: number, falseNegative: number): number => (truePositive / (truePositive + falseNegative)),

falseNegativeRates: Function = (falseNegative: number, truePositive: number) => falseNegative / (falseNegative + truePositive),

falsePositiveRates: Function = (falsePositive: number, trueNegative: number) => falsePositive / (falsePositive + trueNegative),

trueNegativeRates: Function = (trueNegative: number, falsePositive: number) => trueNegative / (trueNegative + falsePositive),

truePositiveRates: Function = (truePositive: number, falseNegative: number) => truePositive / (truePositive + falseNegative);

export default { accuracy, precision, recall, falseNegativeRates, falsePositiveRates, trueNegativeRates, truePositiveRates };
