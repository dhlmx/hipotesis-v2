import { IData } from './idata';
import { IOptions } from './ioptions';

export interface IChartHelper {
  type: 'line'|'scatter';
  data: IData;
  options: IOptions;
  plugins: any[];
}
