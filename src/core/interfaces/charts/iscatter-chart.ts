import { IData } from './idata';
import { IOptions } from './ioptions';

export interface IScatterChart {
  type: 'scatter';
  data: IData;
  options: IOptions;
  plugins: any[];
}
