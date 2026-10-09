import { IFormControl } from '../../../interfaces/iform-control';

export const ACCURACY_BUMP = 87.8,
  EPSILON = 0.15,
  RARE_TOKEN_WEIGHT = 3,
  RESPONSABILITY = 78.0;

export const CONTROL_EPSILON: IFormControl = { value: EPSILON, min: 0.01, max: 0.99, minLength: 1, maxLength: 4, step: 0.01 },
  CONTROL_RARE_TOKEN_WEIGHT: IFormControl = { value: RARE_TOKEN_WEIGHT, min: 1, max: 9, minLength: 1, maxLength: 1, step: 1 };
