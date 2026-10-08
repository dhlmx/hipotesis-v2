export interface INaiveBayesStore {
  labels: { [label: string]: number };
  tokens: { [token: string]: { [label: string]: number } };
}
