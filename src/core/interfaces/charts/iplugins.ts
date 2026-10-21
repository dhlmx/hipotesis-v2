import { ILegend } from './ilegend';
import { ISubtitle } from './isubtitle';
import { ITitle } from './ititle';

export interface IPlugins {
  legend: ILegend;
  title: ITitle;
  subtitle: ISubtitle;
}
