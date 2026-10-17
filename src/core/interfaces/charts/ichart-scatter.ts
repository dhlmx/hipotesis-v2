export interface IChartScatter {
  type: 'scatter';
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: { x: number, y: number }[];
      backgroundColor: string;
      borderWidth: number;
      borderColor: string;
      fill: boolean;
      pointBackgroundColor: string;
      pointRadius: number;
      pointStyle: 'circle'|'cross'|'crossRot'|'dash'|'line'|'rect'|'rectRounded'|'rectRot'|'star'|'triangle';
    }[]
  },
  /*
    setup.options.scales.x.ticks.color = this.textColorSecondary;
    setup.options.scales.x.grid.color = this.surfaceBorder;
    setup.options.scales.y.ticks.color = this.textColorSecondary;
    setup.options.scales.y.grid.color = this.surfaceBorder;
    setup.options.plugins.legend.labels.color = this.textColor;
  */
  options: {
    responsive: boolean;
    aspectRatio: number;
    maintainAspectRatio: boolean;
    plugins: {
      legend: {
        position: 'top'|'right'|'bottom'|'left';
        labels: {
          color: string;
        }
      },
      title: {
        display: boolean;
        text: string;
        font: {
          size: number;
        }
      },
      subtitle: {
        display: boolean;
        text: string;
        font: {
          size: number;
        };
      }
    },
    legend: {
      display: boolean;
    },
    scales: {
      x: {
        type: 'linear'|'category'|'time'|'logarithmic';
        position: 'bottom'|'top';
        title: {
          display: boolean;
          text: string;
        },
        ticks: {
          display: boolean;
          color: string;
        },
        grid: {
          display: boolean;
          color: string;
          drawBorder: boolean;
        }
      },
      y: {
        type: 'linear'|'category'|'time'|'logarithmic';
        position: 'left'|'right';
        title: {
          display: boolean;
          text: string;
        },
        ticks: {
          display: boolean;
          color: string;
        },
        grid: {
          display: boolean;
          color: string;
          drawBorder: boolean;
        }
      }
    }
  }
}

export const ICHART_SCATTER_DEFAULT: IChartScatter = {
  type: 'scatter',
  data: {
    labels: [],
    datasets: []
  },
  options: {
    responsive: true,
    aspectRatio: 2,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'darkgray'
        }
      },
      title: {
        display: true,
        text: '',
        font: {
          size: 24
        }
      },
      subtitle: {
        display: false,
        text: '',
        font: {
          size: 12
        }
      }
    },
    legend: {
      display: false
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
          color: 'darkgray'
        },
        grid: {
          display: true,
          color: 'darkgray',
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
          color: 'darkgray'
        },
        grid: {
          display: true,
          color: 'darkgray',
          drawBorder: false
        }
      }
    }
  }
};
