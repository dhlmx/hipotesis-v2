import { signal } from '@angular/core';
import { IAdvance } from '../interfaces/iadvance';
import { ISteps } from '../interfaces/isteps';

export class Process {
  private readonly _advance = signal<IAdvance>({ advance: -1, finalAdvance: -1 });
  private readonly _steps = signal<ISteps>({ step: -1, finalStep: -1 });

  message = signal<string>('');

  isInProcess = signal<boolean>(false);
  isSuccessful = signal<boolean>(false);

  get areValidSteps(): boolean {
    return this._steps().step > 0 && this._steps().finalStep > 0;
  }

  get isValidAdvance(): boolean {
    return this._advance().advance > 0 && this._advance().finalAdvance > 0;
  }

  advance = (): string => this.isValidAdvance ? `${(this._advance().advance * 100) / this._advance().finalAdvance} %` : '';

  resetAdvance = (): void => this._advance.update(() => ({ advance: -1, finalAdvance: -1 }));

  resetSteps = (): void => this._steps.update(() => ({ step: -1, finalStep: -1 }));

  setAdvance = (advance: number, finalAdvance?: number): void => {
    this._advance.update(() => ({ advance, finalAdvance: finalAdvance ?? this._advance().finalAdvance }));
  }

  setSteps = (step: number, finalStep?: number): void => {
    this._steps.update(() => ({ step, finalStep: finalStep ?? this._steps().finalStep }));
  }

  start = (message?: string): void => {
    this.isInProcess.set(true);
    this.isSuccessful.set(false);

    if (message) {
      this.message.set(message);
    }
  }

  steps = (): string => this.areValidSteps ? `${this._steps().step}/${this._steps().finalStep}` : '';

  stop = (): void => {
    this.isInProcess.set(false);
  }
}
