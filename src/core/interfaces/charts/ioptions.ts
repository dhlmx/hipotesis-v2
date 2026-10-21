import { IPlugins } from './iplugins';
import { IScales } from './iscales';

export interface IOptions {
  responsive: boolean;
  aspectRatio: number;
  maintainAspectRatio: boolean;
  plugins: IPlugins;
  scales: IScales;
}
