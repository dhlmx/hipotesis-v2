export interface INaiveBayesLog {
  label: string;
  line: number;
  processedTokens: number;
  addedTokens: number;
}

export const INAIVE_BAYES_LOG: INaiveBayesLog = {
  label: '',
  line: -1,
  processedTokens: -1,
  addedTokens: -1
};
