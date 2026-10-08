export interface INaiveBayesTokenScore {
  label: string;
  token: string;
  labelFrequency: number;
  allLabelsFrequency: number;
  notLabelFrequency: number;
  labelTokenFrequency: number;
  allLabelsTokenFrequency: number;
  notLabelTokenFrequency: number;
  totalOfLabels: number;
  labelProbability: number;
  notLabelProbability: number;
  labelTokenProbability: number;
  notLabelTokenProbability: number;
  labelTokenSupport: number;
  notLabelTokenSupport: number;
  rawScore: number;
  adjustedTokenScore: number;
}

export const INAIVE_BAYES_TOKEN_SCORE: INaiveBayesTokenScore = {
  label: '',
  token: '',
  labelFrequency: -1,
  allLabelsFrequency: -1,
  notLabelFrequency: -1,
  labelTokenFrequency: -1,
  allLabelsTokenFrequency: -1,
  notLabelTokenFrequency: -1,
  totalOfLabels: -1,
  labelProbability: -1,
  notLabelProbability: -1,
  labelTokenProbability: -1,
  notLabelTokenProbability: -1,
  labelTokenSupport: -1,
  notLabelTokenSupport: -1,
  rawScore: -1,
  adjustedTokenScore: -1
}
