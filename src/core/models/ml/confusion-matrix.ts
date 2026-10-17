import { IConfusionMatrix } from '../../interfaces/ml/iconsfusion-matrix';

export class ConfusionMatrix implements IConfusionMatrix {
  trueNegative: number = -1;
  falseNegative: number = -1;
  falsePositive: number = -1;
  truePositive: number = -1;

  constructor(icm?: IConfusionMatrix) {
    if (icm) {
      this.trueNegative = icm.trueNegative;
      this.falseNegative = icm.falseNegative;
      this.falsePositive = icm.falsePositive;
      this.truePositive = icm.truePositive;
    }
  }

  public get samples(): number {
    return this.falseNegative + this.trueNegative + this.falsePositive + this.truePositive;
  }

  public accuracy: Function = (): number => (this.truePositive + this.trueNegative) / (this.falseNegative + this.trueNegative + this.falsePositive + this.truePositive);

  public fnr: Function = (): number => this.falseNegative / (this.falseNegative + this.truePositive);

  public fpr: Function = (): number => this.falsePositive / (this.falsePositive + this.trueNegative);

  public precision: Function = (): number => this.truePositive / (this.truePositive + this.falsePositive);

  public recall: Function = (): number => this.truePositive / (this.truePositive + this.falseNegative);

  public tnr: Function = ():number => this.trueNegative / (this.trueNegative + this.falsePositive);

  public toMatrix: Function = (): number[][] => {
    return [
      [this.trueNegative, this.falseNegative],
      [this.falsePositive, this.truePositive]
    ];
  }

  public tpr: Function = (): number => this.truePositive / (this.truePositive + this.falseNegative);
}
