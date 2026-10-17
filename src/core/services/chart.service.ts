import { isPlatformBrowser } from '@angular/common';
import { ElementRef, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Chart } from 'chart.js';
import { IPointXY } from '../interfaces/ml/ipoint-xy';
import { IPointXYZ } from '../interfaces/ml/ipoint-xyz';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private readonly _documentStyle = getComputedStyle(document.documentElement);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly _platformId: any;
  private readonly _textColor: string;
  private readonly _textColorSecondary: string;
  private readonly _surfaceBorder: string;

  constructor() {
    if (isPlatformBrowser(this._platformId)) {
      this._textColor = this._documentStyle.getPropertyValue('--p-text-color');
      this._textColorSecondary = this._documentStyle.getPropertyValue('--p-text-muted-color');
      this._surfaceBorder = this._documentStyle.getPropertyValue('--p-content-border-color');
    } else {
      this._textColor = 'darkgray';
      this._textColorSecondary = 'darkgray';
      this._surfaceBorder = 'darkgray';
    }
  }

  get textColor(): string {
    return this._textColor;
  }

  get textColorSecondary(): string {
    return this._textColorSecondary;
  }

  get surfaceBorder(): string {
    return this._surfaceBorder;
  }

  addDataSet = (chart: Chart, dataSet: any): void => {
    chart.data.datasets.push(dataSet);
  };

  toPointXY = (point: number[]): IPointXY => {
    if (point.length === 2) {
      return { x: point[0], y: point[1] };
    }
    console.error('toPoint2D: ERROR: Invalid point dimensionality', point);
    return { x: 0, y: 0 };
  };

  toPointsXY = (points: number[][]): IPointXY[] => points.map(point => this.toPointXY(point));

  toPointXYZ = (point: number[]): IPointXYZ => {
    if (point.length === 3) {
      return { x: point[0], y: point[1], z: point[2] };
    }
    console.error('toPoint3D: ERROR: Invalid point dimensionality', point);
    return { x: 0, y: 0, z: 0 };
  };

  toPointsXYZ = (points: number[][]): IPointXYZ[] => points.map(point => this.toPointXYZ(point));

  removeDataSet = (chart: Chart, dataSetIndex: number): void => {
    chart.data.datasets.splice(dataSetIndex, 1);
  };

  removeDataSets = (chart: Chart): void => {
    chart.data.datasets = [];
  };

  render2D = (canvas: ElementRef<HTMLCanvasElement>, configuration: any): Chart => {
    const context2D = canvas.nativeElement.getContext('2d');

    this.configureDefaultColors(configuration);

    if (context2D) {
      return new Chart(context2D, configuration);
    } else {
      console.error('No se pudo obtener el contexto 2D del canvas.');
      return new Chart(canvas.nativeElement, configuration);
    }
  };

  // Private Methods
  private readonly configureDefaultColors = (setup: any): void => {
    setup.options.scales.x.ticks.color = this.textColorSecondary;
    setup.options.scales.x.grid.color = this.surfaceBorder;
    setup.options.scales.y.ticks.color = this.textColorSecondary;
    setup.options.scales.y.grid.color = this.surfaceBorder;
    setup.options.plugins.legend.labels.color = this.textColor;
  };



}
