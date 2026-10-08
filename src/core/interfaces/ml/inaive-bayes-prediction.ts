import { INaiveBayesProbability } from './inaive-bayes-probability';

export interface INaiveBayesPrediction {
  prediction: INaiveBayesProbability;
  probabilities: INaiveBayesProbability[];
}
