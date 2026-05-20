export class Process {
  isInProcess = false;
  isSuccessful = false;
  message = '';

  start = (message?: string): void => {
    this.isInProcess = true;
    this.isSuccessful = false;

    if (message) {
      this.message = message;
    }
  }

  stop = (): void => {
    this.isInProcess = false;
    this.isSuccessful = false;
    this.message = '';
  }
}
