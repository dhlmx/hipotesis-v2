import { IPluginsOptions } from "./iplugins-options";
import { IScaleOptions } from "./iscale-options";

export interface IChartOptions {
  maintainAspectRatio: boolean;
  aspectRatio: number;
  plugins: IPluginsOptions;
  scales: IScaleOptions;
}
