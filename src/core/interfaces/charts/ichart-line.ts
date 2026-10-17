export interface IChartLine {
  type: 'line';
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string,
      borderColor: string;
      fill: boolean;
      pointBackgroundColor: string;
      pointRadius: number;
      pointStyle: 'circle'|'cross'|'crossRot'|'dash'|'line'|'rect'|'rectRounded'|'rectRot'|'star'|'triangle';
      showLine: boolean;
      tension: number;
    }[];
  };
  options: {
    responsive: boolean;
    aspectRatio: number;
    maintainAspectRatio: boolean;
    plugins: {
      legend: {
        display: boolean;
        position: 'top'|'right'|'bottom'|'left';
        labels: {
          color: string;
        }
      };
      title: {
        display: boolean;
        text: string;
        font: {
          size: number;
        };
      },
      subtitle: {
        display: boolean;
        text: string;
        font: {
          size: number;
        };
      }
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
  },
  plugins: []
}

export const ICHART_LINE_DEFAULT: IChartLine = {
  type: 'line',
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
        display: true,
        position: 'top',
        labels: {
          color: '#000000'
        }
      },
      title: {
        display: true,
        text: '',
        font: {
          size: 16
        }
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
          color: '#000000'
        },
        grid: {
          display: true,
          color: '#000000',
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
          color: '#000000'
        },
        grid: {
          display: true,
          color: '#000000',
          drawBorder: false
        }
      }
    }
  },
  plugins: []
};
