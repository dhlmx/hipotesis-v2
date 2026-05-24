import { signal } from "@angular/core";

export class Process {

  isInProcess = signal<boolean>(false);
  isSuccessful = signal<boolean>(false);
  message = signal<string>('');

  start = (message?: string): void => {
    this.isInProcess.set(true);
    this.isSuccessful.set(false);

    if (message) {
      this.message.set(message);
    }
  }

  stop = (): void => {
    this.isInProcess.set(false);
  }
}
