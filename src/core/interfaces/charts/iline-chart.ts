import { IData } from './idata';
import { IOptions } from './ioptions';

export interface ILineChart {
  type: 'line';
  data: IData;
  options: IOptions;
  plugins: any[];
}
