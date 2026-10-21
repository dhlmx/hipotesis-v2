export interface ILegend {
  display: boolean;
  position: 'top'|'right'|'bottom'|'left';
  labels: {
    color: string;
  }
}
