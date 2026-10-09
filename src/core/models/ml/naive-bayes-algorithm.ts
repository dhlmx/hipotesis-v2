import { lineByLine, simpleTokenizer } from '../../utilities/text';
import { INAIVE_BAYES_LOG, INaiveBayesLog } from '../../interfaces/ml/inaive-bayes-log';
import { INAIVE_BAYES_PROBABILITY, INaiveBayesProbability } from '../../interfaces/ml/inaive-bayes-probability';
import { INaiveBayesStore } from '../../interfaces/ml/inaive-bayes-store';
import { INaiveBayesPrediction } from '../../interfaces/ml/inaive-bayes-prediction';
import { INaiveBayesTraining } from '../../interfaces/ml/inaive-bayes-training';
import { INAIVE_BAYES_TEST, INaiveBayesTest } from '../../interfaces/ml/inaive-bayes-test';
import { EPSILON, RARE_TOKEN_WEIGHT } from '../../constants/ml/naive-bayes/data';

export class NaiveBayesAlgorithm {
  private readonly tokenizer: (text: string) => string[];
  private readonly _store: INaiveBayesStore = { labels: {}, tokens: {} };
  private readonly _trainings: INaiveBayesTraining[] = [];
  private readonly _tests: INaiveBayesTest[] = [];
  private readonly _predictions: INaiveBayesPrediction[] = [];
  private readonly _logs: INaiveBayesLog[] = [];

  epsilon = EPSILON;
  weight = RARE_TOKEN_WEIGHT;
  isTrained = false;

  constructor(tokenizer: (text: string) => string[] = simpleTokenizer) {
    this.tokenizer = tokenizer;
  }

  get labels(): string[] {
    return Object.keys(this._store.labels);
  }

  get lastLog(): INaiveBayesLog {
    return this._logs.at(- 1) ?? { ...INAIVE_BAYES_LOG };
  }

  get lastTest(): INaiveBayesTest {
    return this._tests.at(- 1) ?? { ...INAIVE_BAYES_TEST };
  }

  get logs(): INaiveBayesLog[] {
    return this._logs;
  }

  get tests(): INaiveBayesTest[] {
    return this._tests;
  }

  get tokens(): string[] {
    return Object.keys(this._store.tokens);
  }

  get trainings(): INaiveBayesTraining[] {
    return this._trainings;
  }

  info = (includeLogs: boolean = false): any => {
    return {
      labels: this.labels.length,
      tokens: this.tokens.length,
      store: this._store,
      predictions: includeLogs ? this._predictions : [],
      trainings: this._trainings,
      tests: this._tests,
      logs: includeLogs ? this._logs : []
    };
  };

  predict = (filename: string, label: string, text: string, epsilon: number = EPSILON, weight: number = RARE_TOKEN_WEIGHT): void => {
    const lines: string[] = lineByLine(text),
          test: INaiveBayesTest = {
            filename,
            label,
            total: 0,
            correct: 0,
            incorrect: 0,
            efficiency: 0
          };

    this.epsilon = epsilon;
    this.weight = weight;

    lines.forEach(line => {
      const probabilities: INaiveBayesProbability[] = this.calculateProbabilities(line),
            prediction: INaiveBayesProbability = probabilities.length > 0 ? probabilities.at(0)! : INAIVE_BAYES_PROBABILITY;

      this._predictions.push({
        prediction,
        probabilities
      });

      if (prediction.label === label) {
        test.correct++;
      } else {
        test.incorrect++;
      }

      test.total++;
    });

    test.efficiency = (test.correct / test.total) * 100;
    this._tests.push(test);
  };

  reset = (): void => {
    this._store.labels = {};
    this._store.tokens = {};
  };

  train = (filename: string, label: string, text: string, epsilon: number = EPSILON, weight: number = RARE_TOKEN_WEIGHT): void => {
    const lines: string[] = lineByLine(text),
          training: INaiveBayesTraining = {
            filename,
            label,
            lines: lines.length,
            processedTokens: 0,
            addedTokens: 0
          };

    this.epsilon = epsilon;
    this.weight = weight;

    this.incrementLabelFrequency(label);

    lines.forEach((line, lineIndex) => {
      const actualTokens = this.tokens.length,
            tokens = this.tokenizer(line);

      tokens.forEach(token => this.incrementLabelTokenFrequency(token, label));

      training.processedTokens += tokens.length;
      training.addedTokens += this.tokens.length - actualTokens;

      this._logs.push({
        label,
        line: lineIndex + 1,
        processedTokens: tokens.length,
        addedTokens: this.tokens.length - actualTokens
      });

    });

    this._trainings.push(training);
  };

  // Private Methods
  private readonly calculateProbabilities = (text: string): INaiveBayesProbability[] => {
    return this.labels.map(label => ({
        label,
        probability: this.calculateProbability(label, this.tokenizer(text))
      }))
      .sort((a, b) => a.probability > b.probability ? -1 : 1);
  };

  private readonly calculateProbability = (label: string, tokens: string[]): number => {
    const labelProbability = 1 / this.labels.length,
          labelTokenScores = tokens.map(token => this.labelTokenScore(label, token))
            .filter(score => Math.abs(labelProbability - score) > this.epsilon);

    const logarithmicSum = labelTokenScores.reduce((sum, score) => sum + (Math.log(1 - score) - Math.log(score)), 0);
    return 1 / (1 + Math.exp(logarithmicSum));
  };

  private readonly labelFrequency = (label?: string): number => {
    return label
      ? this._store.labels[label] || 0
      : Object.values(this._store.labels).reduce((sum: number, count: number) => sum + count, 0);
  };

  private readonly labelTokenFrequency = (token: string, label?: string): any => {
    if (label) {
      return this._store.tokens?.[token]?.[label] || 0;
    }
    return Object.values(this._store.tokens[token] || {}).reduce((sum, count) => sum + count, 0);
  };

  private readonly labelTokenScore = (label: string, token: string): number => {
    // Notes:
    // 1.- Assuming equal probabilities gave us 1% accuracy bump over using the frequencies of each label
    // 2.- Adjust for rare tokens -- essentially weighted average

    const labelFrequency = this.labelFrequency(label),
          allLabelsFrequency = this.labelFrequency(),
          notLabelFrequency = allLabelsFrequency - labelFrequency;

    const labelTokenFrequency = this.labelTokenFrequency(token, label),
          allLabelsTokenFrequency = this.labelTokenFrequency(token),
          notLabelTokenFrequency = allLabelsTokenFrequency - labelTokenFrequency;

    const totalOfLabels = this.labels.length,
          labelProbability = 1 / totalOfLabels,
          notLabelProbability = 1 - labelProbability;

    const labelTokenProbability = labelTokenFrequency / labelFrequency,
          notLabelTokenProbability = notLabelTokenFrequency / notLabelFrequency,
          labelTokenSupport = labelTokenProbability * labelProbability,
          notLabelTokenSupport = notLabelTokenProbability * notLabelProbability;

    const rawScore = labelTokenSupport / (labelTokenSupport + notLabelTokenSupport),
          adjustedTokenScore = ((this.weight * labelProbability) + (allLabelsTokenFrequency * (rawScore || labelProbability)))
          / (this.weight + allLabelsTokenFrequency);

    return adjustedTokenScore;
  };

  private readonly incrementLabelFrequency = (label: string): void => {
    this._store.labels[label] = this.labelFrequency(label) + 1;
  };

  private readonly incrementLabelTokenFrequency = (token: string, label: string): void => {
    if (Object(this._store.tokens).hasOwnProperty(token) === false) {
      this._store.tokens[token] = {};
    }
    this._store.tokens[token][label] = this.labelTokenFrequency(token, label) + 1;
  };
}
