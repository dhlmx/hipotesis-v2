export const binomial = (success: number, failure: number, trials: number): number => {
  return probability(success, failure) ** trials;
},

certainty = (success: number, failure: number): number => {
  return 1 / (success + failure);
},

conditional = (intersectionOfEvents: number, givenEvent: number): number => intersectionOfEvents / givenEvent,

factorial = (nFactorial: number): number => {
  if (nFactorial === 0 || nFactorial === 1) {
    return 1;
  } else {
    let result = 1;
    for (let i = 1; i <= nFactorial; i++) {
      result = result * i;
    }
    return result;
  }
},

geometric = (success: number, failure: number): number => {
  return success / (success + failure);
},

negativeBinomial = (success: number, failure: number, trials: number): number => {
  return factorial(trials) / (factorial(success) * factorial(trials - success)) * (failure ** success) * (success ** trials);
},

negativeProbability = (probability: number): number => {
  return 1 - probability;
},

negativeProbabilityBySuccess = (success: number, totalCases: number): number => {
  return 1 - (success / totalCases);
},

poisson = (success: number, failure: number, trials: number): number => {
  return Math.exp(-success) * (success ** trials) / factorial(trials);
},

probability = (success: number, failure: number): number => {
  return success / (success + failure);
},

probabilityBySuccess = (success: number, totalCases: number): number => {
  return success / totalCases;
},

reverseConditional = (conditional: number, event: number, givenEvent: number): number => (conditional * givenEvent) / event;
