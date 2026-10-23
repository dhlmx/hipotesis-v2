import { IFormControl } from '../../../interfaces/iform-control';

export const MAX_FEATURES: string[] = ['sqrt', 'log2'],
  ESTIMATORS = 25,
  RANDOM_STATE = 42;

export const CONTROL_ESTIMATORS: IFormControl = { value: ESTIMATORS, min: 1, max: 99, minLength: -1, maxLength: -1, step: 1 },
  CONTROL_MAX_FEATURES: IFormControl = { value: MAX_FEATURES[0], min: -1, max: -1, minLength: -1, maxLength: -1, step: -1 },
  CONTROL_RANDOM_STATE: IFormControl = { value: RANDOM_STATE, min: 1, max: 100, minLength: -1, maxLength: -1, step: 1 };
