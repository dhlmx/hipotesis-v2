export class CryptoObject {
  private readonly _cryptoObject: Crypto;
  private readonly _randomValues: Uint32Array<ArrayBuffer>;

  constructor() {
    this._cryptoObject = globalThis.crypto;

    if (!this._cryptoObject || typeof this._cryptoObject.getRandomValues !== 'function') {
      throw new Error('A cryptographically secure random number generator is required.');
    }

    this._randomValues = new Uint32Array(1);
  }

  get cryptoObject(): Crypto {
    return this._cryptoObject;
  }

  get random(): number {
    this._cryptoObject.getRandomValues(this._randomValues);
    return this._randomValues[0] / 0x100000000;
  }

  get randomValues(): Uint32Array<ArrayBuffer> {
    return this._randomValues;
  }
}
