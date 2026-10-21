import { IPointXY } from './ipoint-xy';

export interface IDataset {
  label: string;
  data: number[]|IPointXY[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  fill: boolean;
  pointBackgroundColor: string;
  pointRadius: number;
  pointStyle: 'circle'|'cross'|'crossRot'|'dash'|'line'|'rect'|'rectRounded'|'rectRot'|'star'|'triangle';
  showLine?: boolean;
  tension?: number;
}
