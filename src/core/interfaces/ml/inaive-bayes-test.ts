export interface INaiveBayesTest {
  filename: string;
  label: string;
  total: number;
  correct: number;
  incorrect: number;
  efficiency: number;
}

export const INAIVE_BAYES_TEST: INaiveBayesTest = {
  filename: '',
  label: '',
  total: -1,
  correct: -1,
  incorrect: -1,
  efficiency: -1
};
