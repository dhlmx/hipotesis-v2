import { IAxisGrid } from './iaxis-grid';
import { IAxisTicks } from './iaxis-ticks';
import { IAxisTitle } from './iaxis-title';

export interface IAxis {
  type: 'linear'|'category'|'time'|'logarithmic';
  position: 'bottom'|'top'|'left'|'right';
  title: IAxisTitle;
  ticks: IAxisTicks;
  grid: IAxisGrid;
}
