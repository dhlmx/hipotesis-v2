import { IAxisTitle } from '../../interfaces/charts/iaxis-title';
import { IData } from '../../interfaces/charts/idata';
import { IDataset } from '../../interfaces/charts/idataset';
import { IOptions } from '../../interfaces/charts/ioptions';
import { IPointXY } from '../../interfaces/ml/ipoint-xy';
import { IChartHelper } from '../../interfaces/charts/ichart-helper';
import { ISubtitle } from '../../interfaces/charts/isubtitle';
import { ITitle } from '../../interfaces/charts/ititle';

export class ChartHelper implements IChartHelper {
  type: 'line'|'scatter';
  plugins: any[] = [];
  data: IData;
  options: IOptions;

  constructor(type: 'line'|'scatter') {
    this.type = type;
    this.data = {
      labels: [],
      datasets: []
    };
    this.options = {
      responsive: true,
      aspectRatio: 2,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: ''
          }
        },
        title: {
          display: true,
          text: '',
          font: {
            size: 20
          },
        },
        subtitle: {
          display: true,
          text: '',
          font: {
            size: 12
          }
        }
      },
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: {
            display: true,
            text: ''
          },
          ticks: {
            display: true,
            color: ''
          },
          grid: {
            display: true,
            color: '',
            drawBorder: false
          }
        },
        y: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: ''
          },
          ticks: {
            display: true,
            color: ''
          },
          grid: {
            display: true,
            color: '',
            drawBorder: false
          }
        }
      }
    };
  }

  addDataset(dataset: IDataset, data?: number[]|IPointXY[]): void {
    if (data) {
      dataset.data = data;
    }
    this.data.datasets.push({ ...dataset });
  }

  removeDataset = (dataSetIndex: number): void => {
    if (dataSetIndex >= 0 && dataSetIndex < this.data.datasets.length) {
      this.data.datasets.splice(dataSetIndex, 1);
    }
    console.error(`setDataset: ERROR: index out of range: ${dataSetIndex}`);
  }

  removeDatasets = (): void => {
    this.data.datasets = [];
  }

  setData = (dataSetIndex: number, data: number[]|IPointXY[]): void => {
    if (dataSetIndex >= 0 && dataSetIndex < this.data.datasets.length) {
      this.data.datasets[dataSetIndex].data = data
    }
    console.error(`setData: ERROR: index out of range: ${dataSetIndex}`);
  }

  setDataset(dataSetIndex: number, dataset: IDataset, data?: number[]|IPointXY[]): void {
    if (dataSetIndex >= 0 && dataSetIndex < this.data.datasets.length) {
      if (data) {
        dataset.data = data;
      }

      this.data.datasets[dataSetIndex] = { ...this.data.datasets[dataSetIndex], ...dataset };
    }
    console.error(`setDataset: ERROR: index out of range: ${dataSetIndex}`);
  }

  setLabels = (labels: string[]): void => {
    this.data.labels = labels;
  };

  setSubtitle = (subtitle: ISubtitle): void => {
    this.options.plugins.subtitle = { ...this.options.plugins.subtitle, ...subtitle };
  };

  setTitle = (title: ITitle): void => {
    this.options.plugins.title = { ...this.options.plugins.title, ...title };
  };

  setXTitle = (xTitle: IAxisTitle): void => {
    this.options.scales.x.title = { ...this.options.scales.x.title, ...xTitle };
  };

  setYTitle = (yTitle: IAxisTitle): void => {
    this.options.scales.y.title = { ...this.options.scales.y.title, ...yTitle};
  };

  toObject = (): any => {
    return {
      type: this.type,
      plugins: this.plugins,
      data: this.data,
      options: this.options
    };
  }
}
