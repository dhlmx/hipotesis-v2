import { ICHART_SCATTER_DEFAULT } from '../../../interfaces/charts/ichart-scatter';
import { IFormControl } from '../../../interfaces/iform-control';
import { randomPredefinedColor } from '../../../utilities/random';

// Chart.js
export const CHART_K_MEANS: any = {
  ...ICHART_SCATTER_DEFAULT,
  data: {
    labels: [],
    datasets: []
  },
  options: {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: randomPredefinedColor()
        }
      },
      title: {
        display: true,
        text: 'K-Means Algorithm',
        font: {
          size: 20
        }
      },
      subtitle: {
        display: true,
        text: 'Random Data',
        font: {
          size: 12
        }
      }
    },
    legend: {
      display: true
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Range 1D (x)'
        },
        ticks: {
          color: 'darkgray'
        },
        grid: {
          color: 'darkgray',
          drawBorder: false
        }
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Range 2D (y)'
        },
        ticks: {
          color: 'darkgray'
        },
        grid: {
          color: 'darkgray',
          drawBorder: false
        }
      }
    }
  }
},

CHART_K_MEANS_SOLUTION: any = {
  ...ICHART_SCATTER_DEFAULT,
  data: {
    labels: [],
    datasets: []
  },
  options: {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: randomPredefinedColor()
        }
      },
      title: {
        display: true,
        text: 'K-Means Algorithm',
        font: {
          size: 20
        }
      },
      subtitle: {
        display: true,
        text: 'Points + Centroids',
        font: {
          size: 12
        }
      }
    },
    legend: {
      display: true
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Range 1D (x)'
        },
        ticks: {
          color: 'darkgray'
        },
        grid: {
          color: 'darkgray',
          drawBorder: false
        }
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Range 2D (y)'
        },
        ticks: {
          color: 'darkgray'
        },
        grid: {
          color: 'darkgray',
          drawBorder: false
        }
      }
    }
  }
},

CHART_RMSE: any = {
  ...ICHART_SCATTER_DEFAULT,
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
        position: 'top',
        labels: {
          color: '#000000'
        }
      },
      title: {
        display: true,
        text: 'Root Mean Squared Error, RMSE',
        font: {
          size: 20
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
          text: 'Iterations'
        },
        ticks: {
          color: '#000000'
        },
        grid: {
          color: '#000000',
          drawBorder: false
        }
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'RMSE'
        },
        ticks: {
          color: '#000000'
        },
        grid: {
          color: '#000000',
          drawBorder: false
        }
      }
    }
  }
};

// Form Controls
export const DIMENSION: IFormControl = { value: 2, min: 2, max: 3, minLength: 1, maxLength: 1, step: 1 },
ITERATIONS: IFormControl = { value: 1000, min: 100, max: 2000, minLength: 3, maxLength: 4, step: 100 },
K: IFormControl = { value: 3, min: 1, max: 9, minLength: 1, maxLength: 1, step: 1 },
POINTS: IFormControl = { value: 40, min: 10, max: 200, minLength: 1, maxLength: 3, step: 1 },
RANGE_MIN: IFormControl = { value: 1, min: 1, max: 200, minLength: 1, maxLength: 3, step: 1 },
RANGE_MAX: IFormControl = { value: 100, min: 1, max: 200, minLength: 1, maxLength: 3, step: 1 };

// Series
export const SERIES_A: number[][] = [
    [1, 3],
    [5, 8],
    [3, 0]
],

SERIES_B: number[][] = [
  [1, 2], [2, 3], [2, 5], [1, 6], [4, 6],
  [3, 5], [2, 4], [4, 3], [5, 2], [6, 9],
  [4, 4], [3, 3], [8, 6], [7, 5], [9, 6],
  [9, 7], [8, 8], [7, 9], [11, 3], [11, 2],
  [9, 9], [7, 8], [6, 8], [12, 2], [14, 3],
  [15, 1], [15, 4], [14, 2], [13, 1], [16, 4]
];
